const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware validation, check if movie exists
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found."
  });
}

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await moviesService.listIsShowing();
    return res.json({ data });
  }
  const data = await moviesService.list();
  res.json({ data });
}

//get by Id
function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

//get theaters showing movie by Id
async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await moviesService.readTheaters(movieId);
  res.json({ data });
}

//get reviews for movie by Id
async function readReviews(req, res) {
  const { movieId } = req.params;
  const data = await moviesService.readReviews(movieId);
  res.json({ data });
}

//exports
module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};