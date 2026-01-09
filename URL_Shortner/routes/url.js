const express = require('express');

const {handleGenerateNewShortURL } = require('../controllers/url')
const {handleAnalytics} = require('../controllers/url')
const router = express.Router();

router.post("/", handleGenerateNewShortURL)
router.get("/analytics/:shortId",handleAnalytics)
module.exports = router ;