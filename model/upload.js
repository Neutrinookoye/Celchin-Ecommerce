const mongoose = require("mongoose") 
const Schema = mongoose.Schema 

const UplaodSchema = new Schema({
    name : String , 
    fileUrl :  String
}) 

module.exports = mongoose.model("upload" , UplaodSchema)