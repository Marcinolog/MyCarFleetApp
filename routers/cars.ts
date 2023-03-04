import {Router} from "express";
import {CarRecord} from "../records/car.record";


export const carsRouter = Router();

carsRouter
    .get('/all-cars', async (req, res) => {
        res.json(await CarRecord.listAll());
    })

    .post('/add-car', async (req, res) => {
        const {plateNumber, brand, model, engine, productionYear} = req.body

        const car = new CarRecord({
            ...req.body,
            plateNumber,
            brand,
            model,
            engine,
            productionYear,
        });

        await car.insert();
    });
