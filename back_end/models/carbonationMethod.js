const db = require("../db");
const ExpressError = require("../expressError");

class CarbonationMethod {
    constructor(id, method_name) {
        this.id = id;
        this.method_name = method_name;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, method_name
            FROM carbonation_methods`
            );
        const carbonationMethods = results.rows.map(c => new CarbonationMethod(
            c.id, c.method_name
        ))
        return carbonationMethods;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, method_name
            FROM carbonation_methods
            WHERE id = $1`,
            [id]    
            )
            const c = results.rows[0];
            if(!c){
                throw new ExpressError(404, "Carbonation method not found")
            }
            return new CarbonationMethod(c.id, c.method_name)
    }
};

module.exports = CarbonationMethod;