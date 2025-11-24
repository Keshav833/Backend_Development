const express = require('express')
const app = express()
const port = 3000
const Path = require('path');

app.use(express.json());
app.use(express.urlencoded({extends: true}))
app.use(express.static(Path.join(__dirname,'public')));

app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render("index");
})
app.get('/profile', (req, res) => {
  res.send("This is my profile page")
})
//dynamic routing
app.get('/Profile/:username', (req, res) => {
  // res.send("This is keshav profile page")
  res.send(req.params.username);
})
app.get('/Profile/:username/:age', (req, res) => {
  
  res.send(`welcome ${req.params.username} of age ${req.params.age}`);
  
})


app.listen(port, () => {
  console.log(`Server is  listening on port ${port}`)
})
