const express = require("express");
const users =  require('./MOCK_DATA.json');

const app = express();
const PORT = 3000;

//Routes

app.get("/users",(req,res)=>{
    const html = `
    <ul>
    ${users.map((users) =>
    `
    <li>${users.first_name}</li>
    `)}}
)}

    </ul>
    `;
    res.send(html)
})


//Rest api
app.get('/api//users',(req,res)=>{
    res.json(users);
})

app
    .route("/api/users/:id")
    .get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id ===id);
    return res.json(user)
    })
    .patch((req,res)=>{
        //Update user logic here
        return res.json({status: "Pending"});

    })
    .delete((req,res)=>{
        return res.json({status: "Pending"});
    })

app.post('/api/users',(req, res)=>{
    
})    


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});