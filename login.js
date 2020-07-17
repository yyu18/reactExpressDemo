var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const login_register_router = require('./register_login/login_register_router.js');
app.use(cors());
app.use(bodyParser.json());

app.listen(3000,function() { console.log('Example app listening on port 3000!');});

app.post('/',login_register_router);