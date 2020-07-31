const nodemailer = require("nodemailer");

module.exports = {
    nodeMailer: async (email,token)=>{  
      let config = {
        clientUrl:'http://192.168.2.24:3000/order-system/reset-password',
        token:token
      }
        var account = {
            user:'hubertyuyh@gmail.com',
            pass:'yyhggzh#'
        }
        var receivers = [email,'hubertyuyh@gmail.com'];
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass, // generated ethereal password
          },
        });
        try{
          let info = await transporter.sendMail({
            from: '"Hubert Yu Admin" <hubertyuyh@gmail.com>', // sender address
            to:receivers, // list of receivers
            subject: "Reset Password For "+email, // Subject line
            text: "Reset Password For"+email, // plain text body
            html: '<h4><b>Reset Password</b></h4>' +
            '<p>To reset your password, complete this form:</p>' +
            '<a href="'+config.clientUrl+'?token='+config.token+'">reset the password</a>' +
            '<br><br>' +
            '<p>Security Made By Hubert</p>', // html body
          });
          return {
            error:false,
            info:'Message Sent Successfully'
          }
        } catch(err) {
          next(err);
          console.log(err);
        }

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
}