// Streams help you read/write large files without loading them fully into memory.

//  Node reads them piece-by-piece (chunks).
//  Perfect for videos, images, logs, big JSON, PDFs.

const fs = require("fs")


//createReadStream
const stream = fs.createReadStream("bigFile.txt", "utf-8");

stream.on("data",(chunk)=>{
    console.log("Chunk:",chunk);
});
stream.on("end", ()=>{
    console.log("Finished reading");
})
stream.on("error", (err)=>{
    console.log("error: ", err);
})

//createWriteStream();
const write = fs.createWriteStream("output.txt");
write.write("Hello KEshu \n");
write.write("I am  learning stream \n");
write.end();