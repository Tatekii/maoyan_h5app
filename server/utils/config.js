// mongosse配置
// nodeemailer配置

var mongoose = require("mongoose");
var nodemailer = require("nodemailer");

var Mongoose = {
  url: "mongodb://localhost:27017/app",
  connect() {
    mongoose.connect(
      this.url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      err => {
        if (err) {
          console.log("\033[41;37m 连接数据库出错，" + err);
          return;
        }
        console.log(
          "\033[40;35m [数据库] \033[40;37m 成功连接" + this.url + "\033[0m"
        );
        // \033[背景色编号;字色编号m
      }
    );
  }
};

// 验证码
var Emailer = {
  config: {
    host: "smtp服务器地址",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "邮箱地址", // generated ethereal user
      pass: "授权码" // generated ethereal password
    }
  },
  get transporter() {
    return nodemailer.createTransport(this.config);
  },
  get verifyCode() {
    return Math.random()
      .toString()
      .slice(2, 6);
  },
  // 添加验证码时效性
  get verifyTime() {
    return Date.now()
  }
};

var Base = {
  avatarUrl: 'http://localhost:3000/avatars/',
  avatarStatic : 'public/avatars/'
  // http://localhost:3000/avatars/default.png
}

module.exports = {
  Mongoose,
  Emailer,
  Base
};
