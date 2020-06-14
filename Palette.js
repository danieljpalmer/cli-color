"use strict";
var convert = require('color-convert');

module.exports = class Palette {

    constructor ({ primary, wantsGrays, wantsUtilities }) {

        this.primary = primary;
        this.wantsGrays = wantsGrays;
        this.wantsUtilities = wantsUtilities;
        this.grays = {};
        this.primaries = {};
        this.utilities = {};

        return (async () => {
            await this.generatePrimaries();

            if (wantsGrays) {
                await this.generateGrays();
            }
    
            if (wantsUtilities) {
                await this.generateUtilities();
            }
    
            return this;
        })();
    }

    getColors () {
        let palette = {...this.primaries};

        if (this.wantsGrays) {
            palette = {...palette, ...this.grays}
        }

        if (this.wantsUtilities) {
            palette = {...palette, ...this.utilities}
        }

        return palette;
    }

    async generatePrimaries () {
        const hex = this.primary;
        const hsl = convert.hex.hsl(hex);

        const hue = hsl[0];

        let hsl_array = [
            [hue, 100, 97],
            [hue, 96, 89],
            [hue, 93, 77],
            [hue, 90, 65],
            [hue, 84, 57],
            [hue, 75, 50],
            [hue, 71, 44],
            [hue, 65, 37],
            [hue, 61, 30],
        ];

        return this.primaries = this.generateColorHash({ hsl_array, name: 'primary' });
    }

    async generateGrays () {
        const hex = this.primary;
        const hsl = convert.hex.hsl(hex);

        const hue = hsl[0];

        const hsl_array = [
            [hue, 45, 98],
            [hue, 38, 95],
            [hue, 32, 91],
            [hue, 25, 84],
            [hue, 20, 69],
            [hue, 15, 52],
            [hue, 17, 35],
            [hue, 23, 23],
            [hue, 26, 24],
        ];

        return this.grays = this.generateColorHash({ hsl_array, name: 'gray' });
    }

    generateColorHash({ hsl_array, name }) {
        return hsl_array.reduce((object, color, index) => {
            const identifier = `${name}-${index + 1}00`;
            const hex = convert.hsl.hex(color);
            object[identifier] = `#${hex}`;
            return object;
        }, {});
    }

    async generateUtilities () {
        return this.utilities = {
            success: '#1AC79E',
            error: '#E73434',
            warning: '#F1AA20'
        }
    }

}