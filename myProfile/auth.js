const { verifyAccessToken } = require('../utils/JWT_token')
const {  BadRequest,NotFound,Unauthorized,Forbidden } = require('../utils/error')
const AuthUser =  (req,res,next) =>{
    console.log('hello')
        if(!(req.headers && req.headers.authorization)) return res.sendStatus(403,'application/json',{
            error:true,
            info:'You Need To Sign In'
        });
    
        let accessToken = req.headers.authorization.split(' ')[1]

        const result = verifyAccessToken(accessToken)
        req.user = result
        return next()
}

const AuthUserId = (req,res,next) => {
    let userId = req.params.id
    if(userId!==req.user.userId) return next(new Unauthorized('access not allowed'))
    return next()
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlZndlZiIsImVtYWlsIjoiaHVudC55dXloQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2hhMSRjMjJlODc0MiQxJDM3MDcyZDYzY2FlM2YzZTcxN2M2N2I0MGUyZmQ5MjhmNjQxYTRhNmYiLCJpYXQiOjE1OTY4Mjk1MzN9.351hH1lN5r_o0bOElKTg0AzDXksZ5VTUULgyeapRbcs
module.exports = { AuthUser, AuthUserId }