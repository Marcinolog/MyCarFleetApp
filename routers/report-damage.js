const express = require('express');
const {reportDamageRecord} = require("../records/reportDamageRecord");


const reportDamageRouter = express.Router();

reportDamageRouter
    .get('/all-damages', async (req, res) => {
        res.json(await reportDamageRecord.listAll())
    })

    .post('/add-damage', async (req, res) => {
        const {damageDescription, dateOfIncident, placeOfIncident, carPlateNumber, driversSurname} = req.body

        const reportDamage = new reportDamageRecord({
            ...req.body,
            damageDescription,
            dateOfIncident,
            placeOfIncident,
            carPlateNumber,
            driversSurname,
        });

        await reportDamage.insert();
    });

module.exports = {
    reportDamageRouter,
}