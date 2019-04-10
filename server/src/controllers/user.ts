import * as Router from "koa-router";
import query from "../db/db";
const uuidv4 = require("uuid/v4");
const session = require("koa-session-minimal");
const redisStore = require("koa-redis");

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

const router = new Router();

router.post("/setUser", async (ctx, next) => {
  const user_name = (ctx.request.body as any).user;
  const userid = uuidv4();
  const sql = `INSERT INTO user (userid,user_name) VALUES ('${userid}','${user_name}')`;
  try {
    const data = await query(sql);
    ctx.body = {
      ok: "true"
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      ok: "fail"
    };
  }
});

router.post("/login", async (ctx, next) => {
  const user = (ctx.request.body as any).user;
  const sql = `SELECT user_name,userid from user WHERE user_name='${user}';`;
  try {
    const data: any = await query(sql);
    const login_key = uuidv4();
    await client.set(`${login_key}`, data, ONE_MONTH);
    ctx.cookies.set("sesssion.id", `${login_key}`, {
      domain: "127.0.0.1",
      httpOnly: true,
      maxAge: ONE_MONTH
    });
    ctx.body = {
      ok: "true",
      data: data[0]
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      ok: "fail"
    };
  }
});

export default router;
