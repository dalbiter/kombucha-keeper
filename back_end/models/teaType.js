const db = require("../db");
const ExpressError = require("../expressError");

class TeaType {
    constructor(id, tea_name, brand) {
        this.id = id;
        this.tea_name = tea_name;
        this.brand = brand;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, tea_name, brand 
            FROM tea_types`
            );
        const teaTypes = results.rows.map(t => new TeaType(
            t.id, t.tea_name, t.brand
        ))
        console.log(teaTypes);
        return teaTypes;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, tea_name, brand
            FROM tea_types
            WHERE id = $1`,
            [id]    
            )
            const t = results.rows[0];
            if(!t){
                throw new ExpressError(404, "Tea not found")
            }
            return new TeaType(t.id, t.tea_name, t.brand)
    }
};

module.exports = TeaType;