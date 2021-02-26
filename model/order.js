const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const orderSchema = new Schema({
    name : String , 
    email : String , 
    address : String , 
    city : String , 
    products : [] , 
    orderDate : {
        type : Date , 
        default : Date.now()
    } , 
    cleared : {
        type : Boolean , 
        default : false
    }
}) 
// orderSchema.index({name : "text"}) 
module.exports = mongoose.model('order' , orderSchema) 
