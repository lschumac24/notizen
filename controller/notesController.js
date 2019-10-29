
export class NotesController {
    index(req,res) {
        res.render('notes');
    }
}

export const notesController = new NotesController();