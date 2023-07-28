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



//get single student by its ID data using HTTP GET method
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
        res.status(500).send(err);
    }
})


//update students by its ID using patch http method

app.patch("/students/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{new :true});
        res.send(updateStudents);
    }catch(err){
        res.status(404).send(err);
    }
})

//delete students by its ID using patch http method
app.delete("/students/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const deleteStudent=await Student.findByIdAndDelete(_id);

        if(!deleteStudent){
            return res.status(404).send();
        }
        res.send(deleteStudent);
    }catch(err){
        res.status(500).send(err);
    }
})





//listen to port number 3000
app.listen(PORT, () => {
    console.log(`server is runnig on ${PORT}`)
})