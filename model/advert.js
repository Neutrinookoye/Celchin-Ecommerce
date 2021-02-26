const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const advertSchema = new Schema({
    targetAudience : {
        gender : [] , 
        ageRange : {
            minimum : Number , 
            maximum : Number , 
        } , 
        likes: []
    } , 
    banner : String , 
    title : String , 
    duration : Number , 
    dateCreated : {
        type : Date , 
        default : Date.now()
    } , 
    content : String , 
    dateStarted : Date , 
    dateEnding : String , 
    sortOrder : Number , 
    adWords : String 
}) 
module.exports = mongoose.model('advert' , advertSchema) 