import LoginPage from "views/AppViews/Auth/AuthLogin.jsx";
import RegisterPage from "views/AppViews/Auth/AuthRegister.jsx";
import RecoverPage from "views/AppViews/Auth/AuthRecover.jsx";
import ConfirmPage from "views/AppViews/Auth/AuthConfirm.jsx";

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
    mini: "RC",
    component: RecoverPage
  },
  {
    path: "/app/auth/confirm/:id",
    name: "Confirm",
    mini: "CF",
    component: ConfirmPage
  },
];

export default pagesRoutes;
