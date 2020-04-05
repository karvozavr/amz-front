const express = require('express');
const cors = require('cors');
const path = require('path');


const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "public, max-age=600")
    next();
});

app.use(express.static('./dist'));

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use('/static', express.static(__dirname + '/dist/static'));

app.listen(PORT, function () {
    console.debug(`app listen port ${PORT}`);
});