const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const categorySchema = new Schema({
    name : String ,  
    description : String , 
    dateCreated : {
        type : Date , 
        default : Date.now()
    } , 
    lastModified : Date ,  
    profile : String
}) 

//The model 
module.exports = mongoose.model('category' , categorySchema) 
