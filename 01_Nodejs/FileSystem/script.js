const fs = require('fs');

//fs.writeFile(file, data[, options], callback)
// fs.writeFile("hey.txt", "Hello Keshu Ji ", function(err){
//     if(err) console.error(err);
//     console.log("Done");
// })

//fs.rename(oldPath, newPath, callback)
// fs.rename("hey.txt", "Hello.txt", function(err){
//     if(err) console.error(err);
//     console.log("File Name changed");
// })

//fs.copyFile(src, dest[, mode], callback)
// fs.copyFile("Hello.txt", "./copy/new.txt", function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

//fs.unlink(path, callback)
// fs.unlink("hello.txt", (err)=>{
//     if(err) console.error(err);
//     console.log("removed")
// })

//fs.rmdir(path[, options], callback)
// fs.rm(path[, options], callback)
fs.rmdir("./copy", {recursive: true},(err)=>{
    if(err) console.error(err)
    console.log("Directory Removed");
})


