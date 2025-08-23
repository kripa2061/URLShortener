const express = require("express");
const Router = express.Router();
const Url = require("../Model/Url");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");
Router.get("/url", restrictToLoggedinUserOnly,async (req, res) => {
    if(!req.user) return res.redirect("/login")
    const allUrls = await Url.find({createdBy:req.user._id});
    res.render("home", { urls: allUrls });
});
Router.get("/signup",(req,res)=>{
return res.render("signup");
})
Router.get("/login",(req,res)=>{
return res.render("login");
})

module.exports = Router;
