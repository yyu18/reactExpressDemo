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

//resume mock data api
const resumeMockSchema = new mongoose.Schema({
  userId:{type:Number,unique:true},
  info:{
    name:{ type:String },
    email:{ type:String },
    tel:{ type:Number },
    role:{ type: String }
  },
  profile:[
    {
      id:{ type:Number },
      myProfile: { type:String },
      status: { type:Boolean }
    }
  ],
  workExp: [
    {
    id:{ type:Number },
    title:{ type:String },
    date:{ type:String},
    address:{ type:String },
    description: [String],
    status:{ type: Boolean }
    }
  ],

  compSkill:[
    {
      id:{ type:Number },
      technology:{ type:String },
      level:{ type:Number },
      status:{ type:Boolean }
    }
  ],

    eduExp:[
      {
      id:{ type:Number },
      title:{type:String},
      date:{type:String},
      school:{type:String},
      description:[String]
      }
    ]
})

const Resumes = mongoose.model('resumes', resumeMockSchema);

const getResume = (resume) =>{
  return new Promise((resolve,reject)=>{
    Resumes.find(resume,(err,user)=>{
      console.log(err)
      console.log(user)
        if(err) return reject(err)
        return resolve(user)
      })
  })
}

const createResume = (resume,callback) => {
  Resumes.create(resume,(err,resume) => {
    if(err) return callback(err);
    return callback(null,resume)
  })
} 

module.exports = { getResume, createResume , Users, Profiles,makeid,deleteProfile,updateUser,createUser,retrieveUser,createProfile,updateProfile,retrieveProfile }