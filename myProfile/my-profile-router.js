var express = require('express');
var router = express.Router();
const { AuthUser } = require('./auth');
const { createProfile, retrieveProfile } = require('../mongoHandler/dbConnect');
router.post('/users-profile',AuthUser,(req,res,next)=>{
    let info = {
        userId:req.user.userId,
        myProfile:[]
    }
    createProfile(info, ( err,profile )=> {
        if(err) return next(err);
        return res.sendStatus(201,'application/json',{
            error:false,
            info:profile
        })
    })
})

router.get('/users-profile/:id',(req,res,next)=>{
    let info = {
        userId : req.params.id
    }
    retrieveProfile(info,( err, profile) => {
        if(err) next(err);
        if(!profile) return res.sendStatus(204,'application/json',{error:true,info:'User Profile Not Found'})
        return res.sendStatus(200,'application/json',{
            error:false,
            info:profile
        })
    })
})

router.patch('/users-profile/:id',AuthUser,(req,res,next)=>{
    console.log('hello')
})

router.delete('/users-profile/:id',(req,res,next)=>{
    console.log('hello')
})


module.exports = router;