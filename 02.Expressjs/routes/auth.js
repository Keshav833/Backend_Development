const {body, validationResult} = require("express-validator")
const express = require("express")
const router = express.Router();

router.post("/register",[
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min:6}).withMessage("Password must be 6 character"),
],
(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    res.send("Registion Successfull");
}
)
module.exports = router;

