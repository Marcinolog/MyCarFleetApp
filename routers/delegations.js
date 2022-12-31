const express = require('express');
const {delegationRecord} = require("../records/delegationRecord");
const path = require("path");

const delegationsRouter = express.Router();

delegationsRouter
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'delegations.html'));
    })

    .get('/all-delegations', async (req, res) => {
        res.json(await delegationRecord.listAll());
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
    });

module.exports = {
    delegationsRouter,
};