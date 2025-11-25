const path = require("path")
const fs =require('fs');
// __dirname = directory path of the current file

//console.log(__dirname)
// output - C:\Users\HP\Desktop\Backend_Development\01_Nodejs\FileSystem
// what is my actual path - 01_Nodejs\FileSystem

//----------------------------------------

// __filename = full file path including file name

//console.log(__filename);
// output - C:\Users\HP\Desktop\Backend_Development\01_Nodejs\FileSystem\path.js

//----------------------------------------

//path.join()
//- safly joins paths
//- handle slashes(/,\) automatically

// const fullPath = path.join(__dirname, "files","data.txt")
// console.log(fullPath);

// perfect for reading / writing files inside the another folder
// fs.readFile(path.join(__dirname, "files", "data.txt"), "utf-8", (err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

//----------------------------------------
//path.resolve()
// creates an absolute path starting from root

//console.log(path.resolve("files", "data.txt"))

// difference with  join
// console.log(path.join("folder", "/test"));
// output- folder\test
// console.log(path.resolve("folder", "/test"));
// output- C:\test

// use path.join()
// reading files
// writing files
// serving html
// loading static assets
// backend folder structure

// user path.resolve()
// you need a definite absolute path
// you want root- based calculation

// Real example
// Serving HTML in Node HTTP

// const filePath = path.join(__dirname, "public", "index.html")


// fs.readFile(filePath, "utf-8", (err, data)=>{
//     if(err) throw err;
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.end(data);
// })






