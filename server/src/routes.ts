import * as Router from "koa-router";
import team from "./controllers/team";

const router = new Router({
  prefix: "/owl"
});

router.use(team.routes(), team.allowedMethods());

export default router;
