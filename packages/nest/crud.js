'use strict';
exports.__esModule = true;
var shelljs_1 = require('shelljs');
var commander_1 = require('commander');
var program = new commander_1.Command();
program.option('-d, --destination <type>', 'destination', 'services');
var destination = program.parse(process.argv).opts().destination;
var services = program.args;
services.forEach(function (service) {
  var servicePath = destination + '/' + service;
  shelljs_1.exec(
    'nest g -c nestjsx-crud-schematics crud ' + servicePath + ' --no-spec',
  );
  console.log('Created ' + servicePath);
});
