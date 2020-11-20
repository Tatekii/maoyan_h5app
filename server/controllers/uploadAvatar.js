const userModel = require("../models/users");
const fs = require("fs");
const { Base } = require("../utils/config");

module.exports = async (ctx, next) => {
  await next();
  console.log("ctx.file", ctx.file);
  let username = ctx.session.loginUser;
  let letter = ctx.file.filename.split(".");
  let extName = letter[letter.length - 1];
  let newName = username + "." + extName;
  let newAvatar = Base.avatarStatic + newName;
  await fs.rename(
    Base.avatarStatic + ctx.file.filename,
    Base.avatarStatic + newName,
    (err) => {
      ctx.body = {
        status:-2,
        msg:err
      }
    }
  );

  let avatar = Base.avatarUrl + newName;
  let res = await userModel.uploadAvatar(username, avatar);
  if (res) {
    ctx.session.avatar = avatar;
    ctx.body = {
      status: 0,
      msg: "头像更新",
      data: {
        newAvatar
      }
    };
  } else {
    ctx.body = {
      status: -1,
      msg: "服务器出错了"
    };
  }
};
