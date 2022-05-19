const express = require('express');
const uidGenerator = require('node-unique-id-generator');
const router = express.Router();
const {Book} = require('../Models');
const request = require('request');

const lib = {
    book: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`title ${el}`, `desc ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `/public/img/${el}.png`);

    lib.book.push(newBook);
});



router.get('/', (req, res) => {
    const {book} = lib;
    return res.render("books/index", {
        title: "Books",
        books: book,
    });
});

router.get('/create', (req, res) => {
    return res.render("books/create", {
        title: "Books | create",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {book} = lib;
    const {title, description, authors, favorite} = req.body;
    const newBook = new Book(title, description, authors, favorite);
    book.push(newBook);

    return res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {book} = lib;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    request.get({
      headers: {'content-type': 'application/json'},
      url: `http://localhost:80/counter/${id}/incr`,
    })
    setTimeout(() => {
      request.get({
      headers: {'content-type': 'application/json'},
      url: `http://localhost:80/counter/${id}`,
      json: true,

    }, (err, data, body) => {
        if (!err) {
          cnt = JSON.stringify(data.body.cnt).match(/\d+/);
          if (idx !== -1) {
              return res.render("books/view", {
                  title: "Book | view",
                  book: book[idx],
                  res: cnt,
              });
          } else {
              return res.status(404).redirect('/404');
          }
        }
    })}, 1500);

});

router.get('/update/:id', (req, res) => {
    const {book} = lib;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        return res.render("books/update", {
            title: "Book | view",
            book: book[idx],
        });
    } else {
        return res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
  const {book} = lib;
  const {id} = req.params;
  const {title, description, authors, favorite} = req.body;
  const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite
        };
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {book} = lib;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});



module.exports = router;
