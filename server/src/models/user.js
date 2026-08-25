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
    password : {
        type : String,
        required : true
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
    
},{timestamps : true})
const User = mongoose.model("user",userSchema);
export default User;