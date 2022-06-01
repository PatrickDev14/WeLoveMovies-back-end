/* The asyncErrorBoundary() function takes two parameters:
delegate, which is an async/await handler or middleware function. This function will be called by the asyncErrorBoundary.
defaultStatus is an optional parameter that allows you to override the status code returned when delegate throws an error. */


function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;