const db = require("../db");
const ExpressError = require("../expressError");

class Recipe {
    constructor(id, 
        recipe_name, 
        brew_type, 
        tea_type, 
        tea_type_qty, 
        sugar_source, 
        sugar_source_qty, 
        starter_qty, 
        batch_size, 
        avg_ferment_temp, 
        primary_ferment_days,
        primary_ferment_notes,
        secondary_ferment_days,
        secondary_ferment_notes,
        carbonation_method_id,
        steps,
        recipe_notes,
        rating,
        created_at) {
        this.id = id;
        this.recipe_name = recipe_name;
        this.brew_type = brew_type;
        this.tea_type = tea_type;
        this.tea_type_qty = tea_type_qty;
        this.sugar_source = sugar_source;
        this.sugar_source_qty = sugar_source_qty;
        this.starter_qty = starter_qty;
        this.batch_size = batch_size;
        this.avg_ferment_temp = avg_ferment_temp;
        this.primary_ferment_days = primary_ferment_days;
        this.primary_ferment_notes = primary_ferment_notes;
        this.secondary_ferment_days = secondary_ferment_days;
        this.secondary_ferment_notes = secondary_ferment_notes;
        this.carbonation_method_id = carbonation_method_id;
        this.steps = steps;
        this.recipe_notes = recipe_notes;
        this.rating = rating;
        this.created_at = created_at;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, 
            recipe_name, 
            brew_type, 
            tea_type, 
            tea_type_qty, 
            sugar_source, 
            sugar_source_qty, 
            starter_qty, 
            batch_size, 
            avg_ferment_temp, 
            primary_ferment_days,
            primary_ferment_notes,
            secondary_ferment_days,
            secondary_ferment_notes,
            carbonation_method_id,
            steps,
            recipe_notes,
            rating,
            created_at
            FROM recipes`
            );
        const recipes = results.rows.map(r => new Recipe(
            r.id, 
            r.recipe_name, 
            r.brew_type, 
            r.tea_type, 
            r.tea_type_qty, 
            r.sugar_source, 
            r.sugar_source_qty, 
            r.starter_qty, 
            r.batch_size, 
            r.avg_ferment_temp, 
            r.primary_ferment_days,
            r.primary_ferment_notes,
            r.secondary_ferment_days,
            r.secondary_ferment_notes,
            r.carbonation_method_id,
            r.steps,
            r.recipe_notes,
            r.rating,
            r.created_at
        ))
        return recipes;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, 
            recipe_name, 
            brew_type, 
            tea_type, 
            tea_type_qty, 
            sugar_source, 
            sugar_source_qty, 
            starter_qty, 
            batch_size, 
            avg_ferment_temp, 
            primary_ferment_days,
            primary_ferment_notes,
            secondary_ferment_days,
            secondary_ferment_notes,
            carbonation_method_id,
            steps,
            recipe_notes,
            rating,
            created_at
            FROM recipes
            WHERE id = $1`,
            [id]    
            )
            const r = results.rows[0];
            if(!r){
                throw new ExpressError(404, "Recipe not found")
            }
            return new Recipe(      
                r.id, 
                r.recipe_name, 
                r.brew_type, 
                r.tea_type, 
                r.tea_type_qty, 
                r.sugar_source, 
                r.sugar_source_qty, 
                r.starter_qty, 
                r.batch_size, 
                r.avg_ferment_temp, 
                r.primary_ferment_days,
                r.primary_ferment_notes,
                r.secondary_ferment_days,
                r.secondary_ferment_notes,
                r.carbonation_method_id,
                r.steps,
                r.recipe_notes,
                r.rating,
                r.created_at)
    }
};

module.exports = Recipe;