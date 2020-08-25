var express = require('express');
var router = express.Router();
const { AuthUser } = require('./auth');
const { createProfile, retrieveProfile, updateProfile, deleteProfile } = require('../mongoHandler/dbConnect');
const {  BadRequest,NotFound,Unauthorized,Forbidden } = require('../utils/error')
const {uploadProfileImage,resizeImage} = require('../utils/uploadFile')
const sharp = require("sharp");

//create user profile
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

//patch profile image
router.post('/users-profile/:id',(req,res,next)=>{
    return uploadProfileImage(req, res, async (err) => {
        if(err) next(err)
    
            let info = {
                userId : req.params.id
            }
            try{
                let user = await retrieveProfile(info)

                user.image = req.files.reduce((acc,cur)=>{
                    acc.push(process.env.PROFILE_SERVER_DOMAIN+'/static/image-profile'+'/'+cur.filename)
                    return acc
                },[])

                await user.save()
                return res.sendStatus(200,'application/json',{
                    error:false,
                    info:user.image
                })
        } catch(err) {
            next(err)
        }
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
//update user profile
router.put('/users-profile/:id',AuthUser,(req,res,next)=>{
    let userId = req.params.id
    if(userId!==req.user.userId) return next(new Unauthorized('access not allowed'))
    if(!req.body.info) return next(new BadRequest('Bad Request'))
    updateProfile({userId:userId},{myProfile:req.body.info})
    .then(
        res.sendStatus(201,'application/json',{
            error:false,
            info:'user profile updated'
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
