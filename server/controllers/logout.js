module.exports = async (ctx, next) => {
  await next();
  ctx.session.loginUser = "";
  // 管理员
  ctx.session.isAdmin = false;
  // 头像
  ctx.session.avatar = '';
  ctx.body = {
    msg: "退出登录",
    status: 0
  };
};
