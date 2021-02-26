const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const inquireSchema = new Schema({
    name : String , 
    email : String , 
    address : String , 
    zipCode : String , 
    city : String , 
    phone : String , 
    products : [] , 
    comment : String , 
    dateInquired : {
        type : Date , 
        default : Date.now()
    } , 
    response : String  , 
    status : {
        type : Boolean , 
        default : false
    }
}) 
// orderSchema.index({name : "text"}) 
module.exports = mongoose.model('inquire' , inquireSchema) 
