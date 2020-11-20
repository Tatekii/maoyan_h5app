const router = require("koa-router")();
const controllers = require("../controllers");

router.prefix("/usrapi");

router.get("/", function(ctx, next) {
  ctx.body = "this is a users response!";
});

router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.get("/logout", controllers.logout);
router.get("/verify", controllers.verify);
router.get("/getUser", controllers.getUser);
router.post("/findPassword", controllers.findPassword);
router.get('/verifyImg',controllers.verifyImg)
// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router;
