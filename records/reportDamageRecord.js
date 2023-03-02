const {pool} = require ("../utils/db");
const {v4 : uuid} = require ("uuid");

const reportDamageRecord =  class reportDamageRecord {
    constructor(obj) {
        const {id, damageDescription, dateOfIncident, placeOfIncident, carPlateNumber, driversSurname} = obj;

        this.id = id ?? uuid();
        this.damageDescription = damageDescription;
        this.dateOfIncident = dateOfIncident;
        this.placeOfIncident = placeOfIncident;
        this.carPlateNumber = carPlateNumber;
        this.driversSurname = driversSurname;
    }

    async insert() {
        pool.execute("INSERT INTO `damages`(`id`, `damageDescription`, `dateOfIncident`, `placeOfIncident`, `carPlateNumber`, `driversSurname`) VALUES(:id, :damageDescription, :dateOfIncident, :placeOfIncident, :carPlateNumber, :driversSurname)", {
            id: this.id ?? uuid(),
            damageDescription: this.damageDescription,
            dateOfIncident: this.dateOfIncident,
            placeOfIncident: this.placeOfIncident,
            carPlateNumber: this.carPlateNumber,
            driversSurname: this.driversSurname,
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