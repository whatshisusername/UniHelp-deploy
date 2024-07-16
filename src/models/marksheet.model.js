import mongoose, {Schema} from "mongoose";

const marksheetSchema = new Schema({
 
    semester:{
        type:Number,
        required:true,
        min:[1,'invalid semester'],
        max:8

    },
    marksheet: {
        type: String, //cloudinary url
        required: true
    },
    

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
                },

                

   
}, {timestamps: true})



export const Marksheet = mongoose.model("Marksheet", marksheetSchema)