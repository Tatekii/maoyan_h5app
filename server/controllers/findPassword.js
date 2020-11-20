const userModel = require("../models/users");
const { Emailer } = require("../utils/config");
const setCrypto = require('../utils/crypto')

module.exports = async (ctx, next) => {
  await next();
  let { email, password, verifyCode } = ctx.request.body;
  console.log({ email, password, verifyCode });

  if (
    email === ctx.session.emailAddr &&
    verifyCode === ctx.session.verifyCode
  ) {
    if ((Emailer.verifyTime - ctx.session.verifyTime) / 1000 > 60) {
      ctx.body = {
        msg: "验证码已过期",
        status: -3
      };
      return;
    }
    let res = await userModel.findPassword(email, setCrypto(password));
    if (res) {
      ctx.body = {
        msg: "密码修改成功",
        status: 0
      };
    } else {
      ctx.body = {
        msg: "密码修改失败",
        status: -1
      };
    }
  } else {
    ctx.body = {
      msg: "验证码错误",
      status: -2
    };
  }
};
