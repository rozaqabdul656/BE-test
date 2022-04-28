const { sendSuccessResponse,sendErrorResponse } = require('../response_service');
const { ValidateLogin } = require('../validate/user');
const { generateToken,MakeTokens } = require('../middleware/jwt');
const helperCurl = require('../helper/curl');
const SHA256 = require('js-sha256');
const fs = require('fs');
const csv = require('fast-csv');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const {
    addWhere,
    balance,
    users,
    transaction,
    coin_price,
  } = require('../../db/repository');
/**
 * Login and authenticate player
 * @param {Object} postData
 * @param {Function} callback
 */
 const errorTemplate={ status : 500, message: "Internal server Error", error:  null };
const login_user = async (req, res) => {
    try {
        ValidateLogin.validateBody(req.body);
        const hashed_password = SHA256(req.body.password);
        const user = await users.findAll(addWhere({ email:req.body.email, password:hashed_password }));
        if(user.length== 0){
            let errors= { status : 404, message: "Invalid Credential", error: "Invalid Credential" };
            sendErrorResponse(req, res, errors);
            return
        }
        const {token,expired_at} = await MakeTokens();
                sendSuccessResponse(req, res, {
                    messages:"Login Sukses",
                    token,
                    expired_at
                    });

        } catch (error) {
            sendErrorResponse(req, res, error);
        }
    };

    const register_user = async (req, res) => {
        try {
            ValidateLogin.validateBody(req.body);
            let {email,password } = req.body;
            let valid=await users.findAll({email});
            if (valid.length > 0) {
                let errors= { status : 422, message: "Email Is registred", error: "Email Is registreds" };
                sendErrorResponse(req, res, errors);
                return

            }
            let pwEnct = SHA256(password);
        
            await users.create({email,password:pwEnct});
            sendSuccessResponse(req, res, {
                messages:"Sukses Register User",
                });
    
            } catch (error) {
                
                sendErrorResponse(req, res, error);
            }
        };
        const transaction_User = async (req, res) => {
            try {
                // ValidateLogin.validateBody(req.body);
                let {trx_id,amount,user_id } = req.body;
                if(amount == 0.00000001){
                    let errors= { status : 500, message: "Invalid Amount", error: "Invalid Amount" };
                    sendErrorResponse(req, res, errors);
                    return
                }
                const userbalance = await balance.findAll(addWhere({ user_id:user_id}));
                if(userbalance.length ==0){
                    let errors= { status : 404, message: "Balance Not Found", error: "Balance Not Found" };
                    sendErrorResponse(req, res, errors);
                    return
                }
                if (parseFloat(userbalance[0].amount_available) < parseFloat(amount) ){
                    let errors= { status : 500, message: "Balance Not Enough", error: "Balance Not Enough" };
                    sendErrorResponse(req, res, errors);
                    return
                
                }
                
                transaction.create({trx_id,user_id,amount});
                await sleep(30000);

                let valid=await transaction.findAll(addWhere({trx_id}));
                if (valid.length > 1) {
                    // Rollback Trxs
                    await transaction.destroy(addWhere({trx_id,user_id,amount}));
                    let errors= { status : 422, message: "Transaction Rollback", error: "Transaction Rolslbacks" };
                    sendErrorResponse(req, res, errors);
                    return;
                }
                
                let userbalanceUptoDates = await balance.findAll(addWhere({user_id}));
                let AmountFinal=parseFloat(userbalanceUptoDates[0].amount_available) - parseFloat(amount);
                await balance.update({amount_available:AmountFinal },addWhere({ user_id}));

                sendSuccessResponse(req, res, {
                    trx_id,
                    AmountFinal,
                    message:"Sukses Transaction"
                    });
                } catch (error) {
                    
                    sendErrorResponse(req, res, error);
                }
            };
            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
            const upload_file_coin = async (req, res) => {
                try {
                    if (req.file == undefined) {
                        return res.status(400).send({
                            message: "Please upload a CSV file!"
                        });
                    }
                    let csvData = [];
                    
                    let filePath = appDir + "/uploads/" + req.file.filename;
            fs.createReadStream(filePath)
                    .pipe(csv.parse({ headers: true }))
                    .on("error", (error) => {
                        throw error.message;
                    })
                    .on("data", (row) => {
                        console.log("roww",row)
                        csvData.push(row);
                    })
                    .on("end", () => {
                        coin_price.bulkCreate(csvData)
                        .then(() => {
                            sendSuccessResponse(req, res, {
                                message:"Sukses Uploads"
                                });
                          })
                          .catch((error) => {
                            sendErrorResponse(req, res, error);
                          });
                        });
                    } catch (error) {
                        
                        sendErrorResponse(req, res, error);
                    }
                };
                

 
    module.exports = {
        register_user,
        transaction_User,
        login_user,
        upload_file_coin
    }