const multer  = require('multer')

let uploadProfileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')
    },

    filename: (req, file, callback) => {
        let filename = req.params.id + '-' + req.files.length + '.' + file.mimetype.split('/')[1]
        callback(null,  filename )
    }
})

let uploadProfileImage = multer({ 
    storage: uploadProfileStorage,
    limits:{
        fileSize:1000000,
        fields:0,
        files:2,
        parts:2
    },
    fileFilter:(req,file,callback)=>{
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg") callback(new Error('Only .png, .jpg and .jpeg format allowed!'))
       
        return callback(null, true)
    }
 }).array('profileImage')

module.exports = {uploadProfileImage}
