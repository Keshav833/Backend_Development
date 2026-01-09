const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type :String ,
        required:true,
        unique: true,
    },
    redirectURL:{
        type :String ,
        required:true,
    },
    VisitHistory: [{
        timestamp: {type:Number}
    }]

},{timestamps:true});

//Model
const URL = mongoose.model("URL", urlSchema);

module.exports = URL;