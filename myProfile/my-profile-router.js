var express = require('express');
var router = express.Router();
const { AuthUser } = require('./auth');
router.post('/users-profile/:id',AuthUser,(req,res,next)=>{
    console.log(req.params)
    return res.sendStatus(200,'application/json',{
        error:false,
        info:'asdf'
    })
    console.log('hello')
})

router.get('/users-profile/:id',(req,res,next)=>{
    console.log('hello')
})

router.patch('/users-profile/:id',AuthUser,(req,res,next)=>{
    console.log('hello')
})

router.delete('/users-profile/:id',(req,res,next)=>{
    console.log('hello')
})


module.exports = router;