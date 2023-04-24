const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const multer = require("multer");

//upload image
var storage = multer.diskStorage({
    destination : function(req , file , cd){
        cd(null , "./uploads");
    },

filename : function (req , file , cd){
    cd(null , file.fieldname +"_" +Date.now() +"_"+file.originalname);

}
});
var upload = multer({
    storage:storage,
}).single('image');



router.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});
router.get("/add", (req,res)=>{
    res.render("add_user" , {title:"add user"});
});
router.post("/add", upload , (req,res)=>{
const user = new User({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    image:req.body.image,
});
user.save((err)=>{
    if(err){
        res.json({meesage : err.message , type:'danger'});
    }
    else{
        req.session.message
    }
})
});
 module.exports=router;