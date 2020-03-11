import Koa from 'koa';
import route from 'koa-route';
import '@babel/polyfill';

module.exports = async () => {
  const app = new Koa();
  app.use(
    route.get('/', async ctx => {
      try {
        console.log('All systems go!');
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          data: {
            err: err,
          },
        };
      } finally {
        ctx.status = 200;
        ctx.body = {
          data: {
            result: 'ok',
          },
        };
      }
    }),
  );
  return app;
};
