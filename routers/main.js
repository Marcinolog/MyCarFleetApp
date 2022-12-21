const express = require('express');
const path = require("path");

const mainRouter = express.Router();

mainRouter
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'main.html'))
    });



module.exports = {
    mainRouter,
};