const mongoose = require("mongoose")
const validator = require("validator")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already taken"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Error");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        maxlength:10,
        minlength:10
    },
    adderess:{
        type:String,
        required:true
    }
})

//creating a model

