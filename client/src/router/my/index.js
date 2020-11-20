export default {
  path: "/my",
  component: () => import("@/views/My"),
  children: [
    {
      path: "center",
      component: () => import("@/views/My/userCenter")
    },
    {
      path: "/my",
      redirect: "center"
    },
    {
      path: "login",
      component: () => import("@/components/Login")
    },
    {
      path: "register",
      component: () => import("@/components/Register")
    },
    {
      path: "findPassword",
      component: () => import("@/components/FindPassword")
    }
  ]
};
