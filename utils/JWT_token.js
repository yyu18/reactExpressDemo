const jwt = require('jsonwebtoken');
function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_SECRET_KEY,{expiresIn:'6h',algorithm: 'HS256'})
}

function generateRefreshToken(user){
    return jwt.sign(user,process.env.REFRESH_SECRET_KEY, {algorithm: 'HS256'})
}

function verifyRefreshToken(token) {
    return jwt.verify(token,process.env.REFRESH_SECRET_KEY, {algorithm: 'HS256'})
}

function verifyAccessToken(token) {
    return jwt.verify(token,process.env.ACCESS_SECRET_KEY, {algorithm: 'HS256'})
}

class JWTGenerate {
    constructor(user){
        this.user = user
    }
    generateAccessToken(){
        return jwt.sign(this.user,process.env.ACCESS_SECRET_KEY,{expiresIn:'6h',algorithm: 'HS256'})
      }
    
    generateRefreshToken(){
        return jwt.sign(this.user,process.env.REFRESH_SECRET_KEY, {algorithm: 'HS256'})
    }
}

class JWTVerify{
    constructor(token){
        this.token = token
    }  
    verifyRefreshToken() {
        return jwt.verify(this.token,process.env.REFRESH_SECRET_KEY, {algorithm: 'HS256'})
    }
    
    verifyAccessToken() {
        return jwt.verify(this.token,process.env.ACCESS_SECRET_KEY, {algorithm: 'HS256'})
    }
}
//cilent relationship management
module.exports={JWTGenerate, JWTVerify, verifyAccessToken, generateAccessToken,generateRefreshToken,verifyRefreshToken}