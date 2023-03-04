import {Router} from "express";
import {ReportDamageRecord} from "../records/report.damage.record";


export const reportDamageRouter = Router();

reportDamageRouter
    .get('/all-damages', async (req, res) => {
        res.json(await ReportDamageRecord.listAll())
    })

    .post('/add-damage', async (req, res) => {
        const {damageDescription, dateOfIncident, placeOfIncident, carPlateNumber, driversSurname} = req.body

        const reportDamage = new ReportDamageRecord({
            ...req.body,
            damageDescription,
            dateOfIncident,
            placeOfIncident,
            carPlateNumber,
            driversSurname,
        });

        await reportDamage.insert();
    });
