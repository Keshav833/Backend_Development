const express = require("express")
const app = express();

app.use(express.json());
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/auth");


app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(5000, ()=>{
    console.log("Server is running on 5000 ");
});