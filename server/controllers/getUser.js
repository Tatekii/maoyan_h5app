module.exports = async (ctx, next) => {
  await next();
  if (ctx.session.loginUser) {
    ctx.body = {
      msg: "获取用户信息成功",
      status: 0,
      data: {
        user: ctx.session.loginUser,
        isAdmin: ctx.session.isAdmin,
        avatar:ctx.session.avatar
      }
    };
  } else {
    ctx.body = {
      msg: "未监测到登陆状态",
      status: -1
    };
  }
};
