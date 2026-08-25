import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
     sopId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "sop"
    },
    type : {
        type : String,
        enum : ["transcription","ai-structure","export"]
    },
    status : {
         type : String,
        enum : ["queued","processing","done","failed"],
        default : "queued"
    },
    error : {
        type : String
    },
    completedAt : {
        type : Date
    }
},{timestamps : true})
   

const job = mongoose.model("job",jobSchema);
export default job;