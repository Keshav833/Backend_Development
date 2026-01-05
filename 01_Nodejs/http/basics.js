const http = require("http");

const server = http.createServer((req,res)=>{
  res.setHeader("Content-Type", "text/plain");

  console.log("URL:", req.url);
//   console.log("Query:", req.query);
  console.log("Methods:",req.method);
  console.log("Headers:", req.headers.host);
  if(req.url === "/"){
    res.statusCode = 200;
    res.end("Home Page");
  }
  else if(req.url === "/login" && req.method === "Post"){
    let body = "";
    req.on("data", chunk =>{
        body += chunk.toString();
    })
    req.on("end",()=>{
        console.log("Body: ",body);
        res.end("Login data received");
    })
  }
  else if(req.url === "/about"){
    res.statusCode = 200;
    res.end("About Page");
  }
  else{
    res.statusCode = 404;
    res.end("404 - Page not found");
  }
});
server.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})