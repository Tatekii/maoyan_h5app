// 图片验证码
const captcha = require('trek-captcha')

module.exports = ctx => {
  return captcha().then(info=>{
    ctx.session.verifyImg = info.token // 数字
    console.log(ctx.session.verifyImg);
    
    return info.buffer
  }).catch(err=>{
    return err
  })
}