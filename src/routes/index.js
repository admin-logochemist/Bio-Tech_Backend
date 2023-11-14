const express = require("express");
const contactRoute = require("../routes/contact");
const router = express.Router();
const newsRoute=require('../routes/news')
const pingRoutes = require("./ping");
const stateRoute=require('../routes/realState')
const routes = [
  { path: "/ping", route: pingRoutes },
  { path: "/contact", route: contactRoute },
  { path: "/news", route: newsRoute },
  { path: "/state", route: stateRoute },


];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
