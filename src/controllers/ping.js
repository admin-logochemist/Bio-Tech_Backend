const httpStatus = require("http-status");

const ping = async (req, res) => {
  console.info("Pong!");
  res.status(httpStatus.OK).send("Pong!");
};

module.exports = {
  ping,
};
