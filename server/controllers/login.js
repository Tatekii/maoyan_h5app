const userModel = require("../models/users");
const setCrypto = require("../utils/crypto");

module.exports = async (ctx, next) => {
  await next();
  if (
    !ctx.request.body.verifyImgCode ||
    ctx.request.body.verifyImgCode !== ctx.session.verifyImg
  ) {
    ctx.body = {
      msg: "验证码错误",
      status: -4
    };
    return;
  }
  // 用户名登陆
  if (ctx.request.body.username) {
    let { username, password } = ctx.request.body;
    console.log(setCrypto(password));

    let res = await userModel.confirmLogin({
      username,
      password: setCrypto(password)
    });
    if (res) {
      if (res.isFrozen) {
        ctx.body = {
          msg: "账号已冻结",
          status: -2
        };
        return;
      }
      ctx.session.loginUser = username;
      // 管理员
      ctx.session.isAdmin = res.isAdmin;
      // 头像
      ctx.session.avatar = res.avatar;

      ctx.body = {
        msg: "登陆成功",
        status: 0
      };
    } else {
      ctx.body = {
        msg: "登陆失败",
        status: -1
      };
    }
  }
  // 邮箱登陆
  if (ctx.request.body.email) {
    let { email, password } = ctx.request.body;
    let res = await userModel.confirmLogin({
      email,
      password: setCrypto(password)
    });

    if (res) {
      if (res.isFrozen) {
        ctx.body = {
          msg: "账号已冻结",
          status: -2
        };
        return;
      }
      ctx.session.loginUser = res.username;
      ctx.session.isAdmin = res.isAdmin;
      // 头像
      ctx.session.avatar = res.avatar;
      ctx.body = {
        msg: "登陆成功",
        status: 0
      };
    } else {
      ctx.body = {
        msg: "登陆失败",
        status: -1
      };
    }
  }
};
