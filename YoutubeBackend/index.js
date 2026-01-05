const express = require('express')
const app = express()
const port = 3000
const Path = require('path');
const fs = require('fs');

app.use(express.json());

app.use(express.urlencoded({extends: true}))

app.use(express.static(Path.join(__dirname,'public')));

app.set('view engine','ejs');

app.get('/', function(req, res){
  fs.readdir(`./files`, function(err, files){
    res.render("index",{files:files});
  })
})

app.post('/create', function(req, res){
    console.log(req.body.title)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.details , function(err){
        res.redirect("/");
    });
})
app.get('/file/:filename', function(req, res){
   fs.readFile(`./files/${req.params.filename}`, "utf-8" , function(err, filedata){
      res.render('show', {filename:req.params.filename , filedata : filedata});
   })
  
})
app.get('/edit/:filename', function(req, res){
   res.render('edit',{filename:req.params.filename})
   
  
})

app.post('/edit', function(req, res){
  console.log(req.body.previous)
  console.log(req.body.NewName)
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.NewName}`,function(err){
    if(err) console.log(err);
    res.redirect("/");
  })
  
})

// app.get('/', (req, res) => {
//   res.render("index");
// })

// app.get('/profile', (req, res) => {
//   res.send("This is my profile page")
// })
// //dynamic routing
// app.get('/Profile/:username', (req, res) => {
//   // res.send("This is keshav profile page")
//   res.send(req.params.username);
// })
// app.get('/Profile/:username/:age', (req, res) => {
  
//   res.send(`welcome ${req.params.username} of age ${req.params.age}`);
  
// })


app.listen(port, () => {
  console.log(`Server is  listening on port ${port}`)
})
