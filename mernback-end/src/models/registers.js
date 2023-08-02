const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")


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

//now create password hash
employeeSchema.pre("save", async function(next){

    if(this.isModified("pass")){
        console.log(`current pass is ${this.pass}`);
        this.pass= await bcrypt.hash(this.pass,10);
        console.log(`current pass after hashing ${this.pass}`);
        this.cpass=undefined; 
    }
    next();

})

//creating a model
const Register= new  mongoose.model("Register",employeeSchema);

module.exports=Register;

