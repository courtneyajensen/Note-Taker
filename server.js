const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./Develop/db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API routes
app.get('/api/notes', (req, res) => {
    res.json(database);
});
app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, database);
    res.json(newNote);
});

function createNote(newNote, notesArray){
    let noteID = 0;

    if(notesArray.length === 0){
        noteID = 1;
    }
    else{
        //gets id of last element in the array and increases it by one for new ID
        noteID = parseInt(notesArray[notesArray.length - 1].id) + 1;
    }

    newNote.id = noteID;

    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return newNote;
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, database);
    res.json(true);
});

function deleteNote(id, notesArray){
    for(let i = 0; i < notesArray.length; i++){
        if(notesArray[i].id == id){
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            return;
        }
    }
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`);
});