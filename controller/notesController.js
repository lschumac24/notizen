import {notesStore} from '../services/notesStore'
import {loadAndAdjustConfigFromSession} from './config'

export class NotesController {

    displayNotes(req, res) {
        const config = loadAndAdjustConfigFromSession(req, res);
        notesStore.all(config, (err, notes) => {
            res.render("notes", {'config': config, layout: 'layout', 'notes': notes});
        });
    }

    createNote(req, res) {
        const config = loadAndAdjustConfigFromSession(req, res);
        res.render("createNote", {'config': config, layout: 'layout'});
    }

    createNotePost(req, res) {
        req.body.createDate = Date.now();
        notesStore.add(req.body, (err, note) => {
            res.redirect('/');
        });
    }

    editNote(req, res) {
        const config = loadAndAdjustConfigFromSession(req, res);
        const _id = req.params.id;

        notesStore.getNoteToEdit(_id, (err, note) => {
            res.render("editNote", {'config': config, layout: 'layout', 'note': note});
        });
    };

    updateNote(req, res) {
        const _id = req.params.id;

        notesStore.updateNote(_id, req.body, (err, note) => {
            res.redirect('/');
        });
    };

}

export const notesController = new NotesController();