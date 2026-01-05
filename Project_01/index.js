const express = require("express");
const users =  require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({extended : true}));
// app.use(express.json());

//Routes
app.get("/users", (req, res) => {
//   const html = `
//     <ul>
//       ${users
//         .map(user => `<li>${user.first_name}</li>`)
//         .join("")}
//     </ul>
//   `;
  res.send(users);
});



//Rest api
app.get('/api/users',(req,res)=>{
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
        //Delete user logic here
        return res.json({status: "Pending"});
    })
    
app.post('/api/users',(req, res)=>{

    const body = req.body;

    // console.log("Body:",body);
    users.push(body);
    users.push({ id:users.length + 1, ...body})
    fs.writeFile('MOCK_DATA.json',JSON.stringify(users),(err, data)=>{
        return res.json({
            status : "Success",
            id : users.length  
        })
    })
        // return res.json({status: "Pending"});
        
})    


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});