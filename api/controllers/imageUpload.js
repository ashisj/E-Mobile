const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        if(process.env.NODE_ENV === 'production'){
            cb(null,'client/build/uploads/images');
        } else {
            cb(null,'client/public/uploads/images');
        }
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload = multer({
    storage:storage ,
    limits:{
        fileSize:1024 * 1024 * 5
    }
});

module.exports = upload;