const express = require("express")
const router = express.Router();

router.get("/profile",(req, res)=>{
    res.send("User Profile Route");
})
router.get("/register",(req, res)=>{
    res.send("Register Route");
})

module.exports = router;