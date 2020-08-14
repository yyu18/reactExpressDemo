const jwt = require('jsonwebtoken');
const AuthUser =  (req,res,next) =>{
        if(!(req.headers && req.headers.authorization)) return res.sendStatus(403,'application/json',{
            error:true,
            info:'You Need To Sign In'
        });
    
        let accessToken = req.headers.authorization.split(' ')[1];
        jwt.verify(accessToken,process.env.REFRESH_SECRET_KEY,(err,value)=>{
            if(err) return res.sendStatus(403, 'applcation/json',{error:true,info:'Login In First'})
            if(!value) return res.sendStatus(403, 'applcation/json',{error:true,info:'Login In First'})
            return next()
        })
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlZndlZiIsImVtYWlsIjoiaHVudC55dXloQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2hhMSRjMjJlODc0MiQxJDM3MDcyZDYzY2FlM2YzZTcxN2M2N2I0MGUyZmQ5MjhmNjQxYTRhNmYiLCJpYXQiOjE1OTY4Mjk1MzN9.351hH1lN5r_o0bOElKTg0AzDXksZ5VTUULgyeapRbcs
module.exports = { AuthUser }