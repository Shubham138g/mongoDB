const mongoose=require("mongoose")

const DB="mongodb+srv://tonygupta275:zoAcRqDwTeldGSC2@cluster0.6efrmtj.mongodb.net/college?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log("mongodb is not connected")
})