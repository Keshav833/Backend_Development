const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const users =  require('./MOCK_DATA.json');
const app = express();
const PORT = 3000;

//connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MyDatabase')
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err);    
})

//Schema
const userSchema = new mongoose.Schema({
    firstName :{
        type : String ,
        required : true,
    },
    lastName:{
        type: String ,
    },
    email:{
        type :String ,
        required: true,
        unique : true,
    },
    jobTitle:{
        type:String ,

    },
    Gender :{
        type:String,
    },

} 
// ,{ timestamps : true}
 )

//Model
const User = mongoose.model("User",userSchema)



app.use(express.urlencoded({extended : false}))

app.use(express.json());

// ROutes


app.get('/users', async (req, res)=>{
    const AllUsers = await User.find({});
    const html = `
    <ul>
     ${AllUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`)
     .join("")}
    </ul>
    `
    res.send(html);
})

app.post('/api/users', async (req, res) =>{
    const body  = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.email ||
        !body.lastName ||
        !body.jobTitle 


    ){
        return res.status(400).json({ msg : "All fields are required"});
    }
    const result =  await User.create({
        firstName :body.firstName,
        lastName :body.lastName,
        email :body.email,
        gender : body.gender,
        jobTitle : body.jobTitle,
    })
    console.log("Result:", result);
    return res.status(201).json({msg: "Success"})
})

app.get("/api/users", async (req, res) =>{
    const allUsers = await User.find({});

    res.setHeader('Content-Type','application/json');
    return res.json(allUsers)

})

app
    .route("/api/users/:id")
    .get( async (req,res)=>{
   const user = await User.findById(req.params.id);
   if(!user){
    return res.status(404).json({msg: "USer not found"})
   }
   
    return res.json(user)
    })
    .patch(async  (req,res)=>{
        //Update user logic here
        await User.findByIdAndUpdate(req.params.id, {lastName: "Updated"});
        return res.json({status: "Success"});

    })
    .delete( async (req,res)=>{
        //Delete user logic here
        await User.findByIdAndDelete(req.params.id, )
        return res.json({status: "Pending"});
    })
    

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});