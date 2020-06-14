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
        return this.primaries = {
            'primary': this.primary,
            'primary-100': '#000',
            'primary-200': '#000',
            'primary-300': '#000',
        }     
    }

    async generateUtilities () {
        return this.utilities = {
            success: '',
            error: '',
            warning: ''
        }
    }

    async generateGrays () {
        const hex = this.primary;
        const hsl = convert.hex.hsl(hex);

        const hue = hsl[0];

        const hsl_grays = [
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

        const hex_grays = hsl_grays.reduce((object, gray, index) => {
            const identifier = `gray-${index + 1}00`;
            const hex = convert.hsl.hex(gray);
            object[identifier] = `#${hex}`;
            return object;
        }, {});

        return this.grays = hex_grays;
    }

}