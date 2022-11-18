const express = require('express');
const {reportDamageRecord} = require("../records/reportDamageRecord");


const reportDamageRouter = express.Router();

reportDamageRouter
    .get('/', (req, res) => {
        res.redirect('./html/report-damage.html')
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
    })

    .get('/damages', async (req, res) => {
        res.json(await reportDamageRecord.listAll())
    })




module.exports = {
    reportDamageRouter,
}