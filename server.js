require('dotenv').config()
var express = require('express');
var app = express();
//var https = require("https");
var cors = require('cors');
const { errorHandler } = require('./utils/error');

const myProfileRouter = require('./myProfile/my-profile-router.js');
app.use(express.json());

app.use(cors());
//begin https with credential key
         /*var options = {
            key: fs.readFileSync('/etc/nginx/ssl/wildcard.singtao.ca/singtao.ca.key'),
            cert: fs.readFileSync('/etc/nginx/ssl/wildcard.singtao.ca/combine.crt')
           // ca: fs.readFileSync('/etc/ssl/wildcard.singtao.ca/gd_bundle-g2-g1.crt'), 
        }
        https.createServer(options,app).listen(5000,function(){
            console.log('listening on 5000')
        });*/
 //end https with credential key
//app listen to the external ip
//app.listen(5000, "0.0.0.0",function() { console.log('Example app listening on port 5000!'); });
//end app listen to the external ip

app.listen(5000,'0.0.0.0',function() { console.log('Example app listening on port 5000!');});

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

app.use('/profiles',myProfileRouter);
app.use(errorHandler);