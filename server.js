const express = require('express');
const path = require('path');
const fs = require('fs');
const dbNotes = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/api/notes', (req, res) => {
    fs.readFile('/db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

//Post notes and recieve new notes and dataj
app.post('/api/notes', (req, res) => {
    const data = {
        title: req.body.title,
        text: req.body.text
    };
    console.log(data);
    dbNotes.push(data);
    fs.writeFile('/db/db.json', JSON.stringify(dbNotes), () => {
        res.send('Success!')
    });
});

//Deletes note using specific id
app.delete('/api/notes/:id', (req, res) => {
    const params = req.params.id;
    const deleteArray = dbNotes.filter(arrayContents => arrayContents.id != params);
    console.log(deleteArray);
    fs.writeFile('/db/db.json', JSON.stringify(deleteArray), () => {
        res.send('Deleted successfully!');
    });
});

//Route index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log('Server up and running at ${PORT}!');
});