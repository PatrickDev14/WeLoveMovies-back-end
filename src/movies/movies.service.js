const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(isShowing) {
  if (isShowing == "true") {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where("mt.is_showing", true)
      .groupBy("m.movie_id");
  }
  return knex("movies").select("*");
}

module.exports = {
  list,
};