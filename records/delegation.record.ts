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

        if (!serviceLocation) {
            throw new Error("Service location was not entered on form")
        } else if (serviceLocation.length <3 || serviceLocation.length > 40) {
            throw new Error("Service location name should have 3 to 40 characters")
        }
        if (!servicers) {
            throw new Error("Servicers where not entered on form")
        } else if (servicers.length <3 || servicers.length > 20) {
            throw new Error("Servicers surname should have 3 to 20 characters")
        }
        if (!carPlateNumber) {
            throw new Error("Car plate number was not entered on form")
        } else if (carPlateNumber.length <5 || carPlateNumber.length >7) {
            throw new Error("Car plate number should have 5 to 7 characters")
        }
        if (!dateOfStart) {
            throw new Error("Date of service start was not entered on form")
        }
        if (!dateOfEnd) {
            throw new Error("Date of service end was not entered on form")
        }

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

