const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// LIST, theaters and the movies that they are showing
async function listTheatersAndMovies(req, res, next) {
  res.json({ data: await theatersService.list() });
}

module.exports = {
  list: asyncErrorBoundary(listTheatersAndMovies),
}