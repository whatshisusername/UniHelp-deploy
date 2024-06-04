import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// nishant joined hitesh course 
// content="nishant joined ur course"
// from=[nishant-id]
// to=[hitesh-id]

const notificationSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        }, 
        // if to ie reciver reads it read=true else false

        read:{
            type:Boolean,

        },

        from:  [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        to: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        timestamps: true
    }
)




export const Notification = mongoose.model("Notification", notificationSchema)