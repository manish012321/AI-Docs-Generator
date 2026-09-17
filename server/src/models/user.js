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
        requires : function(){
            return this.authProvider === "Local"
        }
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
        enum : ["Local","Google"],
        default : "Local"
    },
    avatar : {
        type : String,
    }
    
},{timestamps : true})
const User = mongoose.model("user",userSchema);
export default User;