import {Router} from "express";
import {DelegationRecord} from "../records/delegation.record";


export const delegationsRouter = Router();

delegationsRouter
    .get('/all-delegations', async (req, res) => {
        res.json(await DelegationRecord.listAll());
    })

    .post('/add-delegation', async (req, res) => {
        const {serviceLocation, servicers, carPlateNumber,} = req.body

        const delegation = new DelegationRecord({
            ...req.body,
            serviceLocation,
            servicers,
            carPlateNumber,
        });

        await delegation.insert();
    });


// import express from "express";
// import {DelegationRecord} from "../records/delegation.record";
//
//
// export const delegationsRouter = express.Router();
//
// delegationsRouter
//     .get('/all-delegations', async (req, res) => {
//         res.json(await DelegationRecord.listAll());
//     })
//
//     .post('/add-delegation', async (req, res) => {
//         const {serviceLocation, servicers, carPlateNumber, dateOfStart, dateOfEnd} = req.body
//
//         const delegation = new DelegationRecord({
//             ...req.body,
//             serviceLocation,
//             servicers,
//             carPlateNumber,
//             dateOfStart,
//             dateOfEnd,
//         });
//
//         await delegation.insert();
//     });