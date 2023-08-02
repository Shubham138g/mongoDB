const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");


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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
//creating a token 
employeeSchema.methods.generateAuthToken= async function(){
    try {
        // console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},"mynameisshubhamguptaandiamastudent");
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send("the error page"+error)
        console.log("error"+error);
    }
}

//now converting  password into  hash
employeeSchema.pre("save", async function(next){

    if(this.isModified("pass")){ 
        this.pass= await bcrypt.hash(this.pass,10);
        this.cpass=await bcrypt.hash(this.pass,10);
    }
    next();

})

//creating a model
const Register= new  mongoose.model("Register",employeeSchema);

module.exports=Register;

