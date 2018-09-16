import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Courses from "./views/Courses.vue";
import Landing from "./views/Landing.vue";
import MyCertifications from "./views/MyCertifications.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/courses",
      name: "courses",
      components: {
        header: AppHeader,
        default: Courses,
        footer: AppFooter
      }
    },
    {
      path: "/mycerts",
      name: "mycerts",
      components: {
        header: AppHeader,
        default: MyCertifications,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
