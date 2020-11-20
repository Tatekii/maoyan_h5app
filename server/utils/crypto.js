// 加密
const crypto = require("crypto");

// 密钥
const secret = "lalala";

// const hash = crypto.createHmac('sha256', secret)
//                    .update('I love cupcakes')
//                    .digest('hex');

module.exports = password => {
  return crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");
};
