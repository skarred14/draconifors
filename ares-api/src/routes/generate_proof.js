import Koa from 'koa';
import route from 'koa-route';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import zkSnark from 'snarkjs';
import '@babel/polyfill';

const readFile = promisify(fs.readFile);

export default async () => {
    const app = new Koa();
    app.use(route.post('/', async (ctx) => {
        const { circuitName, witnessInputs } = ctx.request.body;
        let output = {};
        try {
            const compiledCircuit = JSON.parse(
              await readFile(path.resolve(__dirname, '../../artifacts', `${circuitName}.json`)),
              'utf8',
            );
            const circuitInstance = new zkSnark.Circuit(compiledCircuit);
            const witness = circuitInstance.calculateWitness(witnessInputs);
            // Below is another way to extract the return value of the circuit based on the witnessInputs
            // const witnessOut = zkSnark.stringifyBigInts(witness[circuitInstance.getSignalIdx(`main.${witnessOutputVar}`)].toString());
            const vkProof = JSON.parse(
              await readFile(path.resolve(__dirname, '../../artifacts', `${circuitName}_vk_proof.json`)),
              'utf8',
            );
            const vkVerifier = JSON.parse(
              await readFile(path.resolve(__dirname, '../../artifacts', `${circuitName}_vk_verifier.json`)),
              'utf8',
            );
            const { proof, publicSignals } = zkSnark.kimleeoh.genProof(zkSnark.unstringifyBigInts(vkProof), witness);
            const validity = zkSnark.kimleeoh.isValid(zkSnark.unstringifyBigInts(vkVerifier), proof, publicSignals);
            output = {proof: proof, publicInputs: publicSignals, valid: validity};
          } catch (err) {
            ctx.status = 500;
            ctx.body = {
                data: {
                    err: err
                    }
                } 
            } finally {
                ctx.status = 200;
                ctx.body = {
                    data: {
                        result: output
                    }
                }

            }
    }))

    return app;
}