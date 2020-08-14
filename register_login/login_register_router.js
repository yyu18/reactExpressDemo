require('dotenv').config()
const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { nodeMailer } = require('./nodeMailer');

const privateKey = process.env.ACCESS_SECRET_KEY

const { updateUser,createUser, retrieveUser } = require('../mongoHandler/dbConnect');

//router created
const router = express.Router();

router.get('/password-management/:email',ResetPasswordLink)

router.patch('/password-management/:token',ResetPassword)

router.post('/checkEmail',checkEmail);

router.post('/users-account',register)

router.post('/login',login);

module.exports = router;

function ResetPassword (req,res,next) {
  let token = req.params.token
  retrieveUser({
      resetPasswordToken:token,
      resetPasswordExpire:{ $gt:Date.now() }
  },(err,user) => {
      if(err) return next(err)

      if(!user) return res.sendStatus(404,'application/json',{
          error:true,
          info:'Link Invalid'
      })

      if(!req.body.password) return res.sendStatus(404,'application/json',{
          error:true,
          info:'Password Invalid'
      })
      let hashedPassword = passwordHash.generate(req.body.password)
      let token = jwt.sign(
        { 
          username:user.username,
          email:user.email,
          password: hashedPassword
        }, 
        privateKey, { algorithm: 'HS256' });

        user.password = hashedPassword
        user.token=token;
        user.save((err,re)=>{
            if(err) next(err)
            res.sendStatus(201,'application/json',{
                error:false,info:'Password Updated'
            })
        })
      })
}
const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function ResetPasswordLink (req,res,next) {
  let email = req.params.email;
  retrieveUser({email:email},(err,info)=>{
      if(err) return next(err)
      if(!info) return res.sendStatus(404,'application/json',{
          error:true,
          info:'email is invalid'
      })
      const resetToken = makeid(20)
      updateUser({email:email},{
          resetPasswordToken:resetToken,
          resetPasswordExpire:Date.now()+360000
      },(err,user)=>{
          if(err) return next(err)
          if(!user) return next('something wrong')
          nodeMailer(email,resetToken)
          .catch((err)=>{
          return next(err)
          })
          .then((e)=>{
          console.log(e)
          return res.sendStatus(200,'application/json',{
              error:false,
              info:'email sent'
          })
          });
      })
  })
}

function checkEmail(req,res,next){
  //undefined, null, '', all return true
  if(!req.body.email) return next('Email Is Empty');
  let info = { email: req.body.email }
  retrieveUserByEmail(info,(err,user)=>{
    if(err) return next(err)
    if(user) return res.sendStatus(200,'application/json',{
      error:true,
      info:'Email Is Used'
    })
    return res.sendStatus(200,'application/json',{
      error:false,
      info:'Email Can Use'
    })
  })
}

function register (req,res,next)  {
  console.log(req.body)
  if(!(req.body.username&&req.body.email&&req.body.password)) {
      return res.sendStatus(400,'application/json',{
          error:true,
          info:'Username Or Password Is Unavailable'
      })
  }

    let hashedPassword = passwordHash.generate(req.body.password)
  
    let refreshToken = generateRefreshToken({ username:req.body.username, email:req.body.email})

    let info = {
      userId:req.body.username +'-'+makeid(20),
      username:req.body.username,
      email:req.body.email,
      password: hashedPassword,
      token:refreshToken,
      resetPasswordExpire:'',
      resetPasswordToken:0
    }

    createUser(info,(err,user) => {
      if(err) return next(err)
      return res.sendStatus(201,'application/json',{
        error:false,
        info:'User Created'
      })
    })
}

function login(req,res,next) {
  console.log(req.body.email)
    if(!(req.body.email&&req.body.password)) return res.sendStatus(404,'application/json',{error:true,info:'Email Or Password Is Wrong'})
    retrieveUser({ email: req.body.email },(err,user)=>{
      if(err) return next(err)
      if(!user) return res.sendStatus(404,'application.json',{error:true,info:'Email Or Password Is Wrong'})
      if(!passwordHash.verify(req.body.password, user.password)) return res.sendStatus(403,'application/json',{error:true,info:'Email Or Password Is Wrong'})
      jwt.verify(user.token,process.env.REFRESH_SECRET_KEY,(err,usr)=>{
        if(err) return res.sendStatus(403,'application/json',{error:true,info:'Email Or Password Is Wrong'})
        if(!usr) return res.sendStatus(403,'application/json',{error:true,info:'Email Or Password Is Wrong'})
        const accessToken = generateAccessToken({username:usr.username,email:usr.email})
        return res.sendStatus(200,'application/json',{error:false, info:{
          accessToken:accessToken,
          userId:user.userId
        }})
      })
    })
}

function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_SECRET_KEY,{expiresIn:'6h',algorithm: 'HS256'})
}

function generateRefreshToken(user){
  return jwt.sign(user,process.env.REFRESH_SECRET_KEY, {algorithm: 'HS256'})
}