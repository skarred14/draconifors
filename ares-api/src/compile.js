import compile from 'circom';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const writeFile = promisify(fs.writeFile);
const filePath = process.argv[2];
const fileName = filePath.endsWith('.circom')
  ? filePath.slice(0, -7).replace('circuits/', '')
  : filePath;

const main = async fileInput => {
  try {
    const compiledCircuit = await compile(
      path.join(process.cwd(), 'circuits', `${fileInput}.circom`),
      {},
    );
    await writeFile(
      path.join(process.cwd(), 'circuits', `${fileInput}_input.json`),
      JSON.stringify(compiledCircuit, null, 2),
    );
    console.log(compiledCircuit);
  } catch (err) {
    console.log(err);
  }
};

main(fileName);
