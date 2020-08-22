require('dotenv').config()
const express = require('express');
const allowCrossDomain = require('./utils/allowCrossDomain');

const app = express();
const { errorHandler } = require('./utils/error');
const login_register_router = require('./register_login/login_register_router.js');

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

app.use(express.json());
app.use(allowCrossDomain);

app.listen(4000,'0.0.0.0',function() { console.log('Example app listening on port 4000!');});

app.use('',login_register_router);
app.use(errorHandler);