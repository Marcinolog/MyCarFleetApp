const express = require ('express');
const {carInfoRouter} = require("./routers/car-info");
const {delegationsRouter} = require("./routers/delegations");
const {privateUseRouter} = require("./routers/private-use");
const {reportDamageRouter} = require("./routers/report-damage");
const path = require("path");
const cors = require('cors');


const app = express();

app.use(express.urlencoded( {
    extended: true,
}));
app.use(express.json());
app.use(cors());

app.use('/cars', carInfoRouter);
app.use('/delegations', delegationsRouter);
app.use('/private-uses', privateUseRouter);
app.use('/damages', reportDamageRouter);


app.listen(3001, '0.0.0.0')
console.log('http://localhost:3001/')


