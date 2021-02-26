const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const shopSchema = new Schema({
    product : {
        type : Schema.Types.ObjectId , 
        ref : "product" 
    } , 
    quantity : Number , 
    dateAdded : {
        type : Date , 
        default : Date.now()
    } , 
    status : {
        type : Boolean , 
        default : false
    }
}) 
shopSchema.index({name : "text"}) 
module.exports = mongoose.model('shop' , shopSchema) 
