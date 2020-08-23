const multer  = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname )
  }
})

let uploadProfileImage = multer({ 
    storage: storage,
    limits:{
        fileSize:1000000,
        fields:0,
        files:2,
        parts:2
    },
    fileFilter:(req,file,cb)=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
 }).array('profileImage')

module.exports = {uploadProfileImage}