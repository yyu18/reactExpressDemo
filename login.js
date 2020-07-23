var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usersInfo', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});
const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
  });

const Users = mongoose.model('Users', userSchema);

var app = express();
const login_register_router = require('./register_login/login_register_router.js');
app.use(cors());
app.use(bodyParser.json());

app.listen(4000,'0.0.0.0',function() { console.log('Example app listening on port 4000!');});

app.use('/',login_register_router);