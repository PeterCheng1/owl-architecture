import * as Koa from "koa";
import router from "../routes";
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const zlib = require("zlib");
const koaStatic = require("koa-static");
const path = require("path");
const cors = require("@koa/cors");

const app = new Koa();

app.keys = ["owl-sheldonyee-keys"];

app.use(
  cors({
    origin: "http://127.0.0.1:10000",
    credentials: true
  })
);

app.use(koaStatic(path.join(__dirname, "../../static")));

app.use(bodyParser({ multipart: true }));

app.use(
  compress({
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH
  })
);

app.use(router.routes());

app.listen(9000);

console.log("Server running on port 9000");
