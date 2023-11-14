const express = require("express");
const contactRoute = require("../routes/contact");
const router = express.Router();
const pingRoutes = require("./ping");
const authRoute=require('./auth')
const adminRoute=require('./admin')
const routes = [
  { path: "/ping", route: pingRoutes },
  { path: "/contact", route: contactRoute },
  { path: "/auth", route: authRoute },
  { path: "/admin", route: adminRoute },



];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
