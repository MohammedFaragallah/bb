import { exec } from 'shelljs';
import { Command } from 'commander';

const program = new Command();

program.option('-d, --destination <type>', 'destination', 'services');

const { destination } = program.parse(process.argv).opts();

const services = program.args;

services.forEach((service) => {
  const servicePath = `${destination}/${service}`;

  exec(`nest g -c nestjsx-crud-schematics crud ${servicePath} --no-spec`);
  console.log(`Created ${servicePath}`);
});
