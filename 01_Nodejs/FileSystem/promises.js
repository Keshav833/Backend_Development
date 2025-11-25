const { readFile } = require("fs");

const fs = require("fs").promises;

// write File

// async function run(){
//     await fs.writeFile("data.txt", "Hello Keshu !")
//     console.log("File created");
// }
// run();



//read File

// async function run (){
//     const data = await fs.readFile("data.txt", "utf-8");
//     console.log(data);
// }
// run();

// create Folder
// async function run(){

//    await fs.mkdir("logs",{recursive:true});
//    console.log("Folder created");
// }
// run();

// full example - create - read - Delete using async/ await 

async function runScript(){
    try{
        await fs.mkdir("test", {recursive: true});
        console.log("Folder Created");
        await fs.writeFile("test/Data.txt", "Hello Keshu Ji");
        console.log("File Created");
        const data = await fs.readFile("test/Data.txt","utf-8");
        console.log(data);
        await fs.rm("test", {recursive:true});
        console.log("Folder Deleted");
         
    }
    catch(err){
        console.log("Error", err);

    }
}
runScript();