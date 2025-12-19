const express = require("express");
const router = new express.Router();
const BrewLog = require("../models/brewLog");

router.get("/", async (req, res, next) => {
    try {
        let brewLogs = await BrewLog.getAll();
        return res.json({brewLogs});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let brewLog = await BrewLog.findById(id)
        return res.json(brewLog)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;