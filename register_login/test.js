const router = require("./login_register_router");
const { updateProfile, retrieveUser } = require("../mongoHandler/dbConnect");

router.get('/password-management/:id',ResetPasswordLink)
router.patch('/password-management',ResetPassword)

function ResetPassword (req,res,next) {
    let token = req.params.token
    if(!token) return res.sendStatus(401,'application/json',{ error:true, info:'Link Invalid'})
    retrieveUser({
        resetPasswordToken:token,
        resetPasswordExpire:{ $gt:Date.now() }
    },(err,user) => {
        if(err) return next(err)

        if(!user) return res.sendStatus(404,'application/json',{
            error:true,
            info:'Link Invalid'
        })

        if(!req.body.password) return res.sendStatus(404,'application/json',{
            error:true,
            info:'Password Invalid'
        })
        let hashedPassword = passwordHash.generate(req.body.password)
        let token = jwt.sign(
          { 
            username:user.username,
            email:user.email,
            password: hashedPassword
          }, 
          privateKey, { algorithm: 'HS256' });

          user.password = hashedPassword
          user.token=token;
          user.save((err,re)=>{
              if(err) next(err)
              res.sendStatus(201,'application/json',{
                  error:false,info:'Password Updated'
              })
          })
        })
}