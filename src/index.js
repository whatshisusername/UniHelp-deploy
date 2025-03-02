import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";



dotenv.config({
    path: './.env'
});

// running our mongodb connect function declared in db/index.js used to connect to mongodatabasesdf
connectDB()
.then(
    
    app.listen(process.env.PORT||8000,()=>
    {
        console.log(`server is running on port ${process.env.PORT}`);
    })
    
)
.catch((error)=>{
    console.log("MONGODB connection failed",error);
})

// connectDB()
//     .then(() => {
//         const server = app.listen(process.env.PORT || 8000, () => {
//             console.log(`Server is running on port ${process.env.PORT || 8000}`);
//         });

//         // Set the server timeout to 2 minutes (120000 milliseconds)
//         server.setTimeout(120000);
//     })
//     .catch((error) => {
//         console.log("MONGODB connection failed", error);
//     });








// first approch to connect to database
/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/
