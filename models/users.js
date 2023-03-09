const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    name:{
        type:String,
        default:"",
    },
    avatar:{
        type:String,
        default:""
    },
    coursesEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    isAdmin:{
        type:Boolean,
        default:false
    },
    firstTimeLogin:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

const User  = mongoose.model('User',userSchema);
module.exports = User;