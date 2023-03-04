import {Router} from "express";
import {PrivateUseRecord} from "../records/private.use.record"



export const privateUseRouter = Router();

privateUseRouter
    .get('/all-private-use', async (req, res) => {
        res.json(await PrivateUseRecord.listAll())
    })

    .post('/add-private-use', async (req, res) => {
        const {surname, carPlateNumber, dateOfBorrow, dateOfReturn} = req.body

        const privateUse = new PrivateUseRecord({
            ...req.body,
            surname,
            carPlateNumber,
            dateOfBorrow,
            dateOfReturn,
        });

        await privateUse.insert();
    });
