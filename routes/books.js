const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');
const request = require('request');



router.get('/', async (req, res) => {
    const book = await Book.find();
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

router.post('/create', async (req, res) => {
    const {title, description, authors, favorite} = req.body;

    const newBook = new Book({
      title, description, authors, favorite
    });

    try {
        await newBook.save();
        res.redirect('/books');
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("books/view", {
        title: "Book | view",
        book: book,
        //res: cnt,
    });

    /*const idx = book.findIndex(el => el.id === id);
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
*/
});

router.get('/update/:id', async (req, res) => {
  const {id} = req.params;
  let book;
  try {
      book = await Book.findById(id);
  } catch (e) {
      console.error(e);
      res.status(404).redirect('/404');
  }

  res.render("books/update", {
      title: "Book | update",
      book: book,
      //res: cnt,
  });
});

router.post('/update/:id', async (req, res) => {
  const {id} = req.params;
  const {title, description, authors, favorite} = req.body;

  try {
      await Book.findByIdAndUpdate(id, {title, description, authors, favorite});
  } catch (e) {
      console.error(e);
      res.status(404).redirect('/404');
  }

  res.redirect(`/books/${id}`);
});

router.post('/delete/:id', async (req, res) => {
  const {id} = req.params;

  try {
      await Book.deleteOne({_id: id});
  } catch (e) {
      console.error(e);
      res.status(404).redirect('/404');
  }

  res.redirect(`/books`);

});



module.exports = router;
