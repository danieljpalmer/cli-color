#! /usr/bin/env node

var inquirer = require('inquirer');
const Palette = require('./Palette');
const clipboardy = require('clipboardy');
const chalk = require('chalk');

inquirer
  .prompt([
    { 
        name: 'primary',
        type: 'input',
        message: 'What\'s your primary color Hex value?',
        default: function () {
            return '#5A67D8'
        },
        filter: function (hex) {
            if (hex[0] !== '#') {
                return `#${hex}`;
            } else {
                return hex;
            }
        },
        validate: function (hex) {
            return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
        }
    },
    {
        name: 'grays',
        type: 'confirm',
        message: 'Would you like a complementary gray palette?'
    },
    {
        name: 'utilities',
        type: 'confirm',
        message: 'Would you like a set of utility colors (success, error, warning)?'
    }
  ])
  .then(async answers => {
   
    const primary = answers.primary;
    const wantsGrays = answers.grays;
    const wantsUtilities = answers.utilities;

    const palette = await new Palette({ primary, wantsGrays, wantsUtilities});
    const colors = palette.getColors();

    console.log(chalk.inverse.bold("Here's your palette:"));
    clipboardy.writeSync(JSON.stringify(colors));
    console.log(colors);
    return console.log(chalk.inverse.bold("We've copied that to your clipboard!"));
  });
