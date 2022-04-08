#!/usr/bin/env node
import { Command } from "../node_modules/commander/esm.mjs";
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('3.4.4')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>');
 
  program.parse(process.argv);