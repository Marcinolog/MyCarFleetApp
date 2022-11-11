const {pool} = require ("../utils/db");
const {v4 : uuid} = require ("uuid");

const delegationRecord = class DelegationRecord {
    constructor(obj) {
        const {id, serviceLocation, servicers, carId, dateOfStart, dateOfEnd} = obj;

        this.id =id ?? uuid();
        this.serviceLocation = serviceLocation;
        this.servicers = servicers;
        this.carId = carId;
        this.dateOfStart = dateOfStart;
        this.dateOfEnd = dateOfEnd;
    }

    async insert() {
        await pool.execute("INSERT INTO `delegations`(`id`, `serviceLocation`, `servicers`, `carId`, `dateOfStart`, `dateOfEnd`) VALUES (:id, :serviceLocation, :servicers, :carId, :dateOfStart, :dateOfEnd)", {
            id: this.id,
            serviceLocation: this.serviceLocation,
            servicers: this.servicers,
            carId: this.carId,
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