const mongoose = require("mongoose")

const DB=process.env.DATABASE_NAME;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>{
        console.log("mongodb is connected")
    })
    .catch((err)=>{
        console.log(`mongodb is not connected ${err}`);
    })