const router = require("koa-router")();
const controllers = require("../controllers");

router.prefix("/adapi");

// 拦截器
// -----------！！错误！！-------------
// 一开始没给加async 和 await next（）
// 导致只会执行完下面第一个中间件!!!!!
router.use(async (ctx, next) => {
  console.log(ctx.session.loginUser);
  console.log(ctx.session.isAdmin?'管理员':'noshit');
  if (ctx.session.loginUser && ctx.session.isAdmin) {
    await next();
    //  校验用户身份
  } else {
    ctx.body = {
      msg: "无管理员权限",
      status: -2
    };
  }
});

router.get("/", controllers.admin);
router.get('/userList',controllers.adminUser)
router.post('/userFreeze',controllers.adminFreeze)
router.post('/userDelete',controllers.adminDelete)

module.exports = router;
