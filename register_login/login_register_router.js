var express = require('express');
var passwordHash = require('password-hash');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');

const privateKey = fs.readFileSync(__dirname+'/private.key');
//mongodb connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usersInfo', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});
const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    resetPasswordToken:String,
    resetPasswordExpire:Number
  });

const Users = mongoose.model('Users', userSchema);

//router created
var router = express.Router();

router.post('/resetPassword',resetPassword);

router.post('/forgotPassword',forgotPassword);

router.post('/checkEmail',checkEmail);

router.post('/register',register);

router.post('/login',login);

module.exports = router;
function resetPassword(req,res,next){
  console.log(req.body.token);
  Users.findOne({
    where:{
      resetPasswordToken:req.body.token,
      resetPasswordExpire:{
        $gt:Date.now()
      }
    }
  },(err,user)=>{
    if(user){
      res.status(200).send({
        status:true,
        info:'Link Is Valid'
      })
    } else {
      res.status(404).send({
        status:false,
        info:'Link Is Invalid'
      })
    }
  })
}

function forgotPassword(req,res,next){
  console.log(req.body);
  if(req.body.email!==undefined&&req.body.email!==''){
    Users.findOne({ email: req.body.email }, function (err, user) {
      if(err) next(err);
      if(user) {
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken:resetToken,
          resetPasswordExpire:Date.now()+360000
        })
        //nodemailer begin
      } else {
        res.end({
          status:false,
          info:'email is invalid'
        })
      }
    })
  } else {
    res.end({
      status:false,
      info:'email is invalid'
    })
  }
}

function checkEmail (req,res,next) {
  if(req.body.email) {
    Users.findOne({ email: req.body.email }, function (err, user) {
      if(err){
        next(err);
        res.json({
          error:err
        })
      } else {
        if(user){
          res.json({
            status:'Email Already Be Used'
          })
        } else {
          res.json({
            status:'success'
          })
        }
      }
    })
  }
}

function register(req,res,next) {
    var hashedPassword = passwordHash.generate(req.body.password);
    //jet token
    var token = jwt.sign(
      { 
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
      }, 
      privateKey, { algorithm: 'HS256'});

    Users.findOne({ email: req.body.email }, function (err, user) {
      if(err) {
        next(err);
      } else {
        if (!user) {
          Users.create(
            {
               username:req.body.username,
               email:req.body.email,
               password: hashedPassword,
               token:token 
            }, 
            function (err, user) {
            if (err) {
              next(err);
            } else {
              console.log('user created');
              res.json({
                status:'success',
                token:user.token,
                username:user.username,
                email:user.email
              })
            }
          });
        }
      }
    });
}

function login(req,res,next) {
  Users.findOne({ email: req.body.email }, function (err, user) {
    if(err) {
      next(err);
    } else if(user){
      var passwordVerify = passwordHash.verify(req.body.password, user.password)
      if(passwordVerify) {
        res.json({
          status:'success',
          token:user.token,
          username:user.username,
          email:user.email
        })
      } else {
        res.json({
          status:'failed',
          info:'password is wrong'
        })
      }
    } else {
      res.json({
        status:'failed',
        info:'username is not existed'
      })
    }
  })
}