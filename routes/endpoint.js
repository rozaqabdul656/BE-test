// API endpoints
const express = require('express')
const user = require('../components/controllers/user');
const quotes = require('../components/controllers/quotes');
const multer = require('../components/utils/multer');
const jwt = require('../components/middleware/jwt');


const apiEndpoints = (app) => {
    app.use(express.json());
    app.post('/api/v1/auth/login', user.login_user);
    app.post('/api/v1/auth/register',user.register_user);
    app.get("/api/v1/quote",quotes.GetQuotes);

    app.post('/api/v1/transaction',jwt.checkCredentials,user.transaction_User);
    app.post('/api/v1/uploads',jwt.checkCredentials,multer.single("file"),user.upload_file_coin);
   

    
}    

module.exports = apiEndpoints;
