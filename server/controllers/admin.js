module.exports = async (ctx, next) => {
  await next();
  ctx.body = {
    msg: "管理员",
    status: 0
  };
};
