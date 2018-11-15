import * as Router from "koa-router";
const router = new Router();

router.get("/getTeamList", async (ctx, next) => {
  const { query } = ctx.request;
  ctx.body = {
    data: 1,
    message: "ok"
  };
});

export default router;
