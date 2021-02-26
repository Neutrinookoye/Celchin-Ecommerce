const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 
const TraineeSchema = new Schema ({
    firstName  : String , 
    lastName : String , 
    otherName : String , 
    fullName : String , 
    dob : Date , 
    email : String , 
    telephone : String , 
    address : {
        country : String , 
        state : String , 
        province : String , 
        street : String
    } , 
    password : String , 
    status : String , 
    userToken :String , 
    userCode : String , 
    approved : {
        type : Boolean , 
        default : false
    } , 
    program : {
        name : String , 
        mode : String , 
    } , 
    gender : String
})

module.exports = mongoose.model("trainee" , TraineeSchema)