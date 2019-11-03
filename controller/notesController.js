import {notesStore} from '../services/notesStore'
import {loadAndAdjustConfigFromSession} from './config'
import moment from 'moment';

export class NotesController {

    displayNotes(req, res) {
        const config = loadAndAdjustConfigFromSession(req, res);
        notesStore.all(config, (err, notes) => {
            notes.forEach(function(note, index) {
                note.fromNow = moment(note.dueDate).fromNow();
            });

            res.render("notes", {'config': config, layout: 'layout', 'notes': notes});
        });
    }

    createNote(req, res) {
        const config = loadAndAdjustConfigFromSession(req, res);
        res.render("createNote", {'config': config, layout: 'layout', dueDate: moment().format('YYYY-MM-DD')});
    }

    createNotePost(req, res) {
        req.body.createDate = Date.now();
        req.body.dueDate = moment(req.body.dueDate).add(23, 'hours').add(59, 'minutes').format('YYYY-MM-DD HH:mm');
        if(typeof req.body.done === 'undefined'){
            req.body.done = 'off'
        }
        notesStore.add(req.body, (err, note) => {
            res.redirect('/');
        });
    }

    editNote(req, res) {
        const config = loadAndAdjustConfigFromSession(req, res);
        const _id = req.params.id;

        notesStore.getNoteToEdit(_id, (err, note) => {
            if(note === null){
                res.redirect('/');
                return;
            }
            note.dueDate = moment(note.dueDate).format('YYYY-MM-DD');
            res.render("editNote", {'config': config, layout: 'layout', 'note': note});
        });
    };

    updateNote(req, res) {
        const _id = req.params.id;
        req.body.dueDate = moment(req.body.dueDate).add(23, 'hours').add(59, 'minutes').format('YYYY-MM-DD HH:mm');
        if(typeof req.body.done === 'undefined'){
            req.body.done = 'off'
        }
        notesStore.updateNote(_id, req.body, (err, note) => {
            res.redirect('/');
        });
    };

}

export const notesController = new NotesController();