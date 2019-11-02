import Datastore from 'nedb'

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    add(noteData, callback) {
        console.log("  publicCreateNote start");
        this.db.insert(noteData, function(err, newDoc){
            console.log("    insert");
            if(callback){
                callback(err, newDoc);
            }
        });
        console.log("  publicCreateNote end");
    }

    all(config, callback) {
        //let findQuery = {};
        console.log("  publicAll start");
        this.db.find({}, function(err, notes) {
            console.log("  publicAll start");

            callback(err, notes);
        });
        console.log("  publicAll start");
    }

    getNoteToEdit(_id, callback) {
        console.log("  publicGetNoteToEdit start");
        this.db.findOne({_id: _id}, function(err, note) {
            console.log("  publicAll start");

            callback(err, note);
        });
        console.log("  publicGetNoteToEdit end");
    }

    updateNote(_id, noteData, callback) {
        console.log("  publicUpdateNote start");
        this.db.update({_id: _id}, noteData, function(err, note) {
            console.log("  publicAll start");

            callback(err, note);
        });
        console.log("  publicUpdateNote end");
    }
}

export const notesStore = new NotesStore();