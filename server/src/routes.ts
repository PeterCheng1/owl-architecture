import * as Router from "koa-router";
import team from "./controllers/team";
import user from "./controllers/user";

const router = new Router({
  prefix: "/owl"
});

console.log(123)

router.use(team.routes(), team.allowedMethods());

router.use(user.routes(), user.allowedMethods());

export default router;
