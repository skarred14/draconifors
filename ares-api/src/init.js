import compile from 'circom';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import zkSnark from 'snarkjs';
import '@babel/polyfill';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const filePath = process.argv[2];
const fileName = filePath.endsWith('.circom')
  ? filePath.slice(0, -7).replace('circuits/', '')
  : filePath;

const main = async fileInput => {
  try {
    if (!exists(`${fileInput}`)) {
      mkdir(`${fileInput}`);
    }
    let compiledCircuit = await compile(
      path.join(process.cwd(), 'circuits', `${fileInput}.circom`),
      {},
    );
    await writeFile(
      path.join(process.cwd(), 'artifacts', `${fileInput}.json`),
      JSON.stringify(compiledCircuit, null, 2),
    );
    console.log('🏗️  zkSnark circuit', `${fileInput}`, 'compiled!');

    compiledCircuit = JSON.parse(
      await readFile(path.join(process.cwd(), 'artifacts', `${fileInput}.json`)),
      'utf8',
    );
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
    console.log('🔩  zkSnark circuit', `${fileInput}`, 'setup using KimLeeOh proving scheme!');
  } catch (err) {
    console.log(err);
  }
};

main(fileName);
