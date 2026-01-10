const express = require('express');
const app = express();

const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('input.txt.gz');

const gzip = zlib.createGzip();

readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on("finish",()=>{
        console.log('File compressed successfully');
    })


// Compress a string
// const zlib = require("zlib");

// const text = "Node.js compression is actually simple";

// zlib.gzip(text, (err, compressed) => {
//   if (err) throw err;
//   console.log("Compressed:", compressed);
// });

// using compression module for faster app
// const compression = require('compression');
// app.use(compression({
//     level:6,
//     threshold:100*1000,
//     filter:(req,res)=>{
//         if(req.header['x-no-compression']){
//             return false;
//         }
//         else{
//             return compression.filter(req, res);
//         }
//     }
// }));

// app.get('/',(req, res)=>{
//     const payload = 'Faster app which uses less Bandwidth too...'
//     res.send(payload.repeat(100));
// })

app.listen(3000,()=>{
    console.log('Faster App is running on port 3000');
})
