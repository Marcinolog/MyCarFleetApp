const {pool} = require ("../utils/db");
const {v4 : uuid} = require ("uuid");

const reportDamageRecord =  class reportDamageRecord {
    constructor(obj) {
        const {id, damageDescription, dateOfIncident, placeOfIncident, driverSurname, carId} = obj;

        this.id = id ?? uuid();
        this.damageDescription = damageDescription;
        this.dateOfIncident = dateOfIncident;
        this.placeOfIncident = placeOfIncident;
        this.driverSurname = driverSurname;
        this.carId = carId;
    }

    async insert() {
        pool.execute("INSERT INTO `damages`(`id`, `damageDescription`, `dateOfIncident`, `placeOfIncident`, `driverSurname`, `carId` ) VALUES(:id, :damageDescription, :dateOfIncident, :placeOfIncident, :driverSurname, :carId)", {
            id: this.id,
            damageDescription: this.damageDescription,
            dateOfIncident: this.dateOfIncident,
            placeOfIncident: this.placeOfIncident,
            driverSurname: this.driverSurname,
            carId: this.carId,
        })
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `damages`");

        return results.map(obj => new reportDamageRecord(obj))
    }
};

module.exports = {
    reportDamageRecord,
}