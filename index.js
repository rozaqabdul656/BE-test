require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ;
const endpoints = require('./routes/endpoint');
const methodOverride = require('method-override');
app.use(methodOverride());
// Ping service
app.get('/ping', (req, res) => {
    return res.status(200).send({
        data:"PONG",
        status: 204,
    });
});
endpoints(app);
app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});
