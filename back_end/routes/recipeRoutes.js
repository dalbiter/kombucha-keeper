const express = require("express");
const router = new express.Router();
const Recipe = require("../models/recipe");

router.get("/", async (req, res, next) => {
    try {
        let recipes = await Recipe.getAll();
        return res.json({recipes});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let recipe = await Recipe.findById(id)
        return res.json(recipe)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;