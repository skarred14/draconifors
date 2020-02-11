"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _circom = _interopRequireDefault(require("circom"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _path = _interopRequireDefault(require("path"));

const writeFile = (0, _util.promisify)(_fs.default.writeFile);
const filePath = process.argv[2];
const fileName = filePath.endsWith('.circom') ? filePath.slice(0, -7).replace('circuits/', '') : filePath;

const main = async fileInput => {
  try {
    const compiledCircuit = await (0, _circom.default)(_path.default.join(process.cwd(), 'circuits', `${fileInput}.circom`), {});
    await writeFile(_path.default.join(process.cwd(), 'circuits', `${fileInput}_input.json`), JSON.stringify(compiledCircuit, null, 2));
    console.log(compiledCircuit);
  } catch (err) {
    console.log(err);
  }
};

main(fileName);