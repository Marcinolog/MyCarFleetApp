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
