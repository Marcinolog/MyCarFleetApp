const express = require('express');

const reportDamageRouter = express.Router();

reportDamageRouter
    .get('/', (req, res) => {
        res.redirect('./html/report-damage.html')
    })


module.exports = {
    reportDamageRouter,
}