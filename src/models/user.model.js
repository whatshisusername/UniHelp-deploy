import mongoose,{Mongoose, Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema =new Schema({
    registrationId:{
        type:Number,
        required:true,
        unique:true,
        min:[100000000,'invalid Registration Id'],
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    // 1=teacher,2=student
    userrole:{
        type:Number,
        required:true,
        min:[1,'invalid user-role'],
        max:2


    },
    
    fullname:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
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
          'Elecrical Engineering',
         'Eletronics Engineering',
        'Electronics and Telecommunication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Production Engineering',
        'Textile Engineering'

    ],
          message: '{VALUE} is not supported'
        }
      },

    avatar: {
        type: String, // cloudinary url uploading image to third party and storing that url here
        required: true,
    },
    refreshToken: {
        type: String
    }

},
{
    timestamps: true
}
)

// this is mongoose middleware pre hook ie before saving the password into database enrypt it
// do this when password first time being saved or updated

userSchema.pre("save",async function (next){
    // if password is not modified return 
    if (!this.isModified("password")) return next()

    // else encrypt it hash is encrypt function and 10 is no. of rounds of encrypt
    this.password = await bcrypt.hash(this.password,10)
    next()
})

// using encryption password will be saved as encrypted in database
// so when user enters password to login it needs to be checked with encrypt password and entered password
// this user defined method  isPasswordCorrect applied on userSchema will return true if password same else false
userSchema.methods.isPasswordCorrect = async function(enteredpassword)
{
    return await bcrypt.compare(enteredpassword,this.password)  //this.password is enrypt password
}

// we generating acess token using jwt.sign function
// this function needs {payload ie data} in object format,secret key,{expirytime}
// user defined methods
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User =mongoose.model("User",userSchema); 