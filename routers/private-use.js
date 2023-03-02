const express = require('express');
const {privateUseRecord} = require("../records/privateUseRecord");
const path = require("path");


const privateUseRouter = express.Router();

privateUseRouter
    .get('/all-private-use', async (req, res) => {
        res.json(await privateUseRecord.listAll())
    })

    .post('/add-private-use', async (req, res) => {
        const {surname, carPlateNumber, dateOfBorrow, dateOfReturn} = req.body

        const privateUse = new privateUseRecord({
            ...req.body,
            surname,
            carPlateNumber,
            dateOfBorrow,
            dateOfReturn,
        });

        await privateUse.insert();
    });

module.exports = {
    privateUseRouter,
}