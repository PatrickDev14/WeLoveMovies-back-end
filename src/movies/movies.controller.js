const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const isShowing = req.query.is_showing;
  const data = await moviesService.list(isShowing);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
}