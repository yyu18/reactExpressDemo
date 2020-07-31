const express = require('express');
const passwordHash = require('password-hash');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { nodeMailer } = require('./nodeMailer');

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

router.post('/checkResetLink',checkResetLink);

router.post('/forgotPassword',forgotPassword);

router.post('/checkEmail',checkEmail);

router.post('/register',register);

router.post('/login',login);

module.exports = router;

function checkResetLink(req,res,next){
  console.log(req.body.token);
  if(req.body.token!==undefined&&req.body.token!==''){
    Users.findOne({
      resetPasswordToken:req.body.token,
      resetPasswordExpire:{
        $gt:Date.now()
      }
  },(err,user)=>{
    if(err) next(err);
     if(user){
      if(req.body.password!==undefined){
        var hashedPassword = passwordHash.generate(req.body.password);
        var token = jwt.sign(
          { 
            username:user.username,
            email:user.email,
            password:hashedPassword,
          }, 
          privateKey, { algorithm: 'HS256'});

          user.password=hashedPassword;
          user.token=token;
          user.save((err,result)=>{
            if(err) {
              next(err)
            } else {
              res.status(200).send({
                error:false,
                info:'Password Updated!'
              })
            }  
          })
      } else {
        res.status(200).send({
          error:false,
          info:'Link Is Valid'
        })
      }
    } else {
      res.status(404).send({
        error:true,
        info:'Link Is Invalid'
      })
    }
  })
  } else {
    res.status(404).send({
      error:true,
      info:'Link Is Invalid'
    })
  }
}

function forgotPassword(req,res,next){
  console.log(req.body);
  if(req.body.email!==undefined&&req.body.email!==''){
    Users.findOne({ email: req.body.email }, function (err, user) {
      if(err) next(err);
      if(user) {
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now()+360000;
        user.save((err,result)=>{
          if(err) next(err);
          if(result){
            console.log(result);
          }
        });
        
        //nodemailer begin
        nodeMailer(req.body.email,resetToken)
        .catch((err)=>{
          next(err)
        })
        .then((e)=>{
          console.log(e);
          res.send(e);
        });
      } else {
        res.send({
          error:true,
          info:'Email is invalid'
        })
      }
    })
  } else {
    res.send({
      error:true,
      info:'Email is invalid'
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
    if(req.body.email===undefined || req.body.email==='' || req.body.email===null || req.body.password===undefined || req.body.password==='' || req.body.password ===null) {res.json({ error:true, info:'email or password is wrong' });return false}

    Users.findOne({ email: req.body.email }, function (err, user) {
        if(err) next(err);
        if(!user)  {res.json({ error:true, info:'email or password is wrong'}); return false}
        console.log(user.password)
        var passwordVerify = passwordHash.verify(req.body.password, user.password)
        console.log(passwordVerify);
        if(!passwordVerify) {res.json({ error:true, info:'email or password is wrong'});return false}
        res.json({ error:false, token:user.token, username:user.username, email:user.email });
        return true
      })
}