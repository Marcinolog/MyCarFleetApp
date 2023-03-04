import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";


type DelegationRecordResults = [DelegationRecord[], FieldPacket[]]

 export class DelegationRecord {
    id: string
    serviceLocation: string
    servicers: string
    carPlateNumber: string
    dateOfStart: Date
    dateOfEnd: Date

    constructor(obj: DelegationRecord) {
        const {id, serviceLocation, servicers, carPlateNumber, dateOfStart, dateOfEnd} = obj;
        this.id = id ?? uuid();
        this.serviceLocation = serviceLocation;
        this.servicers = servicers;
        this.carPlateNumber = carPlateNumber;
        this.dateOfStart = dateOfStart;
        this.dateOfEnd = dateOfEnd;
    };

    async insert(): Promise<void> {
        await pool.execute("INSERT INTO `delegations`(`id`, `serviceLocation`, `servicers`, `carPlateNumber`, `dateOfStart`, `dateOfEnd`) VALUES (:id, :serviceLocation, :servicers, :carPlateNumber, :dateOfStart, :dateOfEnd)", {
            id: this.id,
            serviceLocation: this.serviceLocation,
            servicers: this.servicers,
            carPlateNumber: this.carPlateNumber,
            dateOfStart: this.dateOfStart,
            dateOfEnd: this.dateOfEnd
        });
    };

    static async listAll(): Promise<DelegationRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `delegations`") as DelegationRecordResults;
        return results.map((obj: DelegationRecord) => new DelegationRecord(obj));
    };
};

