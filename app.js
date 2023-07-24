const mongoose = require("mongoose")
const dbUrl = "mongodb+srv://tonygupta275:zoAcRqDwTeldGSC2@cluster0.6efrmtj.mongodb.net/college?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connection succesfull");
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

//userschema structure

const studentschema = new mongoose.Schema({
    name: String,
    class: String,
    rollno: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

//model

const Teacher = new mongoose.model("Teacher", studentschema);

//create document or insert

const createDocument = async () => {
    try {
        const stuDent1 = new Teacher({
            name: "Shubham",
            class: "BCA",
            rollno: 206040
        })
        const stuDent2 = new Teacher({
            name: "Kundan",
            class: "BCA",
            rollno: 206046
        })
        const stuDent3 = new Teacher({
            name: "Mohan",
            class: "BCA",
            rollno: 206042
        })
        const stuDent4 = new Teacher({
            name: "Priyanka Thapa",
            class: "BCA",
            rollno: 206054
        })

        const result = await Teacher.insertMany([stuDent1, stuDent2, stuDent3, stuDent4]);
        console.log(result)
    } catch (err) {
        console.log(err)
    }

}
// createDocument();




//read the document from the database
const getDocument = async () => {
    const result = await Teacher
        // .find({ rollno: { $lte: 206054 } })
        // .find({ $or: [{ name: "Shubham" }, { rollno: "206040" } , {name: "shubham"}] })
        .find()
        // .limit(3)
        .select({ name: 1 })
    // .sort({ name: -1 }) //-1 sort the document in decending order and 1 in asecending order
    // .countDocuments()
    console.log(result);
}
// getDocument();




// /update the function

const updateDocument = async (_id) => {
    try {
        // const result = await Teacher.updateOne({ _id }, { $set: { name: "Rashmika" } });
        const result = await Teacher.findByIdAndUpdate({ _id }, //filter
            { $set: { name: "Rashmika mandana" } },
            { new: true, useFindAndModify: false }); //update
        console.log(result);
    } catch (err) {
        console.log(err)
    }
}
// updateDocument("64ba62ac47f63849d60ca6fe");




//delete the document
const deleteDocument = async (_id) => {
    try {
        // const result = await Teacher.deleteOne({ _id });             //first method
        const result = await Teacher.findByIdAndDelete({ _id });        //second method
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
deleteDocument("64ba6662bc01eb5926d6f9a7");

