const db = require("../db");
const ExpressError = require("../expressError");

class Flavoring {
    constructor(id, flavoring_name) {
        this.id = id;
        this.flavoring_name = flavoring_name;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, flavoring_name
            FROM flavorings`
            );
        const flavorings = results.rows.map(f => new Flavoring(
            f.id, f.flavoring_name
        ))
        return flavorings;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, flavoring_name
            FROM flavorings
            WHERE id = $1`,
            [id]    
            )
            const f = results.rows[0];
            if(!f){
                throw new ExpressError(404, "Flavoring not found")
            }
            return new Flavoring(f.id, f.flavoring_name)
    }
};

module.exports = Flavoring;