var express = require('express');
var router = express.Router();

router.post('/save',(req,res,next)=>{
    console.log('hello')
})

module.exports = router;