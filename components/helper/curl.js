var axios = require('axios');
require('dotenv').config();

const Curl = async (payload,type_method,endpoint) => {

    let url=process.env.BASE_URL+endpoint
    var data = JSON.stringify(payload);
    var config =  {
        method: type_method,
        url: endpoint,
        headers: { 
            'x-api-key': process.env.X_API_KEY, 
            'Content-Type': 'application/json'
        },
        data : data
        };

    var hasil=await axios(config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error;
            });
            
    return hasil
}


module.exports = {
    Curl
}

