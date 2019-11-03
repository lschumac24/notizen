import {notesStore} from '../services/notesStore'
import {configurator} from './config'

export class NotesController {

    displayNotes(req, res) {
        const config = configurator.configure(req, res);
        notesStore.all(config, (err, notes) => {
            res.render("notes", {'config': config, layout: 'layout', 'notes': notes});
        });
    }

    createNote(req, res) {
        const config = configurator.configure(req, res);
        res.render("createNote", {'config': config, layout: 'layout'});
    }

    createNotePost(req, res) {
        if (!!req.body.cancel) {
            res.redirect('/');
            return;
        }
        req.body.createdOnDate = Date.now();
        notesStore.add(req.body, (err, note) => {
            res.redirect('/');
        });
    }

    editNote(req, res) {
        const config = configurator.configure(req, res);
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

    toggleStyle(req, res) {
        configurator.toggleStyle(req, res);
        res.redirect('/');
    }

}

export const notesController = new NotesController();