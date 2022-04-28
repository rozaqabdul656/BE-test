const { sign, verify,decode } = require('jsonwebtoken');
const { sendSuccessResponse,sendErrorResponse } = require('../response_service');

const token_secret = process.env.LOGIN_SECRET;
const issuer = 'BNT.api';
const audience = 'BNT.app';
const hour_in_minute = 60 * 60;

const token_lifespan = 2 * hour_in_minute;

const generateToken = async (payload) => {
    return new Promise((resolve, reject) => {
        sign(payload, token_secret, { issuer, audience }, (error, token) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
        });
    });
    };
    
    const MakeTokens = async () => {
        const exp=Math.floor(Date.now() / 1000) + (token_lifespan)
        const token = await generateToken({ exp });
        return { token, expired_at: exp };
    };

    const getBearerToken = (input) => {
        const prefix = 'Bearer ';
        let auth_token = input ? input : '';
        let user_token = auth_token;
        const separator = ',';
        if (auth_token.includes(separator)) {
            let tokens = auth_token.split(separator);
            for (const key in tokens) {
                if (tokens[key].startsWith(prefix)) {
                    user_token = tokens[key];
                }
            }
        }
        return user_token.substring(prefix.length);
      };

    const verifyToken = (token) => {
        return new Promise((resolve, reject) => {
            verify(token, token_secret, { audience, issuer }, (error, decoded) => {
            if (error) {
                reject(error);
            } else {
                resolve(decoded);
            }
            });
        });
    };
    const checkCredentials = async (req, res, next) => {
        const token = getBearerToken(req.get('Authorization'));
        try {
        const hasil=await verifyToken(token);
        next();
        } catch (errors) {
            console.log(errors);
            let Erores={ status : 401, message: "Unauthorized", error:  null };
            sendErrorResponse(req, res, Erores);
        }
    };
    module.exports = {
        generateToken,
        checkCredentials,
        MakeTokens
    }

