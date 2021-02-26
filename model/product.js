const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const productSchema = new Schema({
    name : String , 
    inShop : {
        type : Boolean , 
        default : false
    } , 
    forHire : {
        type : Boolean , 
        default : false
    } , 
    quantity : Number , 
    productCode : String , 
    specification : String , 
    description : String , 
    shipping : String , 
    warranty : String , 
    returnPolicy : String , 
    reviews : [] , 
    dateCreated : {
        type : Date , 
        default : Date.now()
    } , 
    lastModified : Date , 
    profile : String , 
    category : {
        type : Schema.Types.ObjectId , 
        ref : "category"
    } , 
    status : {
        type : String , 
        default : "P"
    } ,
    amount : Number

}) 
// productSchema.index({name : "text"}) //Indexing single fields 
// productSchema.index({name : "text" , status: "text"}) Indexing multiple fields 
productSchema.index({"$**" : "text"} , {"weights" : {name : 3 , status : 2}})
//The model 
module.exports = mongoose.model('product' , productSchema) 
//The account details for admins may not be necessary