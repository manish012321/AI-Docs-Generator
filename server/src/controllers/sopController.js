import SOP from "../models/sop.schema.js";
import { generateSOP } from "../services/aiService.js";
import { generatePdf } from "../services/pdfService.js";



export const sopControl = async (req, res) => {
    try {
        const { rawText } = req.body;
        const sopData = await generateSOP(rawText);
        const sop = await SOP.create({
            workspaceId: req.user.workspaceId,
            title: sopData.title,

            rawTranscript: rawText,
            structuredSteps: sopData.steps,
            inputType: "text",
            status: "complete",
            createdBy: req.user.id
        })
        return res.status(201).json({ sop });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message })
    }
}

export const exportPdf = async (req, res) => {
    try {
        const sop = await SOP.findById(req.params.id);
        if (!sop) return res.status(404).json({ message: "SOP not found" });

        const pdfBuffer = await generatePdf(sop);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${sop.title}.pdf"`
        });

        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSops = async (req, res) => {
    try {
        const sops = await SOP.find({ workspaceId: req.user.workspaceId });

      
        return res.status(200).json({ sops });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSop = async (req, res) => {
    try {
        const sop = await SOP.findById(req.params.id);
        if (sop.workspaceId.toString() !== req.user.workspaceId.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await SOP.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "SOP deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}