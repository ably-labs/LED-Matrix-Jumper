const app = require("./app");

// Launch the server on the port provided by our host, or 12271, if empty.

const port = process.env.PORT || 12271;
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
