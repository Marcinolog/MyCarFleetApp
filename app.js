const express = require ('express');
const {mainRouter} = require("./routers/main");
const {carInfoRouter} = require("./routers/car-info");
const {delegationsRouter} = require("./routers/delegations");
const {privateUseRouter} = require("./routers/private-use");
const {reportDamageRouter} = require("./routers/report-damage");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded( {       //pozwala odczytać tradycyjny formularz przesłany z fronta i używa się go tylko wtedy kiedy mamy właśnie taki zwykły formularz ze strony (<form>)
    extended: true,                         //kiedy używamy urlencode, trzeba ustawić extended:true żeby node sobie odczytywał wszystko taj jak powinien
}));

app.use('/', mainRouter);
app.use('/car-info', carInfoRouter);
app.use('/delegations', delegationsRouter);
app.use('/private-use', privateUseRouter);
app.use('/report-damage', reportDamageRouter);

app.listen(3000, 'localhost')
console.log('http://localhost:3000/')


