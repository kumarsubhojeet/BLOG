const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName:{
        required:[true , "First Name is required"],
        type:String
    },
    lastName:{
        required:[true , "last Name is required"],
        type:String
    },
    email:{
        type:String,
        required:[true , "Enter Email Address"],
    },
    profilePicture:{
        type:String,
        default:'https://www.pngkey.com/png/detail/52-523516_empty-profile-picture-circle.png'
    },
    bio:{
        type:String,
    },
    password:{
        type:String,
        required:[true , "Password is required"], 
    },
    postCount:{
        type:Number,
        default:0,
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:[
            'Admin',
            'Guest',
            'Blogger'
        ]
    },
    isFollowing:{
        type:Boolean,
        default:false
    },
    isUnFollowing:{
        type:Boolean,
        default:false
    },
    isAccVerified:{
        type:Boolean,
        default:false
    },
    AccVerificationToken:String,
    AccVerificationTokenExpire:Date,
    viewedBy:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ]
    },
    followers:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ]
    },
    following:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ]
    }
    ,
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:false
    }
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true,
})

//Hash Password
userSchema.pre('save' ,async function(next){

    const salt = await bcrypt.genSalt(9)
    this.password = await bcrypt.hash(this.password, salt);
    
    
    next();
})


//Password Matching

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//-----------------------------
//this.password is the password stored in DB.
//enteredPassword is the password user enter currently.
//-----------------------------


// Create Model
const UserModel = mongoose.model("User" , userSchema)

module.exports = UserModel;