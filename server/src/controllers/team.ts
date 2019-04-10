import * as Router from "koa-router";
const session = require("koa-session-minimal");
const redisStore = require("koa-redis");
const uuid = require("uuid/v1");
const router = new Router();

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

const client = redisStore();

client.on("error", (err: any) => {
  console.log(`ERROR:${err}?1`);
});

client.on("connect", (rel: any) => {
  console.log("link suc redis");
});

client.on("warning", (wrn: any) => {
  console.log("link warning redis", wrn);
});

router.use(
  session((ctx: any) => {
    console.log(ctx.session, "sessionsession");
    return {
      maxAge: 5000
    };
  })
);

router.get("/getTeamList", async (ctx, next) => {
  const { query } = ctx.request;
  ctx.body = {
    data: 1,
    message: "ok"
  };
  return next();
});

router.post("/getTeamList", async (ctx, next) => {
  const { query } = ctx.request;
  ctx.body = {
    data: 1,
    message: "post ok"
  };
  return next();
});

router.get("/setCookie", async (ctx, next) => {
  const cookie = ctx.cookies.get("sesssion.id");
  if (!cookie) {
    await createLogin(ctx);
    return next();
  } else {
    const checkLExpires = client.get(cookie);
    if (!checkLExpires) {
      await createLogin(ctx);
      return next();
    }
  }
  ctx.body = {
    status: "ok"
  };
  return next();
});

router.get("/checkCookie", async (ctx, next) => {
  try {
    const cookie = ctx.cookies.get("sesssion.id");
    ctx.body = {
      status: "ok",
      cookie: cookie ? cookie : "1"
    };
    return next();
  } catch (error) {
    console.log(error);
  }
});
router.get("/clearCookie", async (ctx, next) => {
  try {
    ctx.cookies.set("sesssion.id", `${Math.random() * 10}`, {
      domain: "127.0.0.1",
      maxAge: 1,
      httpOnly: true
    });
    ctx.body = {
      status: "ok"
    };
    return next();
  } catch (error) {
    console.log(error);
  }
});

async function createLogin(ctx: any) {
  const login_key = uuid();
  await client.set(`${login_key}`, { login: true }, ONE_MONTH);
  ctx.cookies.set("sesssion.id", `${login_key}`, {
    domain: "127.0.0.1",
    httpOnly: true,
    maxAge: ONE_MONTH
  });
  return;
}

export default router;
