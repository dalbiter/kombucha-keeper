const db = require("../db");
const ExpressError = require("../expressError");

class SugarSource {
    constructor(id, sugar_type) {
        this.id = id;
        this.sugar_type = sugar_type;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, sugar_type
            FROM sugar_sources`
            );
        const sugarSources = results.rows.map(s => new SugarSource(
            s.id, s.sugar_type
        ))
        return sugarSources;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, sugar_type
            FROM sugar_sources
            WHERE id = $1`,
            [id]    
            )
            const s = results.rows[0];
            if(!s){
                throw new ExpressError(404, "Sugar source not found")
            }
            return new SugarSource(s.id, s.sugar_type)
    }
};

module.exports = SugarSource;