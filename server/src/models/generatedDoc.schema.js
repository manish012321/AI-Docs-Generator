// models/generatedDoc.schema.js
import mongoose from "mongoose";

const generatedDocSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    type: { type: String, required: true }, // "SOP", "Resume / CV", ...
    title: { type: String, required: true },
    rawTranscript: { type: String },

   
    structuredSteps: { type: Array, default: [] },

    
    content: { type: String },

    inputType: { type: String, default: "text" },
    status: { type: String, default: "complete" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GeneratedDoc", generatedDocSchema);