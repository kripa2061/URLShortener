const express = require("express");
require('dotenv').config();
const path = require('path');
const { connectMongoDB } = require("./Connection");
const Url = require("./Model/Url")
const urlRoutes = require("./Routes/Url");
const staticRoutes = require("./Routes/StaticRouter")
const  {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth")
const UserRoutes=require("./Routes/User")
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
const cookieParser=require('cookie-parser');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.get("/", (req, res) => {
    res.redirect("/login");
});
app.get("/url", async (req, res) => {
  try {
    const allUrls = await Url.find({});
    const urlMap = {};
    allUrls.forEach(url => {
      if (!urlMap[url.redirectURL]) {
        urlMap[url.redirectURL] = {
          shortID: url.shortID,
          redirectURL: url.redirectURL,
          clicks: url.visitHistory.length
        };
      } else {
        urlMap[url.redirectURL].clicks += url.visitHistory.length;
      }
    });

    const uniqueUrls = Object.values(urlMap);

    return res.render("home", { urls: uniqueUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).send("Server Error");
  }
});

app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly ,urlRoutes);
app.use("/",checkAuth, staticRoutes);
app.use("/user",UserRoutes);
app.get("/:shortId", async (req, res) => {
  try {
    const shortID = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server Error");
  }
});





connectMongoDB(MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));
app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`)
});
