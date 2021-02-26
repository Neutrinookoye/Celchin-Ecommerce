const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const sellGeneratorSchema = new Schema({
    name : String , 
    email : String , 
    phone : String , 
    state : String , 
    productName : String , 
    manufacturer : String ,
    description : String , 
    amount : Number , 
    uploads : [] , 
    dateCreated : {
        type : Date , 
        default : Date.now()
    } , 
    cleared : {
        type : Boolean , 
        default : false
    } , 
    response : String
}) 
// orderSchema.index({name : "text"}) 
module.exports = mongoose.model('generatorsell' , sellGeneratorSchema) 
