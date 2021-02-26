const express     = require("express") 
const router      = express.Router() 
const CloudController = require("../controller/cloudController") 
const FileController = require("../controller/fileController")  


const Multer = require("multer") 

const multer = Multer({
    storage : Multer.memoryStorage() , 
    limits :  { 
        fileSize : 10*1024*1024 , 
    } ,  
})

router.get("/upload" , CloudController.getUpload) 
router.post("/upload" , multer.single("avatar") , CloudController.handleUpload )
router.get("/upload/:id" , CloudController.getSingleUpload) 
router.post("/upload/:id" ,  multer.single("avatar")  , CloudController.editUpload)
module.exports = router 