const express = require('express');
const bodyParser = require("body-parser");

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/books');
const bookRouter = require('./routes/books');
const app = express();
app.use(loggerMiddleware);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");



app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/api/books', bookApiRouter);

app.use('/public', express.static(__dirname+"/public"));


app.use(errorMiddleware);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
