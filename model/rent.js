const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const rentSchema = new Schema({
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
    } , 
    price : Number , 
    description : String , 
    specification : String
}) 
rentSchema.index({name : "text"}) 
module.exports = mongoose.model('rent' , rentSchema) 