const express = require("express");
const router = new express.Router();
const TeaType = require("../models/teaType");
const { request } = require("../app");

router.get("/", async (req, res, next) => {
    try {
        let teaTypes = await TeaType.getAll();
        return res.json({teaTypes});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let teaType = await TeaType.findById(id)
        return res.json(teaType)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;