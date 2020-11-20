const verifyImg = require("../utils/captcha");

module.exports = async (ctx, next) => {
  await next()
  let res = await verifyImg(ctx);
  if (res) {
    ctx.body = res;
  } else {
    ctx.body = {
      msg: "验证码粗问题",
      status: -1
    };
  }
};
