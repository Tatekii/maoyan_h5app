const userModel = require("../models/users");

module.exports = async (ctx, next) => {
  await next();
  let res = await userModel.adminUser();
  // console.log(res)
  if (res) {
    ctx.body = {
      data:{
        list:res
      },
      status: 0
    };
  } else {
    ctx.body = {
      status: -1,
      msg: "服务器昏古七了"
    };
  }
};
