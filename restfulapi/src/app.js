const express = require("express");
require("./db/conn");
const Student = require("./models/Student")

const PORT = 3000;

const app = express();


app.use(express.json());


// app.get("/",(req,res)=>{
//     res.send("hello from the home page")
// })


// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body)

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })
// })


//using async await to post method

app.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})


//get all students data using HTTP GET method
app.get("/students", async (req, res) => {
    try {
        const stundentsData = await Student.find();
        res.send(stundentsData);
    } catch (err) {
        res.send(err)
    }
})

//get single student data using HTTP GET method

app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if (!studentData) {
            return res.status(404).send();
        }
        else {
            res.send(studentData);
        }
    }
    catch (err) {
        res.send(err);
    }

})




//listen to port number 3000
app.listen(PORT, () => {
    console.log(`server is runnig on ${PORT}`)
})