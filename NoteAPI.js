export default class NoteAPI {

    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.date) > new Date(b.date) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NoteAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        if (existing){
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.date = new Date().toISOString();
        } else {            
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.date = new Date().toISOString();
            notes.push(noteToSave);
        }


        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }
    
    static deleteNote(id) {
        const notes = NoteAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}