const mongoose=require("mongoose")

const studentSchema= mongoose.Schema({
    name:String,
    class:String,
    adderess:String,
    phone:Number
})


//creating a model

const StudnetCollection= mongoose.model("StudentCollection",studentSchema);

