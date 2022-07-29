const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


// critic helper function
const addCriticDetails = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// LIST, for all movies
function list() {
  return knex("movies").select("*");
}

// LIST, for movies showing in movies_theaters table
function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

// GET, movie by Id
function read(movieId) {
  return knex("movies")
    .select("*")
    .where("movie_id", movieId)
    .first();
}

// GET, theaters playing movie by Id
function readTheaters(movieId) {
  return knex("movies as m")
  .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
  .join("theaters as t", "t.theater_id", "mt.theater_id")
  .select("t.*")
  .where({"m.movie_id": movieId})
}
  
// GET, reviews for movie by Id
function readReviews(movieId) {
    return knex("movies as m")
    .join("reviews as r" , "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({"m.movie_id": movieId})
    .select("*")
    .then((reviews) => reviews.map(addCriticDetails))
  }

module.exports = {
  list,
  listIsShowing,
  read,
  readReviews,
  readTheaters
};