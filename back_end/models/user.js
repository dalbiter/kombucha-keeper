const db = require("../db");
const ExpressError = require("../expressError");

class User {
    constructor(id, username, first_name, last_name, email, role_choice, password_hash, created_at) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role_choice = role_choice;
        this.password_hash = password_hash;
        this.created_at = created_at;
    }
    static async getAll(){
        const results = await db.query(
            `SELECT id, username, first_name, last_name, email, role_choice, password_hash, created_at 
            FROM users`
            );
        console.log(results)
        const users = results.rows.map(r => new User(
            r.id, r.username, r.first_name, r.last_name, r.email, r.role_choice, r.password_hash, r.created_at
        ))
        return users;
    };
    static async findById(id){
        const results = await db.query(
            `SELECT id, username, first_name, last_name, email, role_choice, password_hash, created_at 
            FROM users
            WHERE id = $1`,
            [id]    
            )
            const u = results.rows[0];
            if(!u){
                throw new ExpressError(404, "User not found")
            }
            return new User(u.id, u.username, u.first_name, u.last_name, u.email, u.role_choice, u.password_hash, u.created_at)
    }
};

module.exports = User;