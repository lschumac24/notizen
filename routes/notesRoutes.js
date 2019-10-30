import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';


router.get("/", notesController.displayNotes.bind(notesController));
router.get("/create", notesController.createNote.bind(notesController));


export const notesRoutes = router;