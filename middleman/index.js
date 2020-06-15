var express = require('express');
var app = express();
const http = require('http');

app.get('/', async function (req, res) {
    console.log('request')
    await http.get('http://192.168.137.177/', { mode: 'no-cors' });
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});