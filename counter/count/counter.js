const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

const client = redis.createClient( {url: REDIS_URL} );

(async () => {
  await client.connect();
})();


const app = express();


app.get('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;
  try {
    const cnt = await client.incr(bookId);
    return res.json({cnt});
  } catch (e) {
    console.log(e);
    return res.statusCode(500).json({ errcode: 500, errmsg: "ошибка redis"})
  }
});

app.get('/counter/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const cnt = await client.get(bookId);
    return res.json({cnt});
  } catch (e) {
    console.log(e);
    return res.statusCode(500).json({ errcode: 500, errmsg: "ошибка redis"})
  }

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
