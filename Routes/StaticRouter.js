const express = require("express");
const Router = express.Router();
const Url = require("../Model/Url");

Router.get("/", async (req, res) => {
    const allUrls = await Url.find({});
    res.render("home", { urls: allUrls });
});

module.exports = Router;
