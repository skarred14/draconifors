import compile from 'circom';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const rename = promisify(fs.rename);
const filePath = process.argv[2];
const fileName = filePath.endsWith('.circom')
  ? filePath.slice(0, -7).replace('circuits/', '')
  : filePath;

const main = async fileInput => {
  try {
    if (!exists(`${fileInput}`)) {
      mkdir(`${fileInput}`);
    }
    const compiledCircuit = await compile(
      path.join(process.cwd(), 'circuits', `${fileInput}.circom`),
      {},
    );
    await writeFile(
      path.join(process.cwd(), 'circuits', `${fileInput}.json`),
      JSON.stringify(compiledCircuit, null, 2),
    );
    await rename(
      path.join(process.cwd(), 'circuits', `${fileInput}.json`),
      path.join(process.cwd(), 'circuits', 'artifacts', `${fileInput}.json`),
    );
    console.log('🏗️  zkSnark circuit', `${fileInput}`, 'compiled!');
  } catch (err) {
    console.log(err);
  }
};

main(fileName);
