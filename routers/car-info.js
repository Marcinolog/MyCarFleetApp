const express = require('express');
const {carRecord} = require("../records/carRecord");
const path = require("path");

const carInfoRouter = express.Router();

carInfoRouter
    .get('/', async (req, res) => {
        // res.redirect('./html/car-info.html')
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'car-info.html'));

    })

    .get('/cars', async (req, res) => {
        res.json(await carRecord.listAll());
    })

    .post('/', async (req, res) => {
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