import {notesStore} from '../services/notesStore'

export class NotesController {
    displayNotes(req, res) {
        res.render("notes");
    }

    createNote(req, res) {
        res.render("createNote");
    }
}

export const notesController = new NotesController();