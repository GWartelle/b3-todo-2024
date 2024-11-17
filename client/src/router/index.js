import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateTask from "../views/CreateTask.vue";
import EditTask from "../views/EditTask.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-task",
      name: "add-task",
      component: CreateTask,
    },
    {
      path: "/edit-task/:index",
      name: "edit-task",
      component: EditTask,
    },
    // {
    //   path: "/types",
    //   name: "types",
    //   component: TypesView,
    // },
    // {
    //   path: "/add-type",
    //   name: "add-task",
    //   component: CreateType,
    // },
    // {
    //   path: "/edit-type/:index",
    //   name: "edit-task",
    //   component: EditType,
    // },
  ],
});

export default router;
