import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema({
    coursenumber:{
        type:Number,
        required:true,
        unique:true,
        min:[100000000,'invalid Course Id'],
        index:true,
    },
    semester:{
        type:Number,
        required:true,
        min:[1,'invalid semester'],
        max:8

    },
    branch: {
        type: String,
        enum: {
          values: ['Computer Engineering', 
          'Information Technology',
          'Electrical Engineering',
         'Electronics Engineering',
        'Electronics and Telecommunication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Production Engineering',
        'Textile Engineering'

    ],
          message: '{VALUE} is not supported'
        }
      },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    thumbnail: {
                    type: String, //cloudinary url
                    required: true
                },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
                },
                

    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    teachers:[ {
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
}, {timestamps: true})



export const Course = mongoose.model("Course", courseSchema)