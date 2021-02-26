const express     = require("express") 
const router      = express.Router() 
const AdminController = require("../controller/adminController") 
const FileController = require("../controller/fileController")  
const Multer = require("multer") 

const multer = Multer({
    storage : Multer.memoryStorage() , 
    limits :  { 
        fileSize : 10*1024*1024 , 
    } ,   
}) 


router.get("/celchin-admin" , AdminController.getAdminLogin ) 
router.post("/celchin-admin" , AdminController.handleLogin)
router.get("/celchin-admin/logout" , AdminController.handleLogout)
router.get("/celchin-admin/register" , AdminController.registerAdmin) 
router.post("/celchin-admin/register" , AdminController.handleAdminRegistration)
router.get("/celchin-admin/dashboard" , AdminController.isLogin ,  AdminController.getAdminDashboard ) 

router.get("/celchin-admin/profile" , AdminController.isLogin ,  AdminController.getAdminProfile ) 
router.post("/celchin-admin/update-profile" , AdminController.isLogin , FileController.saveToDisk.single("avatar"),  AdminController.updateProfile ) 
router.post("/celchin-admin/update-password" , AdminController.isLogin , AdminController.resetPassword) 
//------------ PRODUCT CATEGORY MANAGEMENT 
router.get("/celchin-admin/product-categories" , AdminController.isLogin , AdminController.getProductCategory)  
router.get("/celchin-admin/product-categories/fetch/:id" , AdminController.isLogin , AdminController.fetchCategoryContent) 
router.get("/celchin-admin/product-categories/:categoryName" , AdminController.isLogin , AdminController.getSingleCategory) 
router.get("/celchin-admin/product-categories/:categoryName/edit" , AdminController.isLogin , AdminController.getEditCategory) 
router.post("/celchin-admin/product-categories/:id/avatar" , AdminController.isLogin , multer.single("avatar") ,  AdminController.updateCategoryAvatar)  
router.post("/celchin-admin/product-categories/:id/content" , AdminController.isLogin ,  AdminController.updateCategoryContent) 
router.post("/celchin-admin/product-categories" , AdminController.isLogin ,multer.single("avatar"), AdminController.createProductCategory) 
//-------- PRODUCT MANAGEMENT 

router.get("/celchin-admin/products" , AdminController.isLogin , AdminController.getProducts)  
router.get("/celchin-admin/products/fetch/:id" , AdminController.isLogin , AdminController.fetchProductContent) 
router.get("/celchin-admin/products/:categoryName" , AdminController.isLogin , AdminController.getProductDetail) 
router.get("/celchin-admin/products/:categoryName/edit" , AdminController.isLogin , AdminController.getEditProduct) 
router.post("/celchin-admin/products/:id/avatar" , AdminController.isLogin , FileController.saveToDisk.single("avatar") ,  AdminController.updateProductAvatar)  
router.post("/celchin-admin/products/:id/content" , AdminController.isLogin ,  AdminController.updateProductDetail) 
router.post("/celchin-admin/products" , AdminController.isLogin ,FileController.saveToDisk.single("avatar"), AdminController.createProduct) 

//------- SHOP MANAGEMENT 
router.get("/celchin-admin/shop" , AdminController.isLogin , AdminController.getShop) 
router.post("/celchin-admin/shop/add" , AdminController.isLogin  , AdminController.addProductToShop)
router.post("/celchin-admin/shop/toggle-status" , AdminController.isLogin  ,  AdminController.toggleProductStatus)
router.post("/celchin-admin/shop/top-up" , AdminController.isLogin  ,  AdminController.topupProduct)
router.post("/celchin-admin/shop/delete" , AdminController.isLogin  ,  AdminController.removeItemFromShop)  


//------ HIRE MANAGEMENT 
router.get("/celchin-admin/hire" , AdminController.isLogin ,  AdminController.getRental) 
router.post("/celchin-admin/hire/add" , AdminController.isLogin ,  AdminController.addProductForRent) 
router.post("/celchin-admin/hire/toggle-status" ,  AdminController.isLogin , AdminController.handleRentalStatus) 
router.post("/celchin-admin/hire/delete" , AdminController.isLogin  , AdminController.removeItemFromRentals)  

//------- SELL MANAGEMENT 
router.get("/celchin-admin/sellers" , AdminController.isLogin ,  AdminController.getSell) 
router.post("/celchin-admin/sellers/delete" , AdminController.isLogin , AdminController.deleteSell)
router.post("/celchin-admin/sellers/clear" , AdminController.isLogin , AdminController.clearSell)
router.get("/celchin-admin/sellers/:sellCode" , AdminController.isLogin , AdminController.getSingleSell) 

//--- TRANSACTION MANAGEMENT 
router.get("/celchin-admin/transactions" , AdminController.isLogin , AdminController.getTransactions) 
router.get("/celchin-admin/transactions/hire" , AdminController.isLogin , AdminController.displayRental) 
router.post("/celchin-admin/rentals/clear" , AdminController.isLogin , AdminController.clearRentals) 
router.post("/celchin-admin/rentals/delete" , AdminController.isLogin , AdminController.deleteRentals) 
router.get("/celchin-admin/rentals/:rentalCode" , AdminController.isLogin , AdminController.getSingleRental) 

//---- ORDERS MANAGEMENT 
router.get("/celchin-admin/transactions/orders" , AdminController.isLogin , AdminController.displayOrders) 
router.get("/celchin-admin/transactions/inquiry" , AdminController.isLogin , AdminController.displayInquiries) 
router.post("/celchin-admin/inquiries/clear" , AdminController.isLogin , AdminController.clearInquire) 
router.post("/celchin-admin/inquiries/delete" , AdminController.isLogin , AdminController.deleteInquire) 
router.get("/celchin-admin/inquiries/:inquireCode" , AdminController.isLogin , AdminController.getSingleInquiry) 

//--- Customer Contact Management 
router.get("/celchin/customers" , AdminController.isLogin , AdminController.getCustomers)  
router.post("/celchin/customers" , AdminController.isLogin , AdminController.addCustomers)  
router.post("/celchin/customers/delete" , AdminController.isLogin , AdminController.deleteCustomer) 
router.post("/celchin/customers/edit" , AdminController.isLogin , AdminController.editCustomer)   


//--- Message Management 
router.get("/celchin-admin/messaging" ,  AdminController.isLogin , AdminController.getMessaging) 
router.post("/celchin-admin/messaging" , AdminController.isLogin  ,  AdminController.sendMessage) 

//-- Ad  Management 
router.get("/celchin-admin/ad-manager" ,  AdminController.isLogin  , AdminController.getAds) 
router.post("/celchin-admin/ad-manager" ,  AdminController.isLogin  , FileController.saveToDisk.single("avatar") ,  AdminController.createAd) 
router.get("/celchin-admin/ad-manager/:title" ,  AdminController.isLogin  ,  AdminController.getAdDetail)  
router.get("/celchin-admin/ad-manager/fetch/:id" , AdminController.isLogin , AdminController.fetchAdContent)  

router.get("/celchin-admin/ad-manager/:title/edit" , AdminController.isLogin , AdminController.getEditAd) 

router.post("/celchin-admin/ad-manager/:id/avatar" , AdminController.isLogin , FileController.saveToDisk.single("avatar") ,  AdminController.updateAdAvatar)
router.post("/celchin-admin/ad-manager/:id/content" , AdminController.isLogin ,  AdminController.updateAdDetail) 
// router.post("/celchin-admin/orders/clear" , AdminController.clearOrders) 
// router.post("/celchin-admin/orders/delete" , AdminController.deleteOrders) 
// router.get("/celchin-admin/orders/:rentalCode" , AdminController.getSingleOrder) 


module.exports = router
