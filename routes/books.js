const express = require('express');
const uidGenerator = require('node-unique-id-generator');

const {Book} = require('../Models');

const fileMiddleware = require('../middleware/file');


const lib = {
    book: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`${el}`, `title ${el}`, `desc ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `/public/img/${el}.png`);

    lib.book.push(newBook);
});

const app = express.Router();


app.get('/', (req, res) => {
    const {book} = lib;
    res.json(book);
});


app.get('/:id', (req, res) => {
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





app.put('/:id', (req, res) => {
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


app.delete('/:id', (req, res) => {
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


app.post('/', fileMiddleware.single('fileBook'), (req, res) => {
    const {book} = lib;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    if (req.file) {
        const {destination} = req.file;
        const {filename} = req.file;
        const newBook = new Book(uidGenerator.generateUniqueId(), title, description, authors, favorite, fileCover, fileName, `/${destination}/${filename}`);
        book.push(newBook);

        res.status(201);
        res.json(newBook);
    } else {
        res.json(null);
    }
});

app.get('/:id/download', (req, res) => {
    const {book} = lib;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(__dirname+`/..${book[idx].fileBook}`, `${book[idx].title.replace(/ /g,'')}.png`, err=>{
            if (err){
                res.status(404).json();
            }
        });
    } else {
        res.status(404);
        res.json("book not found");
    }

});


module.exports = app;
