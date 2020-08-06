const {Users_findOne} = require('../mongoHandler/dbConnect')
const AuthUser =  (req,res,next) =>{
        if(!(req.headers && req.headers.authorization)) return next('You need to login first');
    
        let token = req.headers.authorization.split(' ')[1];
        Users_findOne(token,(err,user)=>{
            if(err) {
                return next(err);
            }
            if(!user) return next('You need to login first');
            console.log('middleware check')
            next();
        })
}

module.exports = { AuthUser }