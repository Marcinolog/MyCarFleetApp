const express = require('express');
const {carRecord} = require("../records/carRecord");
const path = require("path");

const carInfoRouter = express.Router();

carInfoRouter
    .get('/all-cars', async (req, res) => {
        res.json(await carRecord.listAll());
    })

    .post('/add-car', async (req, res) => {
        const {plateNumber, brand, model, engine, productionYear} = req.body

        const car = new carRecord({
            ...req.body,
            plateNumber,
            brand,
            model,
            engine,
            productionYear,
        });

        await car.insert();
    });

module.exports = {
    carInfoRouter,
}