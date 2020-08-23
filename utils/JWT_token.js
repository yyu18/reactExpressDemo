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
module.exports={verifyAccessToken, generateAccessToken,generateRefreshToken,verifyRefreshToken}