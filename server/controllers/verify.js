const { Emailer } = require("../utils/config");

module.exports = async (ctx, next) => {
  await next();
  // console.log(Emailer.verifyTime);
  // console.log(ctx.session.verifyTime);
  if (!ctx.query) {
    return
  }

  let emailAddr = ctx.query.email;
  let verifyCode = Emailer.verifyCode;

  // ctx.session.verifyCode = Emailer.verifyCode
  // 不能直接赋值，不然生成了两个验证码  -----------!

  ctx.session.verifyCode = verifyCode;
  ctx.session.emailAddr = emailAddr;
  ctx.session.verifyTime = Emailer.verifyTime;
  //  http://localhost:3000/usrapi/verify/?email=847621138@qq.com
  // let mailOpt = {
  //   from: "", // 邮箱地址，与config中的auth-user相同
  //   to: emailAddr,
  //   subject: "Verify Code",
  //   text: "你的验证码:" + verifyCode
  // };
  console.log(emailAddr, verifyCode);

  // 验证
  // Emailer.transporter.verify(error => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Server is ready to take our messages");
  //   }
  // });

  // 省略邮箱步骤
  // Emailer.transporter.sendMail(mailOpt);

  ctx.body = {
    msg: emailAddr + "验证码发送成功" + verifyCode,
    status: 0
  };
};
