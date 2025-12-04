const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { request } = require("../app");

router.get("/", async (req, res, next) => {
    try {
        let users = await User.getAll();
        return res.json({users});
    } catch (e) {
        return next (e);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params
        let user = await User.findById(id)
        return res.json(user)
    } catch(e) {
        return next(e);
    }
})

module.exports = router;