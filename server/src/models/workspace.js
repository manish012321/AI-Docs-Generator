import mongoose from 'mongoose';

const userWorkspace = new mongoose.Schema(
    {
        name : {
            type : String ,
            required : true
        },
        plan : {
            type : String ,
            enum : ["free","starter","pro","enterprise"],
            default : "free"
        },
        sopCount : {
            type : Number,
            default : 0
        },
        stripeCustomerId : {
            type: String,
        },
        members : [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }]
    },{ timestamps: true }
)
const Workspace = mongoose.model("Workspace",userWorkspace);
export default Workspace;