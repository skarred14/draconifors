import Koa from'koa'
import route from 'koa-route'
import { createHash } from '../utils/poseidonHash';

BigInt.prototype.toJSON = function() { return this.toString(); };

module.exports = async () => {
    const app = new Koa()

    app.use(route.post('/',  async (ctx) => {
        let t = await ctx.request.body.t
        let nRoundsF = await ctx.request.body.nRoundsF
        let nRoundsP = await ctx.request.body.nRoundsP
        let seed = await ctx.request.body.seed
        let element = await ctx.request.body.element

        console.log(t)

        try {
            let hash = await createHash(t, nRoundsF, nRoundsP, seed);
            let result = await hash(element);
            result = JSON.stringify(result)
        } catch (err) {
            ctx.status = 500
            ctx.body = {
                data: {
                    result: err
                }
            }
        }
        finally{
            ctx.status = 200
            ctx.body = {
                data: {
                    result: result
                }
            }
        }
    }))

    return app
}

