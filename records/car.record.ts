const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");


export class CarRecord {
    id: string
    plateNumber: string
    brand: string
    model: string
    engine: string
    productionYear: number

    constructor(obj: CarRecord) {
        const {id, plateNumber, brand, model, engine, productionYear} = obj;
        const productionYearToString = productionYear.toString()

        if (!plateNumber) {
            throw new Error("Plate number was not entered on the form")
        } else if (plateNumber.length <5 || plateNumber.length > 7){
            throw new Error("Plate number should have 5 to 7 characters")
        }
        if (!brand) {
            throw new Error("Car brand was not entered on the form")
        } else if (brand.length <3 || brand.length > 15) {
            throw new Error("Brand name should have 3 to 15 characters")
        }
        if (!model) {
            throw new Error('Car model was not entered on the form')
        } else if (model.length <2 || model.length > 25) {
            throw new Error("Model name should have 2 to 25 characters ")
        }
        if (!engine) {
            throw new Error("Engine was not entered on the form")
        }
        if (!productionYear) {
            throw new Error("Production year was not entered on the form")
        } else if (isNaN(productionYear)) {
            throw new Error("Production year have to be a number")
        } else if (productionYearToString.length !== 4) {
            throw new Error("The year of production must consist of four numbers")
        }


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