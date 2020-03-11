/* eslint-disable func-names */
import Koa from 'koa';
import route from 'koa-route';
import '@babel/polyfill';
import { createHash } from '../utils/poseidonHash';

// eslint-disable-next-line no-undef
BigInt.prototype.toJSON = function() {
  return this.toString();
};

module.exports = async () => {
  const app = new Koa();
  app.use(
    route.post('/', async ctx => {
      const { t } = ctx.request.body;
      const { nRoundsF } = ctx.request.body;
      const { nRoundsP } = ctx.request.body;
      const { seed } = ctx.request.body;
      const { element } = ctx.request.body;
      let result;

      try {
        const hash = await createHash(t, nRoundsF, nRoundsP, seed);
        result = await hash(element);
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
            result: result,
          },
        };
      }
    }),
  );

  return app;
};
