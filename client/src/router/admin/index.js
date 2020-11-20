export default {
  path: "/admin",
  component: () => import("@/views/Admin"),
  children: [
    {
      path: "userAdm",
      component: () => import("@/views/Admin/userAdm")
    },
    {
      path: "movieAdm",
      component: () => import("@/views/Admin/movieAdm")
    },
    {
      path: "cinemaAdm",
      component: () => import("@/views/Admin/cinemaAdm")
    },
    // 默认定向
    {
      path: "",
      redirect: "userAdm"
    }
  ]
};
