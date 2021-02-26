const createError     = require('http-errors');
const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');
const session         = require('express-session') 
const mongoose        = require("mongoose")
const dotenv          = require("dotenv").config()
const flash           =  require('connect-flash') 
const helmet          = require("helmet")
const cors            = require("cors")
const MongoDBStore    = require('connect-mongodb-session')(session)

const { v4: uuidv4 }  = require('uuid'); 

const AdminRouter     = require("./route/adminRoute")
const UserRouter     = require("./route/userRoute") 
// const CloudRouter     = require("./route/cloudRoute") 
const RemoteDB = process.env.RemoteDB 
const LocalDB  = process.env.LocalDB
const app             = express();
app.use(cors())
let dbName            = LocalDB
const store           = new MongoDBStore({
  uri :dbName, 
  collection : "sessions"
}) 
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
	cookie : {
		maxAge : 1728e5
	} , 
	secret : process.env.SESSION_SECRET ,   
  resave : false , 
  store : store , 
	saveUninitialized : true , 
	unset : "destroy" , 
	genid : (req) => {
		return uuidv4()
	}
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())

app.use(express.static(path.join(__dirname, 'public')));

app.use("/" , AdminRouter) 
// app.use("/" , CloudRouter)
app.use("/" , UserRouter) 

app.use((req , res , next) => {
  next(createError(404))
})
app.use((err , req , res , next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error404');
})
 
const CONFIG = { 
  uri : dbName,  
  OPTIONS : { 
    useNewUrlParser : true , 
    useCreateIndex : true , 
    poolSize : 10 , 
    keepAlive : true , 
    useUnifiedTopology : true , 
    keepAliveInitialDelay : 3e6 
  }
}


mongoose.connect(CONFIG.uri, CONFIG.OPTIONS) 
let db = mongoose.connection 
db.on('error' , console.error.bind(console , 'MongoDB connection error'))
db.on('open' , console.info.bind(console , 'Connection to the database was ok'))

module.exports = app;


