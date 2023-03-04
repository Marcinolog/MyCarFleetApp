import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";


type PrivateUseRecordResults = [PrivateUseRecord[], FieldPacket[]]

export class PrivateUseRecord {
    id:string
    surname: string
    carPlateNumber: string
    dateOfBorrow: Date
    dateOfReturn: Date

    constructor(obj:PrivateUseRecord) {
        const {id, surname, carPlateNumber, dateOfBorrow, dateOfReturn} = obj;

        this.id = id ?? uuid();
        this.surname = surname;
        this.carPlateNumber = carPlateNumber;
        this.dateOfBorrow = dateOfBorrow;
        this.dateOfReturn = dateOfReturn;
    }

    async insert(): Promise<void> {
        await pool.execute("INSERT INTO `private-use`(`id`, `surname`, `carPlateNumber`, `dateOfBorrow`, `dateOfReturn`) VALUES (:id, :surname, :carPlateNumber, :dateOfBorrow, :dateOfReturn)", {
            id: this.id ?? uuid(),
            surname: this.surname,
            carPlateNumber: this.carPlateNumber,
            dateOfBorrow: this.dateOfBorrow,
            dateOfReturn: this.dateOfReturn
        });
    };

    static async listAll(): Promise <PrivateUseRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `private-use`") as PrivateUseRecordResults;
        return results.map((obj: PrivateUseRecord) => new PrivateUseRecord(obj));
    };
};
