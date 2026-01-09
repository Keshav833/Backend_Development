const express = require('express');
const {connectMongoDB} = require('./connect')
const urlRoute = require('./routes/url')
const app = express();
const PORT = 3000;
app.use(express.json());
connectMongoDB('mongodb://127.0.0.1:27017/URL-Shortener')
.then(()=>{
    console.log('Connected to MongoDB');
})
const URL = require('./models/url')
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({
      error: "Short URL not found",
    });
  }

    entry.VisitHistory.push({ timestamp: Date.now() });
  res.redirect(entry.redirectURL);
});


app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`);
})