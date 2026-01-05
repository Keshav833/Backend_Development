const express = require("express")
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/api/products",(req,res)=>{
    res.json([
        { id:1, name: "Facewash"},
        { id:2, name: "Sunscreen"}
    ]);
})

app.post ("/api/register", (req, res)=>{
    const {name , email , password} = req.body;

    res.status(201).json({
        message: "User registered",
        user: { name, email}
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
