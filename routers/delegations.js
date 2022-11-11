const express = require('express');
const {delegationRecord} = require("../records/delegationRecord");

const delegationsRouter = express.Router();

delegationsRouter
    .get('/', (req, res) => {
        res.redirect('./html/delegations.html')
    })

    .post('/', async (req, res) => {
        const {serviceLocation, servicers, carId, dateOfStart, dateOfEnd} = req.body

        const delegation = new delegationRecord({
            ...req.body,
            serviceLocation,
            servicers,
            carId,
            dateOfStart,
            dateOfEnd,
        });

        await delegation.insert();
    })


module.exports = {
    delegationsRouter,
};