import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';


router.get("/",notesController.index.bind(notesController));

export const notesRoutes = router;