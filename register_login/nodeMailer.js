const nodemailer = require("nodemailer");
const { gmail } = require("googleapis/build/src/apis/gmail");

module.exports = {
    nodeMailer: async ()=>{  
        var account = {
            user:'hubertyuyh@gmail.com',
            pass:'yyhggzh#'
        }
        var receivers = 'hunt.yuyh@gmail.com';
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
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Hubert Yu" <hubertyuyh@gmail.com>', // sender address
          to:receivers, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
}