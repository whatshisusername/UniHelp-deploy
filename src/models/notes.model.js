import mongoose, {Schema} from "mongoose";

const notesSchema = new Schema({
   
    filename: {
        type: String,
        required:true
        },
     
   
    // cloudinary url of notes file
    notesfile: {
                    type: String, //cloudinary url
                    required: true
                },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
                },
                

}, {timestamps: true})



export const Notes = mongoose.model("Notes", notesSchema)