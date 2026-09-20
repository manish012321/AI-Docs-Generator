// routes/generateDoc.routes.js
import express from "express";
import {
  generateDocControl,
  getGeneratedDocs,
  getGeneratedDocById,
  exportPdf,
  deleteGeneratedDoc,
} from "../controllers/generateDoc.controller.js";
import  protect  from "../middlewares/auth.middleware.js";

const docsRouter = express.Router();

docsRouter.post("/", protect, generateDocControl);
docsRouter.get("/", protect, getGeneratedDocs);
docsRouter.get("/:id", protect, getGeneratedDocById);
docsRouter.get("/:id/pdf", protect, exportPdf);
docsRouter.delete("/:id", protect, deleteGeneratedDoc);

export default docsRouter;