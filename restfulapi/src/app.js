const express = require("express");


require("./db/conn");
const Student = require("./models/Student")
const studentRouters=require("./routers/students");


const PORT = 3000;
const app = express();


app.use(express.json());
app.use(studentRouters);






//listen to port number 3000
app.listen(PORT, () => {
    console.log(`server is runnig on ${PORT}`)
})