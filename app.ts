import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import {carsRouter} from "./routers/cars";
import {delegationsRouter} from "./routers/delegations";
import {privateUseRouter} from "./routers/private-use";
import {reportDamageRouter} from "./routers/report-damage";


const app = express();

app.use(express.urlencoded( {
    extended: true,
}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/cars', carsRouter);
app.use('/delegations', delegationsRouter);
app.use('/private-uses', privateUseRouter);
app.use('/damages', reportDamageRouter);


app.listen(3001, '0.0.0.0')
console.log('http://localhost:3001/')


