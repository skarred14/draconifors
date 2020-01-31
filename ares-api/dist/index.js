"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

const main = async () => {
  try {
    _app.default.listen(80);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();