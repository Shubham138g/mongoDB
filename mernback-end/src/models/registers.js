const mongoose=require("mongoose")

const employeeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true,
    },
    cpass:{
        type:String,
        required:true,
    }
})


//creating a model

const Register= new  mongoose.model("Register",employeeSchema);

module.exports=Register;

