const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usersInfo', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).catch(err=>console.log(err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    resetPasswordToken:String,
    resetPasswordExpire:Number
  });

const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users_findOne: (token, callback)=>{
        Users.findOne({
            token:token,
        },(err,user)=>{
            if(err) {
                callback(err);
                return false;
            }
            callback(null,user);
        })
    }
}