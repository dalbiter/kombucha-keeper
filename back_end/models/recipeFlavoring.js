const db = require("../db");
const ExpressError = require("../expressError");

class RecipeFlavoring {
    constructor(id, recipe_id, flavoring_id) {
        this.id = id;
        this.recipe_id = recipe_id;
        this.flavoring_id = flavoring_id;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, recipe_id, flavoring_id
            FROM recipes_flavorings`
            );
        const flavorings = results.rows.map(rf => new RecipeFlavoring(
            rf.id, rf.recipe_id, rf.flavoring_id
        ))
        return flavorings;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, recipe_id, flavoring_id
            FROM recipes_flavorings
            WHERE id = $1`,
            [id]    
            )
            const rf = results.rows[0];
            if(!rf){
                throw new ExpressError(404, "Recipe Flavoring not found")
            }
            return new RecipeFlavoring(rf.id, rf.recipe_id, rf.flavoring_id)
    }
};

module.exports = RecipeFlavoring;