const express = require('express');
const router = express.Router();
const Book = require('../../Models/Book');


router.get('/', async (req, res) => {
    const book = await Book.find().select('-__v');
    res.json(book);
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json("todo | not found");
    }
});





router.post('/', async (req, res) => {
    const {title, description, authors, favorite} = req.body;
    const {id} = req.params;

    const newBook = new Book({
        title: 'title...',
        description: 'description...',
        authors: 'authors...',
        favorite: 'favorite...'
    });

    try {
        await newBook.save();
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName});
        res.redirect(`/api/books/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

module.exports = router;







/*router.get('/:id/download', (req, res) => {
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

*/
