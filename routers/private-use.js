const express = require('express');
const {privateUseRecord} = require("../records/privateUseRecord");
const path = require("path");


const privateUseRouter = express.Router();

privateUseRouter
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'private-use.html'))
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

    .get('/', async (req, res) => {
        res.json(await privateUseRecord.listAll())
    })


module.exports = {
    privateUseRouter,
}