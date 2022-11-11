const {pool} = require ("../utils/db");
const {v4 : uuid} = require ("uuid");

const privateUseRecord = class PrivateUseRecord {
    constructor(obj) {
        const {id, surname, carId, dateOfBorrow, dateOfReturn} = obj;

        this.id = id ?? uuid();
        this.surname = surname;
        this.carId = carId;
        this.dateOfBorrow = dateOfBorrow;
        this.dateOfReturn = dateOfReturn;
    }

    async insert() {
        await pool.execute("INSERT INTO `private-use`(`id`, `surname`, `carId`, `dateOfBorrow`, `dateOfReturn`) VALUES (:id, :surname, :carId, :dateOfBorrow, :dateOfReturn)", {
            id: this.id,
            surname: this.surname,
            carId: this.carId,
            dateOfBorrow: this.dateOfBorrow,
            dateOfReturn: this.dateOfReturn
        });
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `private-use`");

        return results.map(obj => new PrivateUseRecord(obj));
    }

};

module.exports = {
    privateUseRecord,
}