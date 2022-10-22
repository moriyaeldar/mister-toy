import { Home } from "./pages/home.jsx";
import { ToyApp } from "./pages/toy-app.jsx";
import { UserDetails } from "./pages/user-details.jsx";
import { ToyDetails } from "./pages/toy-details.jsx";
import { ToyEdit } from "./pages/toy-edit.jsx";
import { Dashboard } from "./pages/dashboard.jsx";
import { About } from "./pages/about.jsx";
import { Login } from "./pages/login.jsx";
import { ReviewApp } from "./pages/review-app.jsx";

export default [
  {
    path: "/user/:userId",
    component: UserDetails,
  },
  {
    path: "/toy/edit/:toyId",
    component: ToyEdit,
  },
  {
    path: "/toy/dashbord",
    component: Dashboard,
  },
  ,
  {
    path: "/toy/login",
    component: Login,
  },
  {
    path: "/toy/:toyId",
    component: ToyDetails,
  },
  {
    path: "/review",
    component: ReviewApp,
    label: "Reviews",
  },
  {
    path: "/toy",
    component: ToyApp,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/",
    component: Home,
  },
];
