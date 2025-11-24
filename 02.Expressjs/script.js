const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(function(req, res, next){
//   console.log("Middle ware chal chuka hai");
//   next();

// })

// app.use(function(req, res, next){
//   console.log("Middle ware ek aur baar chal chuka hai");
//   next();

// })

app.get('/', (req, res) => {
  res.send('Hello World, how is it , ')
})
app.get('/about', (req, res) => {
  res.send('Hello I am keshu ji ')
})
app.get('/profile', (req, res,next) => {
  return next(new Error("something went wrong") )
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
