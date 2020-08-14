const { retrieveUser } = require('../mongoHandler/dbConnect')
const AuthUser =  (req,res,next) =>{
        if(!(req.headers && req.headers.authorization)) return res.sendStatus(403,'application/json',{
            error:true,
            info:'You Need To Sign In'
        });
    
        let token = req.headers.authorization.split(' ')[1];
        retrieveUser(token,(err,user)=>{
            if(err) { return next(err); }
            if(!user) return res.sendStatus(403, 'application/json', { error:true, info:'You Need To Sign In' })
            req.user = user;
            next();
        })
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlZndlZiIsImVtYWlsIjoiaHVudC55dXloQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2hhMSRjMjJlODc0MiQxJDM3MDcyZDYzY2FlM2YzZTcxN2M2N2I0MGUyZmQ5MjhmNjQxYTRhNmYiLCJpYXQiOjE1OTY4Mjk1MzN9.351hH1lN5r_o0bOElKTg0AzDXksZ5VTUULgyeapRbcs
module.exports = { AuthUser }