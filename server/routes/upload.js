const router = require("koa-router")();
const controllers = require("../controllers");
// 文件上传中间件
const multer = require("@koa/multer");

// 头像上传配置
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatars/')
  },
  // 头像保留拓展名
  filename: function (req, file, cb) {
    var singfileArray = file.originalname.split('.');
    var fileExtension = singfileArray[singfileArray.length - 1];
    cb(null, singfileArray[0] + "." + fileExtension);
  }
})
const avatarUpload = multer({ storage });


// 操作权限
router.use(async (ctx,next)=>{
  if(ctx.session.loginUser){
    await next()
  }else{
    ctx.body = {
      status:-666,
      msg:'未登陆'
    }
  }
})

// 上传头像
router.post(
  "/usrapi/uploadAvatar",
  avatarUpload.single("avatar"),
  controllers.uploadAvatar
);

// router.post(
//   "/usrapi/uploadAvatar",
//   async(ctx,next)=>{
//     await next()
//     ctx.body = 'ok'
//   }
// );

module.exports = router;
