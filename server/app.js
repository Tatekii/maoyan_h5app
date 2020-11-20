const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const index = require("./routes/index");
const users = require("./routes/users");
const admin = require("./routes/admin");
const upload = require("./routes/upload")

const { Mongoose } = require("./utils/config");
const session = require("koa-session");

// error handler
onerror(app);

app.keys = ["movimovimovi"];
// 加密cookie的key

// middleWares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public")); // 静态文件目录
// koa-session
app.use(session(app));
app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

Mongoose.connect();

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());
app.use(upload.routes(),upload.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
