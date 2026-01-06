const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const users =  require('./MOCK_DATA.json');
const app = express();
const PORT = 3000;
const connectMongoDB = require('./connection'); 
const logReq = require('./middleware/logger');

//Middleware
app.use(logReq);
app.use(express.urlencoded({extended : false}))
app.use(express.json());

//connection to MongoDB
connectMongoDB('mongodb://127.0.0.1:27017/MyDatabase')

//Model
const User = mongoose.model("User",userSchema)

// ROutes
app.use('/users', userRouter);
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});