const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const administratorSchema = new Schema({
    userName : String , 
    name : String , 
    password : String , 
    email : String , 
    profile : String ,
    role : String ,
    addedBy : String , 
    phoneNumber : String , 
    dateAdded : {
        type : Date , 
        default : Date.now()
    } ,  
    age : Number , 
    address : {
        country : String , 
        state : String , 
        province : String , 
        street : String , 
        zipCode : String
    } ,
    adminCode : String,
}) 
module.exports = mongoose.model('admin' , administratorSchema) 
