export default {
  path: "/admin",
  component: () => import("@/views/Admin"),
  children: [
    {
      path: "userAdm",
      component: () => import("@/views/Admin/userAdm")
    },
    // 默认定向
    {
      path: "",
      redirect: "userAdm"
    }
  ]
};
