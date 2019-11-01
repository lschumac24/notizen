import {notesStore} from '../services/notesStore'
import {configurator} from './config'

export class NotesController {
    displayNotes(req, res) {
        const config = configurator.configure(req, res);
        res.render("notes", {'notes': document, 'config': config});
    }

    createNote(req, res) {
        res.render("createNote");
    }
}

export const notesController = new NotesController();