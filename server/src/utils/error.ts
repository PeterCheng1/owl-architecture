import * as koa from "koa";

/**
 * 错误捕捉代理函数
 */
function catchError(handle: koa.Middleware) {
  return async function(
    ctx: koa.Context,
    next: (...params: any[]) => Promise<any>
  ) {
    try {
      return await handle(ctx, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
