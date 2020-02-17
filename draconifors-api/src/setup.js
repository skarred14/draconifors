import zkSnark from 'snarkjs';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const fileInput = process.argv[2];

// To use this file for set up, run: docker-compose exec draconifors-api node dist/setup.js circuit_name
const main = async() => {
    const compiledCircuit = JSON.parse(await readFile(path.join(process.cwd(), 'artifacts', `${fileInput}.json`)), 'utf-8');
    const circuitInstance = new zkSnark.Circuit(compiledCircuit);
    const circuitSetup = await zkSnark.kimleeoh.setup(circuitInstance);
    const circuitStrSetup = zkSnark.stringifyBigInts(circuitSetup);
    await writeFile(
        path.join(process.cwd(), 'artifacts', `${fileInput}_vk_proof.json`),
        JSON.stringify(circuitStrSetup.vk_proof, null, 2),
    );
    await writeFile(
        path.join(process.cwd(), 'artifacts', `${fileInput}_vk_verifier.json`),
        JSON.stringify(circuitStrSetup.vk_verifier, null, 2),
    );
    console.log("🔩 Set up is done!");
}

main();
