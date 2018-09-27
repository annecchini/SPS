import LoginPage from "views/AppViews/Auth/AuthLogin.jsx";
import RegisterPage from "views/AppViews/Auth/AuthRegister.jsx";
import RecoverPage from "views/AppViews/Auth/AuthRecover.jsx";

var pagesRoutes = [
  {
    path: "/app/auth/login",
    name: "Login Page",
    mini: "LP",
    component: LoginPage
  },
  {
    path: "/app/auth/register",
    name: "Register",
    mini: "RP",
    component: RegisterPage
  },
  {
    path: "/app/auth/recover",
    name: "Recover",
    mini: "LSP",
    component: RecoverPage
  }
];

export default pagesRoutes;
