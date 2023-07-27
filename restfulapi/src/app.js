const express = require("express");
require("./db/conn");
const Student = require("./models/Student")

const PORT=3000;

const app = express();


app.use(express.json());


// app.get("/",(req,res)=>{
//     res.send("hello from the home page")
// })
app.post("/students", (req, res) => {
    console.log(req.body);
    const user = new Student(req.body)

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
})





//listen to port number 3000
app.listen(PORT, () => {
    console.log(`server is runnig on ${PORT}`)
})