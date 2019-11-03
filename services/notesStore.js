import Datastore from 'nedb'

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    add(noteData, callback) {
        this.db.insert(noteData, function(err, note){
            callback(err, note);
        });
    }

    all(config, callback) {
        let filter = config.filter ? { done: false } : null;

        this.db.find(filter).sort(sortOrder(config)).exec(callback);
    }

    getNoteToEdit(_id, callback) {
        this.db.findOne({_id: _id}, function(err, note) {
            callback(err, note);
        });
    }

    updateNote(_id, noteData, callback) {
        this.db.update({_id: _id}, {$set: noteData}, callback);
    };
}

function sortOrder(config) {

    let direction = 1;
    if(config.sortBy.endsWith('_desc')){
        direction = -1;
    }

    let sort = 'dueDate';
    if(       config.sortBy.startsWith('createDate')){
        sort = 'createDate'
    } else if(config.sortBy.startsWith('importance')){
        sort = 'importance'
    }

    return {[sort]: direction};
}

export const notesStore = new NotesStore();