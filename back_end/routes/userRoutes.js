const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM users")
        return res.json({ users: results.rows });
    } catch (e) {
        return next (e);
    }
});

module.exports = router;