import mongoose from "mongoose";

const dbconnection = async()=>{
    try{
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to database");
    }
    catch(e){
        console.log("Connection failed");
    }
}

export default dbconnection;

