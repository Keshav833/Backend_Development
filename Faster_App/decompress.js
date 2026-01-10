const  fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('input.txt.gz');
const writeStream = fs.createWriteStream('output.txt');

const gunzip = zlib.createGunzip();



readStream
    .pipe(gunzip)
    .pipe(writeStream)
    .on("finish",()=>{
        console.log('File decompressed successfully');
    })

// Decompress it back
// zlib.gunzip(compressed, (err, original) => {
//   if (err) throw err;
//   console.log("Decompressed:", original.toString());
// });
