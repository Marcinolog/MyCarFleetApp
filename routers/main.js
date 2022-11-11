const express = require('express');

const mainRouter = express.Router();

mainRouter
    .get('/', (req, res) => {
        res.redirect('./html/main.html')
    });


module.exports = {
    mainRouter,
};