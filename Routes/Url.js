const express = require("express");
const Router = express.Router();

const { handleGenerateNewShortURL, handleAnalytics } = require("../Controller/Url");

Router.post("/", handleGenerateNewShortURL);
Router.post("/analytics/:shortID",handleAnalytics );

module.exports = Router;
