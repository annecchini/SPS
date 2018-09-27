import Pages from "layouts/Pages/Pages.jsx";
import appPages from "layouts/AppPages/AppPages.jsx";

import Dashboard from "layouts/Dashboard/Dashboard.jsx";

var indexRoutes = [
  { path: "/app/auth", name: "Auth", component: appPages },
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
