import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// nishant requested exam dept for marksheet for semester 
// content="nishant requested exam dept for marksheet for semester"
// from=[nishant-id]
//semester
// to=[hitesh-id]

const applicationSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        }, 


        semester:{
            type:Number,
            required:true,
            min:[1,'invalid semester'],
            max:8
    
        },
            //true if marksheet uploaded by exam dept else false.
    replied:{
        type:Boolean,
        
                },

        from:  
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ,
        to: 
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ,
    },
    {
        timestamps: true
    }
)




export const Application = mongoose.model("Application", applicationSchema)