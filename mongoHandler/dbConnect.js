const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).catch(err=>console.log(err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  userId : { type : String, required:true, unique : true},
  username : { type : String, required : true },
  email : { type : String, required:true, unique : true},
  password: { type : String, required:true },
  token:{ type:String, required:true, default:0 },
  resetPasswordToken:{type:String, default:''},
  resetPasswordExpire:{type:Number, default:0}
});

const profileSchema = new mongoose.Schema({
  userId:{type:String,unique:true},
  myProfile:[],
  image:[String]
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
        if(err) return callback(err)
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

const updateProfile = (id,info) => {
  return new Promise((resolve,reject)=>{
    Profiles.updateOne(id,{
      $set : info
    },(err,profile)=>{
      if(err) return reject(err)
      return resolve(profile)
      })
    });
}

const retrieveProfile = (info) =>{
  return new Promise((resolve,reject)=>{
    Profiles.findOne(info,(err,user)=>{
      if(err) { return reject(err); }
      return resolve(user);
    })
  })
}

const deleteProfile = (info) =>{
  return new Promise((resolve,reject)=>{
    Profiles.deleteOne(info,(err,user)=>{
      console.log(err)
      console.log(user)
        if(err) return reject(err)
        return resolve(user)
      })
  })
}

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = { Users, Profiles,makeid,deleteProfile,updateUser,createUser,retrieveUser,createProfile,updateProfile,retrieveProfile }