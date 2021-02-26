const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const hireSchema = new Schema({
    name : String , 
    email : String , 
    address : String , 
    zipCode : String , 
    city : String , 
    phone : String , 
    product : {
        type : Schema.Types.ObjectId , 
        ref : "product"
    } , 
    hireTimeLine : {
        fromDate : Date , 
        fromTime   : Date , 
        toDate : Date , 
        toTime : Date , 
        fTime : String , 
        tTime : String
    } , 
    comment : String , 
    cleared : {
        type : Boolean , 
        default : false
    }  , 
    dateCreated : {
        type : Date  , 
        default : Date.now()
    }, 
    response : String
}) 
// orderSchema.index({name : "text"}) 
module.exports = mongoose.model('hire' , hireSchema) 
