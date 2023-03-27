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

        if (!surname) {
                throw new Error("Surname of person borrowing car was not entered on form")
            } else if (surname.length <3 || surname.length >20) {
            throw new Error("Surname of person borrowing car should have 3 to 20 characters")
        }
        if (!carPlateNumber) {
            throw new Error("Car plate number was not entered on form")
        } else if (carPlateNumber.length <5 || carPlateNumber.length >7) {
            throw new Error("Car plate number should have 5 to 7 characters")
        }
        if (!dateOfBorrow) {
            throw new Error("Date of borrow was not entered on form")
        }
        if (!dateOfReturn) {
            throw new Error("Date of return was not entered on form")
        }

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
