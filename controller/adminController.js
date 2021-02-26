const Admin    = require("../model/admin")  
const Category = require("../model/category") 
const Product  = require("../model/product")  
const Shop     = require("../model/shop") 
const Hire                   = require("../model/hire") 
const Rent                   = require("../model/rent")  
const Order                   = require("../model/order")  
const Inquire                 = require("../model/inquire") 
const Customer               = require("../model/customer") 
const Sell = require("../model/generatorsell")   
const Ad = require("../model/advert")   
const AccountNumberGenerator = require("./accountGenerator") 
const dotenv          = require("dotenv").config()

const Uploader = require("./helper") 

const bcrypt = require("bcryptjs")
const FileHandler = require("./file") 


class App {
    getAdminLogin = async (req ,res) => {
        try {
            res.render("admin-login" , {
                title : "Celchin Admin Login"  , 
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    handleLogout = (req ,res) => {
        delete req.session.celchin_admin
        res.redirect("/celchin-admin")
    } 
    handleLogin = async (req , res) => { 
        try { 
            const {email , password} = req.body.data 
            const admin = await Admin.findOne({ email : email})
            if(admin){ 
                let isValidAdmin = await bcrypt.compare(password , admin.password)
                if (isValidAdmin){ 
                    req.session.celchin_admin = email
                    res.json({
                       valid : true
                    })
                }else {
                    throw new Error()
                }
            }else {
               throw new Error("Provide valid credentials") 
            }
        
        }catch(error) {
            res.json({error : error.message})
        }
    }
   
    isLogin = async (req ,res  , next) => {
        try {
            if (req.session.celchin_admin){
                next()
            }else {
            res.redirect("/celchin-admin")
            }
        }catch(erorr){
            res.json({erorr : erorr.message})
        }
    } 
    registerAdmin = async (req , res) => {
        try {
            res.render("admin-register" , {
                title : "Celchin Admin Login"  , 
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    handleAdminRegistration = async (req , res) => {
        try { 
            const {email , password} = req.body.data  
            let admins = await Admin.find({})
            if (admins.length === 0 ){ 
                let pass = await bcrypt.hash(password , 10) 
                let admin = await new Admin({
                    email : email , 
                    password : pass
                }).save() 
                if (admin){ 
                    req.session.celchin_admin = email
                    res.json({ 
                        ework : true , 
                        message :`Your registration was successful ${email}`
                     }) 
                }else {
                    throw new Error("Unable to save")
                }
                
            }else {
                throw new Error("A user already exist with this data")
            }
        }catch(error){
            res.json({
               message : error.message
           })
        }
    }
    getAdminDashboard = async (req , res) => {
        try {
            let adminInfo = await Admin.findOne({email : req.session.celchin_admin})
            res.render("admin-dashboard" , {
                title : "Celchin Admin Dashboard"  , 
                admin : adminInfo
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getAdminProfile = async (req , res) => {
        try {
            let adminInfo = await Admin.findOne({email : req.session.celchin_admin})
            res.render("admin-profile" , {
                title : "Celchin Admin Profile"  , 
                admin : adminInfo
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updateProfile = async (req , res) => {
        try { 
            let {email , fullName , phoneNumber} = req.body  
            console.log(req.body)
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            email = email[1]
            fullName = fullName[1] 
            phoneNumber = phoneNumber[1]
            let profile
            if (req.file){ //Use req.file if you are sending just a single file while req.files for many
                //FileHandler.deleteFile(`./public/admin_profile/${bookName}`)
                let date = new Date().getDate() 
                let fileName = `${date}-${req.file.originalname}`
                profile = fileName
                FileHandler.createDirectory("./public/admin-profile")  
                FileHandler.moveFile(fileName , "./public/uploads" , "./public/admin-profile")   
            }
            // let alreadyExist = await Admin.findOne({ $or : [{
            //    name  : fullName , 
            //    email : email , 
            //    phoneNumber : phoneNumber 
            // }]}) 
            // let isSamePerson = alreadyExist.email === admin.email 
            //                    && 
            //                    alreadyExist.name === admin.name 
            //                    && 
            //                    alreadyExist.phoneNumber === admin.phoneNumber  
            if (admin){
            // if (!alreadyExist ||isSamePerson ){
                if (profile){
                    await Admin.findByIdAndUpdate(admin._id , {
                        profile : profile , 
                        name : fullName , 
                        email : email , 
                        phoneNumber : phoneNumber
                    } , { new : true , useFindAndModify : false})
                }else {
                    await Admin.findByIdAndUpdate(admin._id , {
                        name : fullName , 
                        email : email , 
                        phoneNumber : phoneNumber
                    } , { new : true , useFindAndModify : false})
                }
                res.json({
                    message : `We still dey ball like Dele Giwa`
                })
            }else {
                throw new Error(" A problem occured since you have other user with same detail")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    checkPassword = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {password} = req.body.data 
            let isPassCorrect = await bcrypt.compare(password , admin.password) 
            if (isPassCorrect){
                res.json({
                    message : true
                })
            }else {
                res.json({
                   message : false
                })
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    resetPassword = async (req , res) => {
        try{
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {currentPassword , newPassword , confirmPassword } = req.body.data 
            let isPassCorrect = await bcrypt.compare(currentPassword , admin.password) 
            if (isPassCorrect){
                let encryptPassword = await bcrypt.hash(newPassword , 10)  
                await Admin.findByIdAndUpdate(admin._id , {
                    password : encryptPassword
                } , {
                        new : true ,
                        useFindAndModify : false
                }) 
                res.json({message : "Your password was updated"}) 
            }else {
                res.json({
                    message : "The current password you provide is wrong"
                })
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    //Category Management 
    getProductCategory = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const categories = await Category.find({}) 
            // Creating a bucket
            Uploader.createBucket("adelekebaba" , "us-west2" , "STANDARD")
            .then(r => console.log(r))
            .catch(error => console.error(error))  

            // Uploader.deleteBucket("adeleke")
            // .then(r => console.log(r))
            // .catch(error => console.error(error))  
            /** ADD IAM member */ 
            // Uploader.addBucketMember("adelekebaba" , "roles/storage.objectViewer" , "adetight@gmail.com")
            // .then(r => console.log(r))
            // .catch(error => console.error(error)) 

            //Listing buckets 
            // Uploader.listFiles("celchin")
            // .then(buckets => {
            //     buckets.map(bucket => console.log(bucket.name))
            // })
            .catch(error => console.error(error)) 
            res.render("product-categories" , {
                title : "Product Categories" ,
                categories : categories ,  
                admin : admin
            })
        }catch(error){
            res.json({
                message : error.message 
            })
        }
    } 
    createProductCategory = async (req , res) => {
        try { 
            let {title , content} = req.body 

            let admin = await Admin.findOne({email : req.session.celchin_admin})
            title = title[1]
            
            let profile 
            console.log(req.body)
            if (req.file){ 
                // FileHandler.deleteFile(`./public/admin_profile/${bookName}`)
                // let date = new Date().getDate() 
                // let fileName = `${date}-${req.file.originalname}`
               
                // FileHandler.createDirectory("./public/product-categories")  
                // FileHandler.moveFile(fileName , "./public/uploads" , "./public/product-categories")  
                const myFile = req.file 
                const imageUrl = await Uploader.uploadImage(myFile)  
                profile = imageUrl
            }
            let alreadyExist = await Category.findOne({title : title})
             
            if (!alreadyExist ){
                await new Category({
                    name : title , 
                    description : content , 
                    profile : profile
                }).save()
                res.json({
                    message : `Category successfully created`
                })
            }else {
                throw new Error(" A problem occured since you have other user with same detail")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    getSingleCategory = async (req , res) => {
        try {
            let name = req.params.categoryName.trim() 
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let category = await Category.findOne({name : name})
            if (category){
                res.render("single-category", 
                {
                    admin : admin, 
                    category : category, 
                    title : `${category.name} Category`
                })
            }else {
               throw new Error("An error just occured")
            }  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    fetchCategoryContent = async (req , res) => {
        try { 
            let post = await Category.findById(req.params.id) 
            res.json(post) 
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getEditCategory = async (req , res) => {
        try {
            let name = req.params.categoryName.trim() 
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let category = await Category.findOne({name : name}) 
            if (category){
                res.render("edit-product-category", 
                {
                    admin : admin, 
                    category : category, 
                    title : `Edit ${category.name} Category`
                })
            }else {
               throw new Error("An error just occured")
            }  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    updateCategoryAvatar = async (req , res) => {
        try { 
            let category = await Category.findById(req.params.id)  
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            if (req.file){ 
            
                let {profile} = category  
                let indexOfSlash = profile.lastIndexOf("/") 
                let fileName = profile.slice(indexOfSlash + 1 , profile.length).trim()
                await Uploader.deleteFile(fileName)  
                const myFile = req.file 
                const imageUrl = await Uploader.uploadImage(myFile) 
                if (imageUrl){
                    await Category.findByIdAndUpdate(category._id, {
                        profile : imageUrl
                    }  , { new : true , useFindAndModify : false})
                }
         
            }
            res.json({ 
                message  :"Category image was updated successfully"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updateCategoryContent = async (req , res) => {
        try { 
            let category = await Category.findById(req.params.id)  
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {title ,description} = req.body.data 
            if (category) {
                await Category.findByIdAndUpdate(category._id , {
                    name : title , 
                    description: description  , 
                    lastModified : new Date()
                } , {new : true , useFindAndModify : false}) 
                res.json({
                    message : "We are about to start handling the case "
                })
            }else {
                throw new Error()
            }
            
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    //Product Management 
    getProducts = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const products = await Product.find({}).populate("category")  
            const categories = await Category.find({}) 
            res.render("products" , {
                title : "Products" ,
                products :products , 
                categories : categories , 
                admin : admin
            })
        }catch(error){
            res.json({
                message : error.message 
            })
        }
    }
    createProduct = async (req , res) => {
        try { 
            let {
                title , content , category , 
                specification , warranty , quantity , amount} = req.body 
            console.log(req.body)
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let profile 
            if (req.file){ 
                //FileHandler.deleteFile(`./public/admin_profile/${bookName}`)
                let date = new Date().getDate() 
                let fileName = `${date}-${req.file.originalname}`
                profile = fileName
                FileHandler.createDirectory("./public/products")  
                FileHandler.moveFile(fileName , "./public/uploads" , "./public/products")   
            }
            let alreadyExist = await Category.findOne({title : title})
             
            if (!alreadyExist ){ 
                let products  = await Product.find({}) 
                let productCode = AccountNumberGenerator(products,  "000000000001" ,  "productCode" , 1 , 12 ) 
                await new Product({
                    name : title[1] , 
                    quantity : Number(quantity[1]) , 
                    specification : specification[1] , 
                    warranty : warranty[1] ,
                    description : content , 
                    productCode : productCode , 
                    category : category.filter(e => e !== "")[0] , 
                    profile : profile , 
                    amount : Number(amount[1])
                }).save()
                res.json({
                    message : `Product was added successfully created`
                })
            }else {
                throw new Error(" A problem occured since you have other user with same detail")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getProductDetail = async (req , res) => {
        try {
            let name = req.params.categoryName.trim() 
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let product = await Product.findOne({name : name})
            if (product){
                res.render("single-product", 
                {
                    admin : admin, 
                    product : product, 
                    title : `${product.name} Category`
                })
            }else {
               throw new Error("An error just occured")
            }  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updateProductDetail = async (req , res) => {
        try { 
            let product  = await Product.findById(req.params.id)  
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 

            const {
                title ,description , amount , 
                quantity , specification , warranty  
            } = req.body.data 
            if (product) { 
                await Product.findByIdAndUpdate(product._id , {
                    name : title , 
                    amount : Number(amount) , 
                    quantity : Number(quantity) , 
                    specification : specification , 
                    warranty : warranty , 
                    description: description  , 
                    lastModified : new Date()
                } , {new : true , useFindAndModify : false}) 
                res.json({
                    message : "Update was successful"
                }) 
            }else {
                throw new Error()
            }
            
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updateProductAvatar = async (req , res) => {
        try { 
            let product = await Product.findById(req.params.id)  
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            if (req.file){ 
                FileHandler.deleteFile(`./public/products/${product.profile}`)
                let date = new Date().getDate() 
                let fileName = `${date}-${req.file.originalname}`
                
                FileHandler.createDirectory("./public/products")  
                FileHandler.moveFile(fileName , "./public/uploads" , "./public/products") 
                await Product.findByIdAndUpdate(product._id, {
                    profile : fileName
                }  , { new : true , useFindAndModify : false})
            }
            res.json({ 
                message  :"Product image was updated successfully"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    removeProduct = async (req , res) => {
        try {
            res.json({
                message : "Ensure you remove it from everywhere in the app "
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    fetchProductContent = async (req , res) => {
        try { 
            let product = await Product.findById(req.params.id) 
            res.json(product) 
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getEditProduct = async (req , res) => {
        try {
            let name = req.params.categoryName.trim() 
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let product = await Product.findOne({name : name}) 
            if (product){
                res.render("edit-product", 
                {
                    admin : admin, 
                    product : product, 
                    title : `Edit ${product.name} Category`
                })
            }else {
               throw new Error("An error just occured")
            }  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    //Shop Management 
    getShop = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const products = await Product.find({}).populate("category")  
            const shops    = await Shop.find({}).populate("product")
            //const categories = await Category.find({}) 
            res.render("admin-shop" , {
                title : "Shop" , 
                admin : true , 
                products : products  , 
                shops : shops
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    // Add Products to shop 
    addProductToShop = async (req , res) => {
        try {  
            const {items} = req.body  
            let ids = items.map(item => item.product)
            const products = await Product.find({}).populate("category") 
            const isExisting = await Shop.findOne({
                product : {$in : ids}
            }) 
            if (isExisting === null ||  isExisting.length === 0 ){
                let addToShop = await Shop.insertMany(items) 
                //Then update the product list 
                let count = items.length 
                while ( count > 0){
                    for( let product of items){
                        let targetProduct = await Product.findById(product.product) 
                        await Product.findByIdAndUpdate(targetProduct._id, { 
                            quantity : targetProduct.quantity - product.quantity
                        } , {new : true , useFindAndModify : false})
                            count -= 1
                    }
                }
                if (addToShop){
                    res.json({
                        message : items
                    })
                }else {
                    res.json({
                        message : "Could not add to shop"
                    })
                }
            }else {
                let count = items.length 
                while ( count > 0){
                    for( let product of items){

                        let targetProduct = await Product.findById(product.product) 
                        let shopItem   =  await Shop.findOne({
                            product : targetProduct._id
                        })
                        //Now  , update both the product in our product listing 
                        // and also the product within the shop 
                        await Product.findByIdAndUpdate(targetProduct._id, { 
                            quantity : targetProduct.quantity - product.quantity
                        } , {new : true , useFindAndModify : false})
                        // Update the shop 
                        await Shop.findByIdAndUpdate(shopItem._id , {
                            quantity : shopItem.quantity + product.quantity
                            } , {new : true , useFindAndModify : false})
                            count -= 1
                    }
                }
                res.json({
                    message : "There is currenlty an item in the shop"
                })
            }
        }catch(error){
            res.json({
                message : error.message 
            })
        } 
    } 
    toggleProductStatus = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {items} = req.body  
            let count = items.length 
            while ( count > 0){
                for( let id of items){
                    let shopItem   =  await Shop.findById(id)
                    await Shop.findByIdAndUpdate(shopItem._id , {
                        status : !shopItem.status
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "There is currenlty an item in the shop"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    topupProduct = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {items} = req.body  
            let ids = items.map(item => item.product)
            let count = items.length 
            while ( count > 0){
                for( let product of items){
                    let targetProduct = await Product.findById(product.product) 
                    await Product.findByIdAndUpdate(targetProduct._id, { 
                        quantity : targetProduct.quantity + product.quantity
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "Products update was successful"
            })
        }catch(error){
            res.json({
                message : error.message 
            })
        } 
    } 
    removeItemFromShop = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {items} = req.body  
            let count = items.length 
            let itemsToRemove = await Shop.find({_id : {$in : items}})
            while ( count > 0){ 
                for( let id of itemsToRemove){
                    let shopProduct = await Shop.findById(id) 
                    let targetProduct = await Product.findById(shopProduct.product)
                    await Product.findByIdAndUpdate(shopProduct.product, { 
                        quantity : targetProduct.quantity + shopProduct.quantity
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            await Shop.deleteMany({_id : { $in : items}}) 
            res.json({
                message : "Items were removed"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    //Hire Management  
    getRental = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const products = await Product.find({}).populate("addedBy").populate("category") 
            
            const rents    = await Rent.find({}).populate("product")
            if (rents){
                res.render("admin-hire" , { 
                    admin : admin , 
                    title : "Hire Page" , 
                    products : products , 
                    rents : rents 
                })
            }
        }catch(error){
            res.json({
                message : error.message 
            })
        } 
    }
    // Add Products to Rental 
    addProductForRent = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const {items} = req.body  
            let ids = items.map(item => item.product)
            const isExisting = await Rent.findOne({
                product : {$in : ids}
            }) 
            if (isExisting === null ||  isExisting.length === 0 ){
                let addToRent = await Rent.insertMany(items) 
                //Then update the product list 
                let count = items.length 
                while ( count > 0){
                    for( let product of items){
                        let targetProduct = await Product.findById(product.product) 
                        await Product.findByIdAndUpdate(targetProduct._id, { 
                            quantity : targetProduct.quantity - product.quantity
                        } , {new : true , useFindAndModify : false})
                        count -= 1
                    }
                }
                if (addToRent){
                    res.json({
                        message : items
                    })
                }else {
                    res.json({
                        message : "Could not add to shop"
                    })
                }
            }else {
                let count = items.length 
                while ( count > 0){
                    for( let product of items){

                        let targetProduct = await Product.findById(product.product) 
                        let shopItem   =  await Rent.findOne({
                            product : targetProduct._id
                        })
                       
                        //Now  , update both the product in our product listing 
                        // and also the product within the shop 
                        await Product.findByIdAndUpdate(targetProduct._id, { 
                            quantity : targetProduct.quantity - product.quantity
                        } , {new : true , useFindAndModify : false})
                        // Update the shop 
                        await Rent.findByIdAndUpdate(shopItem._id , {
                            quantity : shopItem.quantity + product.quantity
                        } , {new : true , useFindAndModify : false})
                        count -= 1
                    }
                }
                res.json({
                    message : "There is currenlty an item in the shop"
                })
            }      
        }catch(error){
            res.json({
                message : error.message 
            })
        } 
    } 
    //Toggle the visibility of the item for rent 
    handleRentalStatus = async (req , res) => {
        try {
            const {items} = req.body    
            let count = items.length 
            while ( count > 0){
                for( let id of items){
                    let rentItem   =  await Rent.findById(id) 
                    console.log(rentItem)
                    await Rent.findByIdAndUpdate(rentItem._id , {
                        status : !rentItem.status
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "There is currenlty an item in the shop"
            }) 
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    removeItemFromRentals = async (req , res) => {
        try {
            const {items} = req.body  
            let count = items.length 
            let itemsToRemove = await Rent.find({_id : {$in : items}})
            while ( count > 0){ 
                for( let id of itemsToRemove){
                    let shopProduct = await Rent.findById(id) 
                    let targetProduct = await Product.findById(shopProduct.product)
                    await Product.findByIdAndUpdate(shopProduct.product, { 
                        quantity : targetProduct.quantity + shopProduct.quantity
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            await Rent.deleteMany({_id : { $in : items}}) 
            res.json({
                message : "Items were removed"
            })  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    handleRental = async (req , res) => {
        try {
            let itemsToRent = await Product.findOne({name : req.params.productName}) 
            const {name , email , phone , fromDate , 
                fromTime , toDate , toTime , comment} = req.body.data
            let hireProduct = await new Hire({
                name : name , 
                email : email , 
                phone : phone , 
                product : itemsToRent._id , 
                hireTimeLine : {
                    fromDate : fromDate , 
                    fTime : fromTime , 
                    toDate : toDate , 
                    tTime : toTime
                } , 
                comment : comment 
            })
            let saveProduct = await hireProduct.save() 
            if (saveProduct){
                //send the user an email 
                // Send the owner an email 
                // const message = user => `<p> Hello ${user} your order was received. We are currently processing it`
                // const options = {
                //     to : email , 
                //     from: 'Celchin<recruitment@aceafrica.net>',
                //     subject : "Hire Order Received" , 
                //     html : message(name)
                // }
                // sgMail.send(options)
                res.json({
                    message : "Your request is been handled. Thank you for patronizing us"
                })
            }else {
                throw new Error("Error occurred")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
   
    }
    //Sell Management 
    getSell = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            const sells = await Sell.find({}).sort({dateCreated : -1})
            
            if (sells){
                res.render("admin-sell" , { 
                    admin : admin , 
                    title : "Sell Page" , 
                    sells : sells 
                })
            }
        }catch(error){
            res.json({
                message : error.message 
            })
        } 
    } 
    getSingleSell = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let sellCode = req.params.sellCode 
            let sell = await Sell.findById(sellCode)
            if (sell){
                res.render("admin-single-sell" , {
                    admin : admin , 
                    title : "Single Sell" , 
                    sell : sell
                })
            }else {
                throw new Error()
            }
        }catch(error){
            res.json(error.message)
        }
    } 
    clearSell= async (req , res) => {
        try {
            const {items} = req.body  
            let count = items.length 
            while ( count > 0){
                for( let id of items){
                    let sell   =  await Sell.findById(id)
                    await Sell.findByIdAndUpdate(sell._id , {
                        cleared : !sell.cleared
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "Update was successful"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    deleteSell = async (req , res) => {
        try {
            const {items} = req.body  
            let count = items.length 
            while ( count > 0){
                for( let id of items){
                    let sell   =  await Sell.findById(id) 
                    let images = sell.uploads.map(upload => {
                        FileHandler.deleteFile(`./public/selling-generator/${upload}`)
                    }) 
                    await Sell.deleteOne({_id : id})
                }
            }
            res.json({
                message : "Delete was successful"
            })     
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getTransactions = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin})  
            res.render("transactions" , { 
                admin : admin , 
                title : "Transaction" , 
            })
        }catch(error){
           res.json({
               message : error.message
           })
        }
    }
    displayRental = async (req , res) => {
        try {  
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let rents = await Hire.find({}).populate("product")
            res.render("admin-rentals" , {
                title : "Rental" , 
                admin : admin  , 
                rents : rents
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    clearRentals = async (req , res) => {
        try {
            const admin = await Admin.findOne({userName : req.session.userName}) 
            const {items} = req.body  
            let count = items.length 
            while ( count > 0){
                for( let id of items){
                    let hire   =  await Hire.findById(id)
                    console.log(id , hire)
                    await Hire.findByIdAndUpdate(hire._id , {
                        cleared : !hire.cleared
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "Update was successful"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    getSingleRental = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let rentalCode = req.params.rentalCode 
            let rent = await Hire.findById(rentalCode).populate("product") 
            if (rent){
                res.render("admin-single-rental" , {
                    admin : admin , 
                    title : "Single Rental Page" , 
                    rent : rent
                })
            }
        }catch(error){
            res.json(error.message)
        }
    }
    deleteRentals = async (req , res) => {
        try { 
            const {items} = req.body  
            await Hire.deleteMany({_id : {$in : items}})
            res.json({
                message : "There is currenlty an item in the shop"
            })
        }catch(error){
            console.log(error)
            res.json({
                message : error.message
            })
        }
    } 

    // Order Management 
    displayOrders = async (req , res) => {
        try {  
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let orders = await Order.find({})
            res.render("admin-orders" , {
                title : "Orders" , 
                admin : admin  , 
               orders : orders
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    displayInquiries = async (req , res) => {
        try {  
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let inquiries = await Inquire.find({})
            res.render("admin-inquiries" , {
                title : "Inquiries" , 
                admin : admin  , 
                inquiries : inquiries
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    clearInquire = async (req , res) => {
        try {
            const {items} = req.body  
            let count = items.length 
            while ( count > 0){
                for( let id of items){
                    let inquire   =  await Inquire.findById(id)
                    await Inquire.findByIdAndUpdate(inquire._id , {
                        status : !inquire.status
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "Update was successful"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    getSingleInquiry = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let inquireCode = req.params.inquireCode 
            let inquire = await Inquire.findById(inquireCode) 
            if (inquire){
                res.render("admin-single-inquiry" , {
                    admin : admin , 
                    title: "Inquiry Detail  Page" , 
                    inquire : inquire
                })  
            }else {
                res.json({message : "Please , the inquiry is not available"})
            }
        }catch(error){
            res.json(error.message)
        }
    }
    deleteInquire= async (req , res) => {
        try { 
            const {items} = req.body  
            await Inquire.deleteMany({_id : {$in : items}})
            res.json({
                message : "There is currenlty an item in the shop"
            })
        }catch(error){
            console.log(error)
            res.json({
                message : error.message
            })
        }
    }  
    // Reveiws Managmenet 
    // Contact Management 
    getCustomers = async (req , res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let customers = await Customer.find({}) 
            res.render("admin-customers" , {
                admin : admin , 
                title : "Celchin Customers" , 
                customers : customers
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    addCustomers = async (req , res) => {
        try {
            // let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let {name , email , phone} = req.body 
            await new Customer({
                name : name , 
                email : email , 
                phoneNumber : phone
            }).save() 
            res.redirect("/celchin/customers")
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    deleteCustomer = async (req , res) => {
        try { 
            const {items} = req.body  
            await Customer.deleteMany({_id : {$in : items}})
            res.json({
                message : "There is currenlty an item in the shop"
            })
        }catch(error){
            console.log(error)
            res.json({
                message : error.message
            })
        }
    } 
    editCustomer = async (req , res) => {
        try {
            const {items} = req.body  
            let count = items.length 
           
            while ( count > 0){
                for( let item of items){ 
                    const {name , id , email , mobile} = item
                    // let inquire   =  await Inquire.findById(id)
                    await Customer.findByIdAndUpdate(id, {
                       name : name , 
                       email : email , 
                       phoneNumber : mobile
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "Update was successful"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
   
    // Messaging and Customer Relation Management 
    getMessaging = async (req ,res) => {
        try {
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let customers = await Customer.find({}) 
            res.render("admin-messaging" , {
                admin : admin , 
                title : "Celchin Messaging" , 
                customers : customers
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    sendMessage = async (req , res) => {
        try { 
            const {to , subject , content}  = req.body 
            console.log(content)
            const options = {
                    to : to, 
                    from: 'Celchin<recruitment@aceafrica.net>',
                    subject : subject , 
                    html : `<div>${content}</div>`
                }
            // sgMail.send(options) 
            res.json({
                message : req.body
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    // Advertisement Management  
    getAds = async (req , res) => {
        try { 
            let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let ads   = await Ad.find({})
            res.render("ads" , {
                title : "Ads" ,
                ads : ads , 
                admin : admin
            })
        }catch(error){
            res.json({
                message : error.message 
            })
        }
    }
    createAd = async (req , res) => {
        try { 
            let {
                title , content , duration } = req.body 
            console.log(req.body)
            // let admin = await Admin.findOne({email : req.session.celchin_admin})
            let profile 
            if (req.file){ 
                //FileHandler.deleteFile(`./public/admin_profile/${bookName}`)
                let date = new Date().getDate() 
                let fileName = `${date}-${req.file.originalname}`
                profile = fileName
                FileHandler.createDirectory("./public/ads")  
                FileHandler.moveFile(fileName , "./public/uploads" , "./public/ads")   
            }
            let alreadyExist = await Ad.findOne({title : title})
             
            if (!alreadyExist ){ 
                //let ad = await Ad.find({}) 
                //let productCode = AccountNumberGenerator(products,  "000000000001" ,  "productCode" , 1 , 12 ) 
                await new Ad({
                    title : title[1] , 
                    duration : Number(duration[1]) ,   
                    content : content , 
                    banner: profile
                }).save()
                res.json({
                    message : `Ad was added successfully created`
                })
            }else {
                throw new Error(" A problem occured since you have other user with same detail")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getAdDetail = async (req , res) => {
        try {
            let name = req.params.title.trim() 
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let ad = await Ad.findOne({title : name})
            if (ad){
                res.render("single-ad", 
                {
                    admin : admin, 
                    ad : ad, 
                    title : `${ad.name} Category`
                })
            }else {
               throw new Error("An error just occured")
            }  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updateAdDetail = async (req , res) => {
        try { 
            let ad = await Ad.findById(req.params.id)  
            const {
                title ,description , duration 
            } = req.body.data 
            if (ad) { 
                await Ad.findByIdAndUpdate(ad._id , {
                    title : title , 
                    duration : Number(duration) , 
                    content : description
                } , {new : true , useFindAndModify : false}) 
                res.json({
                    message : "Update was successful"
                }) 
            }else {
                throw new Error()
            }
            
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updateAdAvatar = async (req , res) => {
        try { 
            let ad = await Ad.findById(req.params.id)  
          
            if (req.file){ 
                FileHandler.deleteFile(`./public/ads/${ad.banner}`)
                let date = new Date().getDate() 
                let fileName = `${date}-${req.file.originalname}`
                
                FileHandler.createDirectory("./public/ads")  
                FileHandler.moveFile(fileName , "./public/uploads" , "./public/ads") 
                await Ad.findByIdAndUpdate(ad._id, {
                    banner : fileName
                }  , { new : true , useFindAndModify : false})
            }
            res.json({ 
                message  :"Product image was updated successfully"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    removeProduct = async (req , res) => {
        try {
            res.json({
                message : "Ensure you remove it from everywhere in the app "
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    fetchAdContent = async (req , res) => {
        try { 
            let ad= await Ad.findById(req.params.id) 
            console.log(ad)
            res.json(ad) 
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getEditAd = async (req , res) => {
        try {
            let name = req.params.title.trim() 
            let admin = await Admin.findOne({email : req.session.celchin_admin})
            let ad = await Ad.findOne({title : name}) 
            if (ad){
                res.render("edit-ad", 
                {
                    admin : admin, 
                    ad : ad, 
                    title : `Edit ${ad.title}`
                })
            }else {
               throw new Error("An error just occured")
            }  
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    
}
module.exports = new App()