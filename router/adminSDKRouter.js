var express = require('express');
var router = express.Router();
const { sendMessage,subscribeToTopic,unsubscribeFromTopic,sendMulticast } =require('../tools/tools_adminSDK.js');

router.post('/send',(req,res,next)=>{
  sendMessage(req,res,(err,data)=>{
    if(err) {
      next(err);
    } else {
      res.json({
        'success':data
      })
    }
  });
});

router.post('/multicast',(req,res,next)=>{
  sendMulticast(req,res,(err,data)=>{
    if(err){
      console.log(err);
    } else {
      res.json({
        'success':data
      })
    }
  })
})

router.post('/subcribe',(req,res,next)=>{
  subscribeToTopic(req,res,(err,data)=>{
    if(err){
      next(err);
    } else {
      res.json({
        'success':data
      })
    }
  })
})

router.post('/unsubcribe',(req,res,next)=>{
  unsubscribeFromTopic(req,res,(err,data)=>{
    if(err){
      next(err);
    } else {
      res.json({
        'success':data
      })
    }
  })
})



module.exports = router;