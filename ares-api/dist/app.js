"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json({
  limit: '2mb'
}));
app.use(_bodyParser.default.urlencoded({
  limit: '2mb',
  extended: false
}));
app.get('/healthcheck', (req, res) => res.sendStatus(200));
var _default = app;
exports.default = _default;
module.exports = app;