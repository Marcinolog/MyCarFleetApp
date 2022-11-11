const express = require('express');
const {privateUseRecord} = require("../records/privateUseRecord");


const privateUseRouter = express.Router();

privateUseRouter
    .get('/', (req, res) => {
        res.redirect('./html/private-use.html')
    })

    .post('/', async (req, res) => {
        const {surname, carId, dateOfBorrow, dateOfReturn} = req.body

        const privateUse = new privateUseRecord({
            ...req.body,
            surname,
            carId,
            dateOfBorrow,
            dateOfReturn,
        });

        await privateUse.insert();
    })


module.exports = {
    privateUseRouter,
}