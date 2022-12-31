const express = require('express');
const {reportDamageRecord} = require("../records/reportDamageRecord");
const path = require("path");


const reportDamageRouter = express.Router();

reportDamageRouter
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'report-damage.html'))
    })

    .get('/damages', async (req, res) => {
        res.json(await reportDamageRecord.listAll())
    })

    .post('/', async (req, res) => {
        const {damageDescription, dateOfIncident, placeOfIncident, driverSurname, carId} = req.body

        const reportDamage = new reportDamageRecord({
            ...req.body,
            damageDescription,
            dateOfIncident,
            placeOfIncident,
            driverSurname,
            carId,
        });

        await reportDamage.insert();
    });

module.exports = {
    reportDamageRouter,
}