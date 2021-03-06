import * as Koa from "koa";
import router from "../src/routes";
const pool = require("../db");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const zlib = require("zlib");
const koaStatic = require("koa-static");
const path = require("path");

const app = new Koa();

(app.context as any).DB = (global as any).con;

app.use(koaStatic(path.join(__dirname, "../../static")));

app.use(bodyParser({ multipart: true }));

app.use(
  compress({
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH
  })
);

app.use(router.routes());

app.listen(8080);

console.log("Server running on port 8080");
