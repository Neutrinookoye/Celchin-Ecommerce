const express     = require("express") 
const router      = express.Router() 
const UserController = require("../controller/userController")  
const FileController = require("../controller/fileController")  

router.get("/reviews" , UserController.getReviews) 
//--- SELL MANAGEMENT 
router.get("/sell" , UserController.getSellPage) 
router.post("/sell" , FileController.saveToDisk.array("avatar" , 10) , UserController.handleSell)  
 
//-- HIRE MANAGEMENT 
router.get("/hire" , UserController.getHire)  
router.get("/hire/:categoryName" , UserController.getHireByCategory)  
router.get("/hire/:categoryName/:productName" , UserController.getSingleHire)
router.post("/hire/:categoryName/:productName" , UserController.handleRental) 


//---- SHOPPING MANAGEMENT   
router.get("/shop" , UserController.getShop)  
router.get('/shop/:categoryName', UserController.getShopByCategory)
router.get('/shop/product/:productCode', UserController.getSingleProduct) 

//-- Cart Handling 
router.get("/cart" , UserController.getCart) 


//--- Checkout Management 
router.get("/inquiry" , UserController.getInquiry) 
router.post("/inquiry" , UserController.handleInquiry) 

//--- Static Page Management
router.get("/about" , UserController.getAbout) 
router.get("/our-vision" , UserController.getVision) 
router.get("/contact" , UserController.getContact) 
router.get("/services/logistics" , UserController.getLogisticsPage) 
router.get("/services/engineering" , UserController.getEngineeringPage) 
router.get("/services/supply-chain" , UserController.getSupplyChain) 
router.get("/services/solar" , UserController.getSolarPage) 
router.get("/hse-policy" , UserController.getHse) 
router.get("/quality-policy" , UserController.getQualityPolicy) 
router.get("/partners" , UserController.getPartner) 
router.get("/" , UserController.getHome ) 
module.exports = router
 