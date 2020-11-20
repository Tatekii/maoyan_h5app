const userModel = require("../models/users");

module.exports = async (ctx, next) => {
  await next();
  let { username,isFrozen } = ctx.request.body
  let res = await userModel.freezeUser(username,isFrozen);
  // console.log(res)
  if (res) {
    ctx.body = {
      msg:'冰箱成功',
      status: 0
    };
  } else {
    ctx.body = {
      status: -1,
      msg: "服务器昏古七了"
    };
  }
};