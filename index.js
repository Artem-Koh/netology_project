const express = require('express');
const uidGenerator = require('node-unique-id-generator');
const formData = require("express-form-data");

const {Book} = require('./Models');
const lib = {
    book: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`${el}`, `title ${el}`, `desc ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`);

    lib.book.push(newBook);
});


const app = express();
app.use(formData.parse());

app.post('/api/user/login/:id/:mail', (req, res) => {
    const {id, mail} = req.params;
    res.status(201);
    res.json({id, mail});
});


app.get('/api/books/', (req, res) => {
    const {book} = lib;
    res.json(book);
});


app.get('/api/books/:id', (req, res) => {
    const {book} = lib;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book not found");
    }
});


app.post('/api/books/', (req, res) => {
    const {book} = lib;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(uidGenerator.generateUniqueId(), title, description, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});


app.put('/api/books/:id', (req, res) => {
    const {book} = lib;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        };
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book not found");
    }
});


app.delete('/api/books/:id', (req, res) => {
    const {book} = lib;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json("OK");
    } else {
        res.status(404);
        res.json("book not found");
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
