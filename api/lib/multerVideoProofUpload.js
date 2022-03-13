var path = require('path');
const multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var x = (file);
        console.log(x)
        cb(null, 'uploads/user_video/')
    },
    filename: function (req, file, cb) {
        var x = (file);
        console.log(x)
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype == "video/mp4" || file.mimetype == "video/webm" || file.mimetype == "video/ogg") {
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

module.exports = upload;