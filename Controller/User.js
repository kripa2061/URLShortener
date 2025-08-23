const{v4:uuidv4}=require('uuid');
const user=require("../Model/User")
const  {setUser}=require("../service/auth")

async function handleuserSignup(req, res) {
    try{
 const {name,email,password}=req.body;
 await user.create({
    name,
    email,
    password,
 })
 return res.redirect("/login");
}
catch(err){
      console.error("Signup Error:", err);
    return res.status(500).send("Signup failed");
}
}

async function handleuserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email, password });
    
    if (!existingUser) {
      return res.render("login", {
        error: "Invalid Email or Password"
      });
    }

const token=setUser(existingUser);
res.cookie('uid',token);
    return res.redirect("/url");
  } catch (err) {
    console.error("Login Error:", err);
    return res.render("login", { error: "Something went wrong. Try again." });
  }
}
module.exports={handleuserSignup,handleuserLogin};