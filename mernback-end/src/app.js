require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


require("./db/conn");
const bcrypt = require("bcryptjs");
const path = require("path");
const hbs = require("hbs");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const Register = require("./models/registers")
const auth=require("./middleware/auth");




const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");




app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

//routing
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/secret", auth, (req, res) => {
    // console.log(`this is cookies: ${req.cookies.jwt}`);
    res.render("secret");
})


//logout section
app.get("/logout",auth, async(req,res)=>{
    try {
        console.log(req.user);
        //for single logout
        req.user.tokens=req.user.tokens.filter((currentElement)=>{
            return currentElement.token != req.token;
        });
        
        //logout from all devices
        // req.user.tokens=[];

        //delete the cookie from the browser
        res.clearCookie("jwt");

        
        await req.user.save();
        console.log("logout sucesssful");
        res.render("login");       
    } catch (error) {
        res.status(500).send(error);    
    }

})


//register
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

            //middleware
            const token = await registerEmployee.generateAuthToken();
            console.log(token);

            //setting cookie
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            });
            console.log(cookie);


            const registerd = await registerEmployee.save();
            console.log("the page part"+registerd);
            res.status(201).render("index");
        }
        else {
            res.send("password is not matching")
        }
    } catch (err) {
        res.status(400).send();
    }
})


//login method
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;

        const useremail = await Register.findOne({ email: email });
        //comparing hash password with passwor which is stored on database
        const isMatch = await bcrypt.compare(pass, useremail.pass);

        //middleware
        const token = await useremail.generateAuthToken();
        console.log("the token part " + token);

        //setting cookie
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
            // secure:true
        });

       

        // if(useremail.pass===pass){
        if (isMatch) {
            res.status(201).render("index")
        } else {
            res.status(400).send("invalid password details")
        }
    } catch (err) {
        res.status(400).send("invalid login details")
    }
})



//server is listeing here:
app.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})
