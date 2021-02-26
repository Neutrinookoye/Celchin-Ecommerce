const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const configurationSchema = new Schema({
    siteName : String , 
    siteMotto : String , 
    siteLogo : String , 
    siteDescription : String , 
    siteKeywords : String , 
    loginTrials : Number , 
    socialPages : [{
        name : String , 
        url : String
    }] , 
    telephone : [] , 
    address : [{
        country : String , 
        state : String , 
        province :String , 
        officeNumber : String
    }] , 
    accountDetails : [{
        accountName : String , 
        accountNumber : String , 
        bankName : String
    }]
}) 
module.exports = mongoose.model('configuration' , configurationSchema) 