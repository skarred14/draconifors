import Koa from'koa'
import route from 'koa-route'
import { createHash } from '../utils/poseidonHash';

BigInt.prototype.toJSON = function() { return this.toString(); };

module.exports = async () => {
    const app = new Koa()
    app.use(route.post('/',  async (ctx) => {
        let t =  ctx.request.body.t
        let nRoundsF =  ctx.request.body.nRoundsF
        let nRoundsP =  ctx.request.body.nRoundsP
        let seed =  ctx.request.body.seed
        let element =  ctx.request.body.element
        let result

        try {
            let hash = await createHash(t, nRoundsF, nRoundsP, seed);
            result = await hash(element);
        } catch (err) {
            ctx.status = 500
            ctx.body = {
                data: {
                    err: err
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

