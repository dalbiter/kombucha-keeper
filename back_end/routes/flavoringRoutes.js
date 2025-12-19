const express = require("express");
const router = new express.Router();
const Flavoring = require("../models/flavoring");

router.get("/", async (req, res, next) => {
    try {
        let flavorings = await Flavoring.getAll();
        return res.json({flavorings});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let flavoring = await Flavoring.findById(id)
        return res.json(flavoring)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;