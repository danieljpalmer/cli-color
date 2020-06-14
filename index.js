var inquirer = require('inquirer');
const generateGrays = require('./methods/generate-grays');
const generatePalette = require('./methods/generate-palette');
const Palette = require('./Palette');

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
    return console.log(colors);
    // let palette = {};

    // primaries = await generatePalette(primary);

    // palette = {...primaries};
    
    // if (wantsGrays) {
    //     const grays = await generateGrays(primary);
    //     palette = {...palette, ...grays};
    // }

    // if (wantsUtilities) {
    //     const utilities = {
    //         success: '',
    //         error: '',
    //         warning: ''
    //     };
    //     palette = {...palette, ...utilities};
    // }
    
    // return console.log(palette);
    
  })
