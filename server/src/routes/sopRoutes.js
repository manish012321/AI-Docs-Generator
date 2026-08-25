import express from 'express'
import { deleteSop, exportPdf, getSops, sopControl } from '../controllers/sopController.js';
import protect from '../middlewares/auth.middleware.js';

const sopRouter = express.Router();
sopRouter.post('/',protect,sopControl);
sopRouter.get('/:id/export/pdf', protect, exportPdf);
sopRouter.get('/', protect, getSops);
sopRouter.delete('/:id', protect, deleteSop);

export default sopRouter;