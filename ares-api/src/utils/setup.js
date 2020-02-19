import zkSnark from 'snarkjs';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import '@babel/polyfill';

const readFile = promisify(fs.readFile);

export default async fileInput => {
  const compiledCircuit = JSON.parse(
    await readFile(path.join(process.cwd(), 'artifacts', `${fileInput}.json`)),
    'utf-8',
  );
  const circuitInstance = new zkSnark.Circuit(compiledCircuit);
  const circuitSetup = await zkSnark.kimleeoh.setup(circuitInstance);
  const circuitStrSetup = zkSnark.stringifyBigInts(circuitSetup);
  return circuitStrSetup;
};
