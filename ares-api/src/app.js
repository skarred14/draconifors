import Koa from 'koa';
import cors from '@koa/cors';
import mount from 'koa-mount';
import bodyParser from'koa-bodyparser';
import poseidon from './routes/poseidon_hashing';


const main = async () => {
    const app = new Koa()

    // Parse incoming requests data
    app.use(bodyParser())

    // Allow CORS headers
    app.use(cors({
        credentials: true
    }))

    app.use(mount('/poseidon', poseidon()))
    return app
}

if (require.main === module) {
    main()
    .then(
      (app) => app.listen(3001)
    )
  }
  
