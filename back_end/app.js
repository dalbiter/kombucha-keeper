const express = require("express");
const morgan = require("morgan");
const ExpressError = require("./expressError");
const userRoutes = require("./routes/userRoutes")

const app = express();

// parse request bodies for json
app.use(express.json());

app.use(morgan("dev"));

app.use("/users", userRoutes);

// General 404 error handler
app.use((req, res, next) => {
    const err = new ExpressError(404, "Oops there's nothing here!")
    next(err);
})

// Generic error handler
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg || "Internal server error";

    return res.status(status).json({
        error: { status, msg }
    });
});


module.exports = app;