const Koa = require("koa");
const app = new Koa();
const serve = require("koa-static");

// logger

app.use(async (ctx, next) => {
  console.log("1");
  await next();
  console.log("6");
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  console.log("2");
  const start = Date.now();
  await next();
  console.log("5");
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response

app.use(async (ctx, next) => {
  console.log("3");
  // ctx.body = "Hello World";

  console.log(ctx.path);

  if (ctx.path === "/fire.png") {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  await next();
  console.log("4");
});

app.use(serve("./public"));

app.listen(3000);
