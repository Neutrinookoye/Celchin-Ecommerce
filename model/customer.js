const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const CustomerSchema = new Schema({
    userName : String , 
    firstName : String , 
    lastName : String , 
    name : String , 
    otherName : String , 
    password : String , 
    email : String , 
    profile : String ,
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
    customerCode : String,
}) 

//The model 
module.exports = mongoose.model('customer' , CustomerSchema) 

//The account details for admins may not be necessary