const shortid = require('shortid');
const Url = require("../Model/Url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).send("URL NOT FOUND");

  const shortID = shortid.generate();

  await Url.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // Fetch all URLs for displaying in the table
  const allUrls = await Url.find({});
  
  return res.render("home", {
    id: shortID,   
    urls: allUrls, 
  });
}


async function handleAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await Url.findOne({ shortID });
  if (!result) return res.status(404).json({ error: "Short URL not found" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleAnalytics };
