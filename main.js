//import 
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 4000;
const db = mongoose.connection;

//connect Database
mongoose.connect(process.env.DB_URL,{useNewUrlParser :true ,useUnifiedTopology:true});
db.on("error",(error)=>console.log(error));
db.once("open",()=>console.log("connected to the datebase !"));

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:"my secret key",
    saveUninitialized : true,
    resave:false,
}));
app.use((req,res,next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//template engine
app.set('view engine', 'ejs');


//router prefix 
app.use("", require("./routes/routes"));


app.listen (PORT , ()=>{console.log (`Server Started at http://localhost:${PORT}`);});