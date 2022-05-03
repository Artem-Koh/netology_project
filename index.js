const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
const bodyParser = require("body-parser");
const bookRouter = require('./routes/books');
const userRouter = require('./routes/user');

const app = express();
app.use(bodyParser());
app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));


app.use('/api/user', userRouter);
app.use('/api/books', bookRouter);


app.use(errorMiddleware);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
