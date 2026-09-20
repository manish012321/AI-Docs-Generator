import GeneratedDoc from "../models/generatedDoc.schema.js";
import {
  generateStructuredDoc,
  generateDocument,
} from "../services/aiService.js";
import { generatePdf } from "../services/pdfService.js";


const STRUCTURED_TYPES = new Set(["SOP"]);

const buildFallbackTitle = (type, rawText) => {
  const firstLine = rawText.trim().split("\n")[0]?.slice(0, 60) || "";
  return firstLine ? `${type}: ${firstLine}` : type;
};

// POST /api/generate-docs
export const generateDocControl = async (req, res) => {
  try {
    const { documentType, rawText } = req.body;

    if (!documentType || !rawText?.trim()) {
      return res
        .status(400)
        .json({ message: "documentType and rawText are required" });
    }

    let title = "";
    let structuredSteps = [];
    let content = null;

    if (STRUCTURED_TYPES.has(documentType)) {
      const data = await generateStructuredDoc(documentType, rawText);
      title = data.title;
      structuredSteps = data.steps;
    } else {
      content = await generateDocument(documentType, rawText);
      title = buildFallbackTitle(documentType, rawText);
    }

    const doc = await GeneratedDoc.create({
      workspaceId: req.user.workspaceId,
      type: documentType,
      title,
      rawTranscript: rawText,
      structuredSteps,
      content,
      inputType: "text",
      status: "complete",
      createdBy: req.user.id,
    });

    return res.status(201).json({ document: doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/generate-docs
export const getGeneratedDocs = async (req, res) => {
  try {
    const filter = { workspaceId: req.user.workspaceId };
    if (req.query.type) filter.type = req.query.type;

    const documents = await GeneratedDoc.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ documents });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/generate-docs/:id
export const getGeneratedDocById = async (req, res) => {
  try {
    const doc = await GeneratedDoc.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.workspaceId.toString() !== req.user.workspaceId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    return res.status(200).json({ document: doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/generate-docs/:id/pdf
export const exportPdf = async (req, res) => {
  try {
    const doc = await GeneratedDoc.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.workspaceId.toString() !== req.user.workspaceId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const pdfBuffer = await generatePdf(doc);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.title}.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/generate-docs/:id
export const deleteGeneratedDoc = async (req, res) => {
  try {
    const doc = await GeneratedDoc.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.workspaceId.toString() !== req.user.workspaceId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await GeneratedDoc.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};