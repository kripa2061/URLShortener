
const express = require("express");
const Router = express.Router();
const {handleuserSignup,handleuserLogin}=require("../Controller/User")
Router.post("/",handleuserSignup);
Router.post("/login",handleuserLogin);
module.exports=Router;