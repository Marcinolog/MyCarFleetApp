const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");


export class CarRecord {
    id: string
    plateNumber: string
    brand: string
    model: string
    engine: string
    productionYear: Date

    constructor(obj: CarRecord) {
        const {id, plateNumber, brand, model, engine, productionYear} = obj;
        this.id = id ?? uuid();
        this.plateNumber = plateNumber;
        this.brand = brand;
        this.model = model;
        this.engine = engine;
        this.productionYear = productionYear;
    }

    async insert(): Promise<void> {
        await pool.execute("INSERT INTO `cars`(`id`, `plateNumber`, `brand`, `model`, `engine`, `productionYear`) VALUES (:id, :plateNumber, :brand, :model, :engine, :productionYear)", {
            id: this.id,
            plateNumber: this.plateNumber,
            brand: this.brand,
            model: this.model,
            engine: this.engine,
            productionYear: this.productionYear
        });
    };

    static async listAll(): Promise<CarRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `cars`");
        return results.map((obj: CarRecord) => new CarRecord(obj))
    }
};