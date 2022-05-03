const express = require('express');

const app = express.Router();


app.post('/login/:id/:mail', (req, res) => {
    const {id, mail} = req.params;
    res.status(201);
    res.json({id, mail});
});

module.exports = app;
