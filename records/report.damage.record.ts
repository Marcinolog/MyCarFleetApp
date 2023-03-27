import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";


type ReportDamageRecordResults = [ReportDamageRecord[], FieldPacket[]]

export class ReportDamageRecord {
    id: string
    damageDescription: string
    dateOfIncident: Date
    placeOfIncident: string
    carPlateNumber: string
    driversSurname: string

    constructor(obj: ReportDamageRecord) {
        const {id, damageDescription, dateOfIncident, placeOfIncident, carPlateNumber, driversSurname} = obj;

        if (!damageDescription){
            throw new Error("Damage description was not entered on form")
        } else if (damageDescription.length <20 || damageDescription.length >500){
            throw new Error("Damage description should have 20 to 500 characters")
        }
        if (!dateOfIncident){
            throw new Error("Date of incident was not entered on form")
        }
        if (!placeOfIncident){
            throw new Error("Place of the incident was not entered on form")
        } else if (placeOfIncident.length <20 || placeOfIncident.length > 200) {
            throw new Error("Place of the incident should have 20 to 200 characters")
        }
        if (!carPlateNumber) {
            throw new Error("Car plate number was not entered on form")
        } else if (carPlateNumber.length <5 || carPlateNumber.length >7) {
            throw new Error("Car plate number should have 5 to 7 characters")
        }
        if (!driversSurname) {
            throw new Error("Surname of person borrowing car was not entered on form")
        } else if (driversSurname.length <3 || driversSurname.length >20) {
            throw new Error("Surname of person borrowing car should have 3 to 20 characters")
        }

        this.id = id ?? uuid();
        this.damageDescription = damageDescription;
        this.dateOfIncident = dateOfIncident;
        this.placeOfIncident = placeOfIncident;
        this.carPlateNumber = carPlateNumber;
        this.driversSurname = driversSurname;
    }

    async insert(): Promise<void> {
        pool.execute("INSERT INTO `damages`(`id`, `damageDescription`, `dateOfIncident`, `placeOfIncident`, `carPlateNumber`, `driversSurname`) VALUES(:id, :damageDescription, :dateOfIncident, :placeOfIncident, :carPlateNumber, :driversSurname)", {
            id: this.id ?? uuid(),
            damageDescription: this.damageDescription,
            dateOfIncident: this.dateOfIncident,
            placeOfIncident: this.placeOfIncident,
            carPlateNumber: this.carPlateNumber,
            driversSurname: this.driversSurname,
        })
    }

    static async listAll(): Promise<ReportDamageRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `damages`") as ReportDamageRecordResults;
        return results.map((obj: ReportDamageRecord) => new ReportDamageRecord(obj))
    };
};
