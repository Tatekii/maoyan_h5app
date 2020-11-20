const userModel = require("../models/users");

module.exports = async (ctx, next) => {
  await next();
  let { username } = ctx.request.body;
  let res = await userModel.deleteUser(username);
  // 操作数据库啊哥哥
  // 忘记await
  if (res) {
    ctx.body = {
      msg: "删除成功",
      status: 0
    };
  } else {
    ctx.body = {
      msg: "删除失败",
      status: -1
    };
  }
};
