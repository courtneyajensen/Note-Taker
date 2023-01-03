const express = require('express');
const path = require('path');
const fs = require('fs');
const db_notes = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true

}));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// GET /api/notes db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
//POST /api/notes recieve new note data and console log 
app.post('/api/notes', (req, res) => {
    const data = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    };
    console.log(data);
    db_notes.push(data);
    fs.writeFile('./db/db.json', JSON.stringify(db_notes), () => {
        res.send('Data pushed successfully!');
    });
});
// DELETE using params to delete note with id
app.delete('/api/notes/:id', (req, res) => {
    const params = req.params.id;
    const deleteArr = db_notes.filter(arrayContents => arrayContents.id != params);
    console.log(deleteArr);
    fs.writeFile('./db/db.json', JSON.stringify(deleteArr), () => {
        res.send('Note deleted successfully!');
    });
});
// GET index.html route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}!`);
});
