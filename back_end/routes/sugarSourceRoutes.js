const express = require("express");
const router = new express.Router();
const SugarSource = require("../models/sugarSource");

router.get("/", async (req, res, next) => {
    try {
        let sugarSources = await SugarSource.getAll();
        return res.json({sugarSources});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let sugarSource = await SugarSource.findById(id)
        return res.json(sugarSource)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;