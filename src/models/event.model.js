import mongoose, {Schema} from "mongoose";

const eventSchema = new Schema({
   title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true,
    },
    time: {
        type: String,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    instagram:{
        type: String,
    },
    twitter:{
        type: String,
  
    },
    gform:{
        type: String,
       
    },
    linkedin:{
        type: String,
  
    },

    thumbnail: {
                    type: String, //cloudinary url
                    required: true
                },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
                },
                
}, {timestamps: true})



export const Event = mongoose.model("Event", eventSchema)