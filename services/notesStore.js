import Datastore from 'nedb-promise'

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }
}

export const notesStore = new NotesStore();