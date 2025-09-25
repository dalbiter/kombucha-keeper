const express = require("express");
const morgan = require("morgan");
const ExpressError = require("./expressError");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("The app is working");
});

// General 404 error handler
app.use((req, res, next) => {
    const e = new ExpressError(404, "Oops there's nothing here!")
    next(e);
})

// Generic error handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    let msg = error.msg || "Internal server error";

    return res.status(status).json({
        error: { status, msg }
    });
});


module.exports = app;