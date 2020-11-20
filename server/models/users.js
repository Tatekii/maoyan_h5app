const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const { Base } = require("../utils/config");
const url = require("url");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  date: { type: Date, default: Date.now() },
  // 管理员权限
  isAdmin: { type: Boolean, default: false },
  // 冻结账号
  isFrozen: { type: Boolean, default: false },
  avatar: { type: String, default: url.resolve(Base.avatarUrl, "default.png") }
});

const userModel = mongoose.model("user", userSchema);
userModel.createIndexes();

// 保存新用户
const save = data => {
  let newUser = new userModel(data);
  return newUser
    .save()
    .then(() => true)
    .catch(err => console.log(err));
};

// 登陆验证
const confirmLogin = data => {
  return userModel.findOne(data);
};

// const getName = data => {
//   return userModel.findOne(data).username;
// };

// 修改密码
const findPassword = (email, password) => {
  return userModel
    .updateOne({ email }, { $set: { password } })
    .then(() => 1)
    .catch(() => 0);
};

// 修改头像
const uploadAvatar = (username, avatar) => {
  return userModel
    .updateOne({ username }, { $set: { avatar } })
    .then(() => 1)
    .catch(() => 0);
};

const adminUser = () => {
  return userModel.find({}, { password: 0 });
  // 不返回密码字段
};

// 冻结/解冻用户
const freezeUser = (username, isFrozen) => {
  return userModel
    .update({ username }, { $set: { isFrozen } })
    .then(() => 1)
    .catch(() => 0);
};

// 删除账户
const deleteUser = username => {
  return userModel.deleteOne({ username });
  // 记得操作数据库时传入的是对象 {}
};

module.exports = {
  save,
  confirmLogin,
  findPassword,
  adminUser,
  freezeUser,
  deleteUser,
  uploadAvatar
};
