const express = require("express");
const router = new express.Router();
const RecipeFlavoring = require("../models/recipeFlavoring");

router.get("/", async (req, res, next) => {
    try {
        let recipesflavorings = await RecipeFlavoring.getAll();
        return res.json({recipesflavorings});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let recipeFlavoring = await RecipeFlavoring.findById(id)
        return res.json(recipeFlavoring)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;