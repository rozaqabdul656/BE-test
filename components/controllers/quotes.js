
const { sendSuccessResponse,sendErrorResponse } = require('../response_service');
const helperCurl = require('../helper/curl');

const GetQuotes = async (req, res) => {
    try {
        let url=process.env.QUOTES_URL
        let response_value=await helperCurl.Curl({},"get",url)
        let quote="";
        if(response_value.value != null){
            quote=response_value.value
        }else if(response_value.fact != null){
            quote=response_value.fact        
        }
            sendSuccessResponse(req, res, {
                quote:quote,
                status:"Succes",
                source:url,
                });


        } catch (error) {
            sendErrorResponse(req, res, error);
        }
    };

    module.exports = {
        GetQuotes
    }