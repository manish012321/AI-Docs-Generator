import mongoose from 'mongoose';

const sopSchema = new mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
    },
    title: {
        type: String
    },
    rawTranscript: {
        type: String
    },
    structuredSteps: [{
        step: { type: Number },
        description: { type: String },
        role: { type: String },
        warning: { type: String },
    }],
    inputType: {
        type: String,
        enum: ["video", "audio", "text", "document"]
    },
    status: {
        type: String,
        enum: ["processing", "complete", "failed"],
        default: "processing"
    },
    exportUrls: {
        pdf: { type: String },
        docx: { type: String },
        pptx: { type: String },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, { timestamps: true })

const SOP = mongoose.model("sop", sopSchema);
export default SOP;