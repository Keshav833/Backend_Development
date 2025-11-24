const fs = require("fs");

// create a file named => notes.txt
// in that file there will be a text written => Hello Keshu ji

//async create a file(write)
// fs.writeFile("notes.txt","Hello Keshu ji", (err)=>{
//     if(err) throw err;
//     console.log("File created");
// })

// Sync
//fs.writeFileSync("notes.txt","Hello I am sync text");

//-------------------------------------

//append Data
//add a more data with past data stored in file
// fs.appendFile("notes.txt", "\n this is a new content writen using append", (err)=>{
    //     if(err) throw err;
    //     console.log("Data Appended!")
    // })
    
    
//-------------------------------------

//Read a File using(readFile)
// if utf-8 not present then buffer happen
// fs.readFile("notes.txt","utf-8",(err,data)=>{
    //     if(err) throw err;
    //     console.log(data);
    // })
    
    
//-------------------------------------

//Rename a File

// fs.rename("notes.txt","myNotes.txt",(err,data)=>{
//     if(err) throw err;
//     console.log("File renamed!");
// })
    
    
//-------------------------------------

// Delete a File
// fs.unlink("notes.txt",(err)=>{
//     if(err) throw err;
//     console.log("File deleted");
// })

//-------------------------------------

// create Folder

// fs.mkdir("MyFolder", (err)=>{
//     if(err) throw err;
//     console.log("folder created");
// })


//-------------------------------------

// read all files in a folder
//=> means ke sari files ke name de dega 

// fs.readdir("MyFolder",(err,Files)=>{
//     if(err) throw err;
//     console.log(Files);
// })

//-------------------------------------

// Check if file/ Folder exist

// if(fs.existsSync("MyFolder")){
//     console.log("Exists!");
// }else{
//     console.log("404 Not Found!");
    
// }

//-------------------------------------

// fs.rmdir("myFolder",{recursive:true},(err)=>{
//     if(err) throw err;
//     console.log("Folder deleted!");
// })

//-----------------------------------------------

//final mini practice;

fs.mkdir("MyFolder",(err)=>{
    if(err) throw err;
    console.log("Folder created");
    fs.writeFile("MyFolder/user.txt", "Keshu JI Parnam", (err)=>{
        if(err) throw err;
        console.log("File created");
        fs.readFile("MyFolder/user.txt", "utf-8", (err,data)=>{
            if(err) throw err;
            console.log(`File Data: ${data}`);
            fs.unlink("MyFolder/user.txt",(err)=>{
                if(err) throw err;
                console.log("File deleted");
                fs.rm("MyFolder",{recursive:true},(err)=>{
                    if(err) throw err;
                    console.log("Folder is Deleted \n Thankyou :)");

                })
            })
        })
    })
})
