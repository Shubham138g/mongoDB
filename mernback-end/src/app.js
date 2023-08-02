const express = require("express");
const app = express();

const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers")
// const PORT=4000;

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirm_password;
        if (password === cpassword) {
            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                pass: req.body.password,
                cpass: req.body.confirm_password,
            })
            const registerd=await registerEmployee.save();
            res.status(201).render("index")
        }
        else {
            res.send("password is not matching")
        }
    } catch (err) {
        res.status(400).send();
    }
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login", async(req, res) => {
    try{
        const email=req.body.email;
        const pass=req.body.pass;
    
        const useremail= await Register.findOne({email:email});
        if(useremail.pass===pass){
            res.status(201).render("index")
        }else{
            res.status(400).send("invalid login details")
        }
    }catch(err){
        res.status(400).send("invalid login details")
    }
    
 
})


app.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})
