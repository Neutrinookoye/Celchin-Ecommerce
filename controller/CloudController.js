const Uploader = require("./helper") 
const Upload = require("../model/upload")
class App {
   getUpload = async (req , res) => {
       try { 
           let uploads = await Upload.find({})
           res.render("send-to-cloud" , {
               title : "Send it to the cloud" , 
               uploads : uploads
           })
       }catch(error){
           res.json({message : error.message})
       }
   } 
    handleUpload = async (req , res) => {
       try { 
           const myFile = req.file 
           const imageUrl = await Uploader.uploadImage(myFile) 
            if (imageUrl){
                await new Upload({
                   name : req.body.name , 
                   fileUrl : imageUrl
                }).save()
            }
        //    res.json({
        //        message : "Upload was successful" , 
        //        data : imageUrl
        //     })
            res.redirect("/upload")
       }catch(error){
           res.json({message : error.message})
       }
    } 
    getSingleUpload = async (req , res) => {
        try {
            let {id} = req.params
            let upload = await Upload.findById(id) 
          
            if (upload) {
                res.render("single-upload" , {
                    upload : upload , 
                    title : "Single-upload"
                })
            }else{
                throw new Error("Not available")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    editUpload = async (req , res) => {
        try {
            let {id} = req.params
            let upload = await Upload.findById(id)  
            let {fileUrl} = upload  
            let indexOfSlash = fileUrl.lastIndexOf("/") 
            let fileName = fileUrl.slice(indexOfSlash + 1 , fileUrl.length).trim()
            await Uploader.deleteFile(fileName)  
            const myFile = req.file 
            const imageUrl = await Uploader.uploadImage(myFile) 
            if (imageUrl){
                await Upload.findByIdAndUpdate(upload._id , {
                    fileUrl : imageUrl
                } , {new : true , useFindAndModify : false})
            }
            res.redirect(`/upload/${upload._id}`)
        }catch(error){

        }
    }
}
module.exports = new App()