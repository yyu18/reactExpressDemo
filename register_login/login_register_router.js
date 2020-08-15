const express = require('express');
const passwordHash = require('password-hash');

const { nodeMailer } = require('./nodeMailer');

const privateKey = process.env.ACCESS_SECRET_KEY

const { updateUser, createUser, retrieveUser } = require('../mongoHandler/dbConnect');
const {  BadRequest,NotFound,Unauthorized,Forbidden } = require('../utils/error')
const { generateAccessToken,generateRefreshToken,verifyRefreshToken} = require('../utils/JWT_token')
//router created
const router = express.Router();

router.get('/password-management/:email',ResetPasswordLink)

router.patch('/password-management/:token',ResetPassword)

router.post('/checkEmail',checkEmail)

router.post('/users-account',register)

//router.patch('/users-account/:id',updateUserInfo)

router.post('/users-status',login)

router.delete('/users-status',logout)

router.post('/token',newAccessToken)
module.exports = router;

function ResetPassword (req,res,next) {
  let token = req.params.token
  retrieveUser({
      resetPasswordToken:token,
      resetPasswordExpire:{ $gt:Date.now() }
  },(err,user) => {
      if(err) return next(err)

      if(!user) return next(new NotFound('Email Is Invalid'))

      let hashedPassword = passwordHash.generate(req.body.password)
      user.password = hashedPassword
      user.save((err,re)=>{
          if(err) return next(err)
          return res.sendStatus(201,'application/json',{
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
  if(!email) throw new BadRequest('email is invalid')
  retrieveUser({email:email},(err,info)=>{
      if(err) return next(err)
      if(!info) return next(new NotFound('email is invalid'))
   
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
  if(!req.body.email) throw new NotFound('Email Is Invalid')
  let info = { email: req.body.email }
  retrieveUserByEmail(info,(err,user)=>{
    if(err) return next(err)
    if(user) return next(new Forbidden('Email Is Used'))
    return res.sendStatus(200,'application/json',{
      error:false,
      info:'Email Can Use'
    })
  })
}

function register (req,res,next)  {
  console.log(req.body)
  if(!(req.body.username&&req.body.email&&req.body.password)) throw new NotFound('Email Or Password Is Wrong')

    let userId = req.body.username.split(' ').join('') + '-' + makeid(20)
    let hashedPassword = passwordHash.generate(req.body.password)

    let info = {
      userId:userId,
      username:req.body.username,
      email:req.body.email,
      password: hashedPassword,
      refreshToken:0,
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
    if(!(req.body.email&&req.body.password)) throw new NotFound('Email Or Password Is Wrong')
    retrieveUser({ email: req.body.email },(err,user)=>{
      if(err) return next(err)
      
      if(!user) return next(new NotFound('Email Or Password Is Wrong'))
      
      if(!passwordHash.verify(req.body.password, user.password)) return res.sendStatus(403,'application/json',{error:true,info:'Email Or Password Is Wrong'})
      
      const refreshToken = generateRefreshToken({ username:user.username, email:user.email, userId:user.userId})
      const accessToken = generateAccessToken({ username:user.username, email:user.email, userId:user.userId})
      updateUser({ email: req.body.email }, {  token:refreshToken }, (err,user)=>{
        if(err) return next(err)
        return res.sendStatus(201,'application/json',{error:false, accessToken:accessToken, refreshToken:refreshToken})
      })
    })
}

function logout(req,res,next) {
  if(!(req.headers && req.headers.authorization)) throw new Unauthorized('You Need To Sign In')

  const refreshToken = req.headers.authorization.split(' ')[1]
  retrieveUser({token:refreshToken},(err,re)=>{
    if(err) return next(err)
    if(!re) return next(new NotFound('Invalid Authorization'))

    const result = verifyRefreshToken(refreshToken)

    updateUser({email:result.email},{token:0,resetPasswordExpire:'',resetPasswordToken:0},(err,usr)=>{
      if(err) next(err)
      if(!usr) throw new NotFound('not found')
      return res.sendStatus(205,'application/json',{error:false,info:'user logout'})
    })
  })
}

function newAccessToken(req,res,next) {
  if(!(req.headers && req.headers.authorization)) throw new Unauthorized('You Need To Log In')

  const refreshToken = req.headers.authorization.split(' ')[1]
  
  retrieveUser({token:refreshToken},(err,re)=>{
    if(err) return next(err)
    if(!re) return next(new NotFound('Invalid Authorization'))
    const result = verifyRefreshToken(refreshToken)

    const accessToken = generateAccessToken({username:result.username,email:result.email,userId:result.userId})
  
    return res.sendStatus(200,'application/json',{
      error:false,
      accessToken:accessToken
    })
  })
}

