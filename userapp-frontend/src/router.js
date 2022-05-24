import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login"),
      meta: {
        requieresAuth: false
      }
    },
    {
      path: "/login-2",
      name: "login-2",
      component: () => import("./components/Login-2"),
      meta: {
        requieresAuth: false
      }
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./components/Home"),
      meta: {
        requieresAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register"),
      meta: {
        requieresAuth: false
      }
    },
    {
      path: "/userDashboard",
      name: "userDashboard",
      component: () => import("./components/UserDashboard"),
      meta: {
        requieresAuth: false
      }
    },
    {
      path: "/userDetails/:id",
      name: "userDetails",
      component: () => import("./components/UserDetails"),
      meta: {
        requieresAuth: false
      }
    },
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList"),
      meta: {
        requieresAuth: true
      }
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/TutorialDetails"),
      meta: {
        requieresAuth: true
      }
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial"),
      meta: {
        requieresAuth: true
      }
    }
  ]
});