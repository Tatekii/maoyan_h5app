export default {
  path: "/movie",
  component: () => import("@/views/Movie"),
  children: [
    {
      path: "city",
      component: () => import("@/components/City")
    },
    {
      path: "onScreen",
      component: () => import("@/components/OnScreen")
    },
    {
      path: "comingSoon",
      component: () => import("@/components/ComingSoon")
    },
    // 默认重定向
    {
      path: "",
      redirect: "onScreen"
    },
    // movie页面中多个router-view
    // 使用明命名试图
    {
      path: "detail/chanel1/:movieId",
      components: {
        default: () => import("@/components/OnScreen"),
        detail: () => import("@/views/Movie/detail")
      },
      props: {
        detail: true
      }
    },
    {
      path: "detail/chanel2/:movieId",
      components: {
        default: () => import("@/components/ComingSoon"),
        detail: () => import("@/views/Movie/detail")
      },
      props: {
        detail: true
      }
    }
  ]
};
