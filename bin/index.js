#! /user/bin/env node
const states=require("../util/states");
const districts=require("../util/districts");
const slots=require("../util/slots");
const program=require("commander");
// states(); 
// districts(15);
slots(240);
// program
//   .command('states')
//   .description('List down all the states')
//   .action(states);
//   program
//   .command('districts <stateid>')
//   .description('Get all districts for states using StateId')
//   .action(districts);
//   program
//   .command('slots <districtid>')
//   .description('Get all slots for district id')
//   .action(slots);
// program.parse();
