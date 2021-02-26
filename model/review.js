const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const reviewSchema = new Schema({
    name : String , 
    email : String , 
    review : String , 
    ratings : Number , 
    dateCreated : {
        type : Date , 
        default : Date.now
    } , 
    reply : {
        message : String  , 
        dateSent : Date 
    }
}) 
module.exports = mongoose.model('review' , reviewSchema) 