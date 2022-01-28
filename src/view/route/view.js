const express = require('express');
const router = express.Router();
const path = require('path');
const dirHtml = __dirname + '/../html'
const dirCss = __dirname + '/../css'

router.get('/', function(req, res) {
        res.sendFile(path.resolve(dirHtml + '/home.html'));
});

module.exports = router