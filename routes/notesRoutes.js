import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';

router.get("/",         notesController.displayNotes.bind(  notesController));
router.get("/create",   notesController.createNote.bind(    notesController));
router.post("/create",  notesController.createNotePost.bind(notesController));
router.get("/:id",      notesController.editNote.bind(      notesController));
router.post("/:id",     notesController.updateNote.bind(    notesController));
router.post("/config/set/toggleStyle", notesController.toggleStyle.bind(    notesController));
export const notesRoutes = router;