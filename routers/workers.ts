import {Router} from "express";
import {WorkerRecord} from "../records/worker.record";

export const workersRouter = Router()

workersRouter
    .get('/workers', async (req, res) => {
        res.json(await WorkerRecord.listAll())
    });