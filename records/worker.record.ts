const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");

export class WorkerRecord {
    id: string
    name: string
    surname: string

    constructor(obj:WorkerRecord) {
        const {id, name, surname} = obj;

        this.id = id ?? uuid();
        this.name = name;
        this.surname = surname;
    }

    static async listAll(): Promise<WorkerRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `workers`");
        return results.map((obj: WorkerRecord) => new WorkerRecord(obj))
    }

}