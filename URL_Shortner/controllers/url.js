const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res){
    const {url} = req.body;
    if(!url) return res.status(400).json({error : 'url is required'})
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL : url,
        VisitHistory: [],
    })
    return res.status(201).json({  id : shortId })
}

async function handleAnalytics(req, res){
  const { shortId } = req.params;
  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ msg: "Short URL not found" });
  }

  return res.status(200).json({
    totalClicks: entry.VisitHistory.length,
    analytics: entry.VisitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleAnalytics,
};
