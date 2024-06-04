import mongoose from 'mongoose';
// getting our database name from constants file
import { DB_NAME } from '../constants.js';


const connectDB=async ()=>{
    try{

        mongoose.set('debug', true);

        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database:${connectionInstance.connection.name}`)
        console.log(`Mongo connected DB HOST :${connectionInstance.connection.host}`);
    }
    catch(error){
        console.error("MONGODB connection error",error);
        // process if the reference to current process running on localhost 
        // we kill our process
        process.exit(1);
    }
}


export default connectDB