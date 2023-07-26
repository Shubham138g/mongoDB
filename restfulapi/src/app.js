const express= require("express");
require("./db/conn");
const app =express();

app.get("/",(req,res)=>{
    res.send("hello from the home page")
})
app.post("/users",(req,res)=>{
    res.send("hello from the user page")
})

app.listen(3000,()=>{
    console.log(`server is runnig on 3000`)
})