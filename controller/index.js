const GoogleCloud = require("@google-cloud/storage") 
const path        = require("path") 
const serviceKey  = path.join(__dirname , "./celchin.json") 

const {Storage} = GoogleCloud 

const storage   = new Storage({
    keyFilename : serviceKey , 
    projectId : "celchin"
}) 

module.exports = storage 