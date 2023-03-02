const {pool} = require ("../utils/db");
const {v4 : uuid} = require ("uuid");

const delegationRecord = class DelegationRecord {
    constructor(obj) {
        const {id, serviceLocation, servicers, carPlateNumber, dateOfStart, dateOfEnd} = obj;

        this.id = id ?? uuid();
        this.serviceLocation = serviceLocation;
        this.servicers = servicers;
        this.carPlateNumber = carPlateNumber;
        this.dateOfStart = dateOfStart;
        this.dateOfEnd = dateOfEnd;
    }

    async insert() {
        await pool.execute("INSERT INTO `delegations`(`id`, `serviceLocation`, `servicers`, `carPlateNumber`, `dateOfStart`, `dateOfEnd`) VALUES (:id, :serviceLocation, :servicers, :carPlateNumber, :dateOfStart, :dateOfEnd)", {
            id: this.id,
            serviceLocation: this.serviceLocation,
            servicers: this.servicers,
            carPlateNumber: this.carPlateNumber,
            dateOfStart: this.dateOfStart,
            dateOfEnd: this.dateOfEnd
        });
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `delegations`");

        return results.map(obj => new DelegationRecord(obj));
    }

};


module.exports = {
    delegationRecord,
}