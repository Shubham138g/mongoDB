const express=require("express");
const path=require("path");
const app =express();
const PORT=4000;
require("./db/conn");

const static_path= path.join(__dirname,"../public");
app.use(express.static(static_path));

app.get("/",(req,res)=>{
    res.send("hello");
})


app.listen(PORT,()=>{
     console.log(`server is running on port number ${PORT}`)
})