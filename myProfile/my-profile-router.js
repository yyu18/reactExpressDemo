var express = require('express');
var router = express.Router();
const { AuthUser } = require('./auth');
const { createProfile, retrieveProfile, updateProfile, deleteProfile } = require('../mongoHandler/dbConnect');
const {  BadRequest,NotFound,Unauthorized,Forbidden } = require('../utils/error')
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
    retrieveProfile(info).then(profile=>{
        if(!profile) return next(new NotFound('Profile Is Not Exist'))
        return res.sendStatus(200,'application/json',{
            error:false,
            info:profile
        })
    }).catch(err=>{return next(err)})
})

router.put('/users-profile/:id',AuthUser,(req,res,next)=>{
    const userId = req.params.id
    if(userId!==req.user.userId) return next(new Unauthorized('access not allowed'))
    
    updateProfile({userId:userId},{myProfile:req.body.info})
    .then(res.sendStatus(201,'application/json',{
        error:false,
        info:'user updated'
    }))
    .catch(err=>next(err))
})

router.delete('/users-profile/:id',AuthUser,(req,res,next)=>{
    const userId = req.params.id
    if(userId!==req.user.userId) return next(new Unauthorized('access not allowed'))
    
    deleteProfile({userId:userId})
    .then(re=>res.sendStatus(200,'application/json',{
        error:false,
        info:"user profile deleted"
    })).catch(err=>next(err))
})


module.exports = router;