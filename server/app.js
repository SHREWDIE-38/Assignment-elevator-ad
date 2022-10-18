const express = require('express');
const indexRouter = require('./routes');
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
})