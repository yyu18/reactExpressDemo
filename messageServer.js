require('dotenv').config()
var express = require('express');
var app = express();
//var https = require("https");

const { errorHandler } = require('./utils/error');

const messageRouter = require('./message_system/message_router.js');
app.use(express.json());

app.listen(6000,'0.0.0.0',function() { console.log('Example app listening on port 6000!');});

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

app.use('/message-system',messageRouter);
app.use(errorHandler);