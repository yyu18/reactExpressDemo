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
  userId:String,  
  username:String,
  email:String,
  password:String,
  token:String,
  resetPasswordToken:String,
  resetPasswordExpire:Number
});

const profileSchema = new mongoose.Schema({
  userId:String,
  myProfile:[{ 
    id:String,
    name:String,
    type:String,
    content:[String]
   }]
})

const Users = mongoose.model('Users', userSchema);
const Profiles = mongoose.model('Profiles', profileSchema);

const createUser = (info, callback)=> {
  Users.create(info,(err,user)=>{
    if(err) return callback(err)
    return callback(null,user)
})
}

const retrieveUser = (info, callback)=>{
    Users.findOne(info,(err,user)=>{
        if(err) { return callback(err); }
        return callback(null,user);
    })
}

const updateUser = (id,info,callback)=>{
  Users.updateOne(id,{
    $set : info
  },(err,user)=>{
    if(err) return callback(err);
    return callback(null,user)
  });
}

const createProfile = (info,callback) => {
  Profiles.create(info,(err,profile) => {
    if(err) return callback(err);
    return callback(null,profile)
  })
}

const updateProfile = (info,callback) => {
  Profiles.update(info,{
    $set : info
  },(err,profile)=>{
    if(err) return callback(err);
    return callback(null,profile)
  });
}

const retrieveProfile = (info,callback) =>{
  Profiles.findOne(info,(err,user)=>{
    if(err) { return callback(err); }
    return callback(null,user);
})
}

const deleteProfile = (info,callback) =>{
  
}
module.exports = { Users,updateUser,createUser,retrieveUser,createProfile,updateProfile,retrieveProfile }