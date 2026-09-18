import mongoose from "mongoose"

const userSchema = new mongoose.Schema
({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
  workspaceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workspace"
    },
    role : {
        type : String,
        enum : ["owner","editor","viewer"],
        default : "viewer"
    },
    authProvider : {
        type : String,
        enum : ["OTP","Google"],
        default : "OTP"
    },
    avatar : {
        type : String,
    }
    
},{timestamps : true})
const User = mongoose.model("user",userSchema);
export default User;