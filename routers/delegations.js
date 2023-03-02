const express = require('express');
const {delegationRecord} = require("../records/delegationRecord");
const path = require("path");

const delegationsRouter = express.Router();

delegationsRouter
    .get('/all-delegations', async (req, res) => {
        res.json(await delegationRecord.listAll());
    })

    .post('/add-delegation', async (req, res) => {
        const {serviceLocation, servicers, carPlateNumber, dateOfStart, dateOfEnd} = req.body

        const delegation = new delegationRecord({
            ...req.body,
            serviceLocation,
            servicers,
            carPlateNumber,
            dateOfStart,
            dateOfEnd,
        });

        await delegation.insert();
    });

module.exports = {
    delegationsRouter,
};