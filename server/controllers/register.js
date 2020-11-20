const userModel = require("../models/users");
const { Emailer } = require("../utils/config");
const setCrypto = require("../utils/crypto");

module.exports = async (ctx, next) => {
  await next();
  let { username, password, email, verifyCode } = ctx.request.body;
  console.log({ username, password, email, verifyCode });
  console.log(ctx.session.emailAddr, ctx.session.verifyCode);

  // ctx.req是node提供的
  // ctx.request才是原生对象
  if (
    email !== ctx.session.emailAddr ||
    verifyCode !== ctx.session.verifyCode
  ) {
    ctx.body = {
      msg: "验证码错误",
      status: -1
    };
    return;
  }

  // 验证码超时
  if ((Emailer.verifyTime - ctx.session.verifyTime) / 1000 > 60) {
    ctx.body = {
      msg: "验证码已过期",
      status: -3
    };
    return;
  }

  let res = await userModel.save({
    username,
    password: setCrypto(password),
    email
  });
  if (res) {
    ctx.body = {
      msg: "注册成功",
      status: 0
    };
  } else {
    ctx.body = {
      msg: "注册失败",
      status: -2
    };
  }
};
