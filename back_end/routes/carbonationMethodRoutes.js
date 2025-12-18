const express = require("express");
const router = new express.Router();
const CarbonationMethod = require("../models/carbonationMethod");

router.get("/", async (req, res, next) => {
    try {
        let carbonationMethods = await CarbonationMethod.getAll();
        return res.json({carbonationMethods});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let carbonationMethod = await CarbonationMethod.findById(id)
        return res.json(carbonationMethod)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;