//! Require Data Model 
const Review        = require("../model/review") 
const GeneratorSell = require("../model/generatorsell")   
const Category = require("../model/category") 
const Product  = require("../model/product")  
const Shop     = require("../model/shop") 
const Hire                   = require("../model/hire") 
const Rent                   = require("../model/rent")   
const Inquire                  = require("../model/inquire")   
const Advert                = require("../model/advert")  
const dotenv          = require("dotenv").config()
const sgMail = require('@sendgrid/mail') 
sgMail.setApiKey(process.env.SendgridKey) 
const FileHandler = require("./file")  //Library for managing files but will not be needed any logner
const bcrypt = require("bcryptjs")
class App { 
    /**
     * @description 
     * renders data for ad , categories , products , shops when a request is sent
     */
    getHome = async (req ,res) => { 
        try { 
            let ads = await Advert.find({}) 
            let categories = await Category.find({})
            let products = await Product.find({}).populate("category") 
            let shops    = await Shop.find({}).populate("product") 
            let hires = await Rent.find({}).populate("product") 
            // res.json({m : 2})
           res.render("landing"  , {
              title : "Celchin Home Page" , 
              ads : ads , 
              products  : products ,  
              categories : categories , 
              shops : shops , 
              hires : hires
           })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getReviews = async (req , res) => {
        try {
            res.send("My review page is coming up")
        }catch(error){
            res.json({
                message : "The error page is loading"
            })
        }
    } 
    getSellPage = async (req , res) => {
        let categories = await Category.find({})
        let products = await Product.find({}).populate("category") 
        let shops    = await Shop.find({}).populate("product") 
    try {
            res.render("sell"  , {
               title : "Sell your electronics on Celchin" ,
               shops : shops ,
               products : products ,
               categories : categories ,

            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    handleSell = async (req , res) => {
        try { 
            console.log(req.body)
            if (req.files){
                let uploads = []
                req.files.map(file => {
                    let date = new Date().getDate() 
                    let fileName = `${date}-${file.originalname}`
                    console.log(fileName) 
                    uploads.push(fileName)
                    FileHandler.createDirectory("./public/selling-generator")  
                    FileHandler.moveFile(fileName , "./public/uploads" , "./public/selling-generator") 
                }) 
                const {name, email , mobile , price , 
                    residence , productName , manufacturer , description} = req.body
                let sell = await new GeneratorSell({
                    name : name[1] , 
                    email : email[1] , 
                    phone : mobile[1] , 
                    state : residence , 
                    productName : productName[1], 
                    manufacturer : manufacturer[1] ,
                    description : description[1] , 
                    amount : Number(price[1]) , 
                    uploads : uploads 
                })
                let saveSell = await sell.save() 
                if  (saveSell){
                    //send the user an email Send the owner an email 
                    const message = user => `<p> Hello ${user} your sell request was received. We are currently processing it`
                    const options = {
                        to : email , 
                        from: 'Celchin<recruitment@aceafrica.net>',
                        subject : "Hire Order Received" , 
                        html : message(name)
                    }
                    sgMail.send(options)
                        res.json({
                            message : "Thank you for finding Celchin worthy of buying your product. We will get in touch with you shortly"
                        })
                }else {
                    throw new Error("unable to save the file")
                }
            }else {
                res.json({
                    message : "Please , upload a file"
                })
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getHire = async (req , res) => {
        try { 
            let categories = await Category.find({}) 
            const rents      = await Rent.find({status : true}).populate("product")  
            let displaySize  = 9
            let pageCount    = Math.ceil(rents.length/displaySize) 
            let pageNumber  = 0 , 
            skipSize
            if (!req.query.page){
                pageNumber = 1
                skipSize = displaySize*(pageNumber - 1)
                 
            }else { 
                pageNumber = Number(req.query.page) <= pageCount ? Number(req.query.page) : pageCount
                skipSize = displaySize*(pageNumber - 1)
            } 
            const rentss = await Rent.find({status : true}).skip(skipSize).limit(displaySize).populate("product")

            res.render("hire"  , {
               title : "Hire Electronics on Celchin"  , 
               categories : categories , 
               products : rentss ,
               currentPage : pageNumber , 
               pages : pageCount,
               skipIt : skipSize,
               totalProducts : rents,
               displaySize : displaySize

            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    getHireByCategory = async (req , res) => {
        try { 
            const rents      = await Rent.find({status : true}).populate("product") 
            let categoryName = req.params.categoryName.trim()
            let category = await Category.findOne({name : categoryName})
            console.log(rents)
            const categories = await Category.find({})
            if (rents.length > 0 ){
                let products = rents.filter(product => 
                    String(product.product.category).trim() === 
                    String(category._id).trim()
                )
                res.render('category-hire', {
                    title : "Hire Electronics on Celchin" , 
                    page_home : "active", 
                    products : products , 
                    name : categoryName , 
                    categories : categories , 
                    category : category ,
                })
            }else {
                res.json({
                    message : "Nothing to show in hire"
                })
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    getSingleHire = async (req, res, next) => {
        const rents      = await Rent.find({status : true}).populate("product") || []
       
        let productName = req.params.productName.trim()
        let categoryName = req.params.categoryName.trim() 
        let product = await Product.findOne({name : productName})
        const categories = await Category.find({}).populate("addedBy") || []
        let category = categories.find(category => String(category._id) === String(product.category).trim())
        let targetProduct = await Rent.findOne({product : product._id}).populate("product")
        if (rents.length > 0 ){
            let similarProducts = rents.filter(product => 
                String(product.product.category).trim() === 
                String(category._id).trim()
            )
            console.log(targetProduct)      
            res.render('single-hire', {
                title : `Product ${productName}`, 
                page_home : "active",
                product : product , 
                categories : categories , 
                category : category ,
                productName : productName , 
                categoryName : categoryName , 
                targetProduct : targetProduct , 
                similarProducts : similarProducts || []
            })
        }else {
            res.send("Good")
            res.render('single-hire', {
                title : `Product ${productName}`, 
                page_home : "active",
                product : [] , 
                categories : categories , 
                category : category ,
                productName : productName , 
                targetProduct : {} , 
                similarProducts :  []
            })
        }
    }
    handleRental = async (req , res) => {
        try {
            let itemsToRent = await Product.findOne({name : req.params.productName}) 
            const {name , email , phone , fromDate , 
                fromTime , toDate , toTime , comment , address} = req.body.data
            let hireProduct = await new Hire({
                name : name , 
                email : email , 
                phone : phone , 
                address : address , 
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
                const message = user => `<p> Hello ${user} your order was received. We are currently processing it`
                const options = {
                    to : email , 
                    from: 'Celchin<recruitment@aceafrica.net>',
                    subject : "Hire Order Received" , 
                    html : message(name)
                }
                sgMail.send(options)
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

    //Shopping Management 
    getShop = async (req , res) => {
        try { 
            let categories = await Category.find({}) 
            const totalProducts     = await Product.find({}).populate("category") 
            let displaySize  = 9
            let pageCount    = Math.ceil(totalProducts.length/displaySize) 
            let pageNumber  = 0 , 
            skipSize
            if (!req.query.page){
                pageNumber = 1
                skipSize = displaySize*(pageNumber - 1)
                 
            }else { 
                pageNumber = Number(req.query.page) <= pageCount ? Number(req.query.page) : pageCount
                skipSize = displaySize*(pageNumber - 1)
            } 
            const products = await Product.find({}).skip(skipSize).limit(displaySize).populate("category")
            res.render("all-product-page"  , {
               title : "Shop on Celchin"  , 
               categories : categories , 
               products : products ,
               currentPage : pageNumber , 
                pages : pageCount,
                skipIt : skipSize,
                totalProducts : totalProducts,
                displaySize : displaySize
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    getShopByCategory = async (req , res) => {
        try { 
            const shops      = await Shop.find({status : true}).populate("product")
            let categoryName = req.params.categoryName.trim()
            let category = await Category.findOne({name : categoryName})
            const categories = await Category.find({}).populate("addedBy") || []
            if (shops.length > 0 ){
                let products = shops.filter(product => 
                    String(product.product.category).trim() === 
                    String(category._id).trim()
                )
                let displaySize  = 1
                let pageCount    = Math.ceil(products.length/displaySize) 
                let pageNumber  = 0 , 
                skipSize
                if (!req.query.page){
                    pageNumber = 1
                    skipSize = displaySize*(pageNumber - 1)
                     
                }else { 
                    pageNumber = Number(req.query.page) <= pageCount ? Number(req.query.page) : pageCount
                    skipSize = displaySize*(pageNumber - 1)
                } 
                const shopps = Product.find({status : true}).skip(skipSize).limit(displaySize).populate("product")
                res.render('category-shop', {
                    title : "Shop Electronics on Celchin" , 
                    products : products , 
                    name : categoryName , 
                    categories : categories , 
                    category : category ,
                    currentPage : pageNumber , 
                    pages : pageCount,    
                    skipIt : skipSize,
                    totalProducts : products,    
                    displaySize : displaySize
                })
            }else {
                res.json({
                    message : "No item in shop for this category"
                })
            }
        
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    getSingleProduct = async (req, res, next) => {
        const shops      = await Shop.find({status : true}).populate("product") || []
        let productCode = req.params.productCode.trim()
        let product = await Product.findOne({productCode : productCode})
        const categories = await Category.find({}).populate("addedBy") || []
        let category = categories.find(category => String(category._id) === String(product.category).trim())
        if (shops.length > 0 ){
            let similarProducts = shops.filter(product => 
                String(product.product.category).trim() === 
                String(category._id).trim()
            )
            res.render('single-product-celchin', {
                title : `Product ${productCode}`, 
                product : product , 
                categories : categories , 
                category : category ,
                productCode : productCode , 
                similarProducts : similarProducts || []
            })
        }else {
            res.json({message : "This product is not in existence"})
        }
    }
    getCart = async (req, res) => {
        const categories = await Category.find({}).populate("addedBy") || []
        res.render('cart', {
            title: 'Cart' , 
            categories : categories , 
        })
    }
    getInquiry = async (req , res) => {
        try {
            res.render("checkout" , {
                title : "Inquiry" , 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }catch(error){ 
            res.json({
                message : error.message
            })
        }
    }
    handleInquiry = async (req  , res) => {
        try {
            await Inquire.insertMany(req.body) 
            const {email , name} = req.body 
            //Send a mail to the user 
            const message = user => `<p> Hello ${user} your inquiry was received`
            const options = {
                to : email , 
                from: 'ACE AFRICA<recruitment@aceafrica.net>',
                subject : "INQUIRY RECEIVED" , 
                html : message(name)
            }
            sgMail.send(options)
            res.json({ 
                status : true , 
                message : "Thanks for making inquiry on our products. We will respond to you shortly"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
        //Managing the statically generated pages 
        getAbout = async (req , res) => {
        
            res.render("celchin-about"  , {
                title : "About Celchin" , 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getLogisticsPage = async (req , res) => {
            res.render("celchin-logistics" , {
                title : "Celchin - Logistics", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getEngineeringPage = async (req , res) => {
            res.render("celchin-engineering" , {
                title : "Celchin -Engineering", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        } 
        getGeneratorPage = async (req , res) => {
            res.render("celchin-generator" , {
                title : "Celchin - Generator", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getSolarPage = async (req , res) => {
            res.render("celchin-solar" , {
                title : "Celchin Solar", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getSupplyChain = async (req , res) => {
            res.render("celchin-supply-chain" , {
                title : "Celchin Supply Chain", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getAccessories = async (req , res) => {
            res.render("celchin-accessory" , {
                title : "Celchin Accessory", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getSalesAndRent = async (req ,res) => {
            res.render("celchin-sales-rent" , {
                title : "Celchin Sales and Rent"
            })
        }
        getVision = async (req , res) => {
            res.render("our-vision" , {
                title : "Our vision" , 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getPartner = async (req , res) => {
            res.render("partner" , {
                title : "Celchin Partners", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getQualityPolicy = async (req ,res) => {
            res.render("quality-policy" , {
                title : "Quality Policy", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getHse = async (req , res) => {
            res.render("celchin-hse" , {
                title : "HSE POLICY", 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
        getContact = async (req , res) => {
            res.render("celchin-contact" , {
                title : "Contact us" , 
                categories : await Category.find({}).populate("addedBy") || []
            })
        }
    
} 

module.exports = new App() 