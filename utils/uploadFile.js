const multer  = require('multer')
const sharp = require("sharp");

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

 let resizeImage = async(width,height,file,callback)=>{
     try{
        await sharp(file.path)
        .resize(width, height)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`upload/${file.filename}`)
        callback(null,true)
     } catch(err){
        callback(err)
     }
 }

module.exports = {uploadProfileImage,resizeImage}
