var path = require('path');
const multer = require('multer')

/* 
  Upload Images of Admin Profile
*/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var x = (file);
        console.log(x)
        cb(null, 'uploads/kyc_images/')
    },
    filename: function (req, file, cb) {
        var x = (file);
        console.log(x)
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var uploadKyc = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "application/octet-stream" ) {
            callback(null, true)
        }
        else {
            console.log("Only jpeg and png extension allowed !")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = uploadKyc;