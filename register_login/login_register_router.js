var express = require('express');
var passwordHash = require('password-hash');

var jwt = require('jsonwebtoken');
var fs = require('fs');

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


ref.once("value", function(snapshot) {
  console.log("snapshot is:"+snapshot.val());
});
//router created
var router = express.Router();

router.post('/register',register);

router.post('/login',login);

module.exports = router;

function register(req,res,next) {
    console.log(req.body);
    var hashedPassword = passwordHash.generate(req.body.password);
    Users.create(
      {
         username:req.body.username,
         email:req.body.email,
         password: hashedPassword 
      }, 
      function (err, small) {
      if (err) {
        console.log(err);
      } else {

      }
      // saved!
    });
}

function login(req,res,next) {
  console.log(req.body);

  res.json({
    success:'connected'
  })
}