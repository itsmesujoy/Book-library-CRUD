const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const db = require('./config/db');
const api = require('./routes/api');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/', api);
console.log("hello")

app.use((err, req, res)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: err.stack,
    })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));