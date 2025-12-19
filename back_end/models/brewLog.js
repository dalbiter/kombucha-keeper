const db = require("../db");
const ExpressError = require("../expressError");

class BrewLog {
    constructor(id, user_id, recipe_id, brewed_on, notes) {
        this.id = id;
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.brewed_on = brewed_on;
        this.notes = notes;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, user_id, recipe_id, brewed_on, notes
            FROM brew_logs`
            );
        const flavorings = results.rows.map(b => new BrewLog(
            b.id, b.user_id, b.recipe_id, b.brewed_on, b.notes
        ))
        return flavorings;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, user_id, recipe_id, brewed_on, notes
            FROM brew_logs
            WHERE id = $1`,
            [id]    
            )
            const b = results.rows[0];
            if(!b){
                throw new ExpressError(404, "Brew log not found")
            }
            return new BrewLog(b.id, b.user_id, b.recipe_id, b.brewed_on, b.notes)
    }
};

module.exports = BrewLog;