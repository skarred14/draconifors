import compile from 'circom';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import verifierTemplate from './utils/verifierGen';
import kloSetup from './utils/setup';
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

    const circuitSetup = await kloSetup(`${fileInput}`);

    await writeFile(
      path.join(process.cwd(), 'artifacts', `${fileInput}_vk_proof.json`),
      JSON.stringify(circuitSetup.vk_proof, null, 2),
    );
    await writeFile(
      path.join(process.cwd(), 'artifacts', `${fileInput}_vk_verifier.json`),
      JSON.stringify(circuitSetup.vk_verifier, null, 2),
    );
    console.log('🔩  zkSnark circuit', `${fileInput}`, 'setup using KimLeeOh proving scheme!');

    const template = await verifierTemplate(`${fileInput}`);

    await writeFile(
      path.join(process.cwd(), 'artifacts', `${fileInput}_verifier_klo_bn.sol`),
      template,
      'utf8',
    );
    console.log('🏁 Verifier contract for', `${fileInput}`, 'generated using KimeLeeOh scheme!');
  } catch (err) {
    console.log(err);
  }
};

main(fileName);
