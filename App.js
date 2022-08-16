import NoteAPI from "./NoteApi.js";
import NotesView from "./NotesView.js";

export default class APP {
    constructor (root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NoteAPI.getAllNotes();
        
        this._setNotes(notes);

        if (notes.length > 0){
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
                // console.log(`Note selected: ${noteId}`);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "Escriba el título de la nota",
                    body: "Escriba la nota"
                };

                NoteAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NoteAPI.saveNote({
                    id: this.activeNote.id, title, body
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                NoteAPI.deleteNote(noteId);

                this._refreshNotes();
            },
        };
    }
}