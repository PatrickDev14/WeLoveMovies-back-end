if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");

const asyncErrorBoundary = require("./errors/asyncErrorBoundary");

app.use(express.json());
app.use(cors());

// routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);


// errors
app.use(asyncErrorBoundary);

// Not Found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

module.exports = app;
