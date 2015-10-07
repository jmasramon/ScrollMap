'use strict';
/* global define*/
(function(name, context, factory) {
    // Supports UMD. AMD, CommonJS/Node.js and browser context
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        context[name] = factory();
    }
}) ('utilities', this, function() { 

    function calculateBinIntensities (scrollHeights, pageHeight, binCount) {
        var binIntensities = [],
            binLeft = binCount,
            binId;

        while (binLeft--) { binIntensities.push(0); }

        scrollHeights.forEach(function(scrollHeight) {
            binId = map2Bin(scrollHeight, 0, pageHeight, 0, binCount);
            binIntensities[binId] = binIntensities[binId] ? (binIntensities[binId] + 1) : 1;
        });
        return binIntensities;
    }

    function map2Bin(curVal, minVal, maxVal, minBinNum, maxBinNum) {
        var numRegions = (maxBinNum - minBinNum),
            verticalOffset = (curVal - minVal),
            verticalRange = (maxVal - minVal),
            normalizedHeight = (verticalOffset / verticalRange),
            binCardinality = (numRegions * normalizedHeight),
            absBinNum = minBinNum + binCardinality;

        return Math.floor(absBinNum);
    }

    function calculateBinColours (binIntensities, binCount, minBinIntensity, maxBinIntensity) {
        var binColours = new Array(binCount);

        binIntensities.forEach(function(intensity, i) {
            binColours[i] = mapIntensityToColor(intensity,
                minBinIntensity,
                maxBinIntensity, binCount);
        });
        return binColours;
    }

    // TODO: take out the remaining magic numbers
    function mapIntensityToColor(intensity, min, max, binCount) {
        var MIN_RGB_VAL = 0,
            MAX_RGB_VAL = 255,
            COLOUR_BIN_COUNT = 5,
            colourRange = map2Bin(intensity, min, max, MIN_RGB_VAL, MAX_RGB_VAL),
            step = (max - min) / COLOUR_BIN_COUNT;

        if (colourRange > 204) {
            return [MAX_RGB_VAL, map2Bin(intensity, max - step, max, MAX_RGB_VAL, MIN_RGB_VAL), MIN_RGB_VAL];
        }
        if (colourRange > 153) {
            return [map2Bin(intensity, max - 2 * step, max - step, MIN_RGB_VAL, MAX_RGB_VAL), MAX_RGB_VAL, MIN_RGB_VAL];
        }
        if (colourRange > 102) {
            return [MIN_RGB_VAL, MAX_RGB_VAL, map2Bin(intensity, max - 3 * step, max - 2 * step, MAX_RGB_VAL, MIN_RGB_VAL)];
        }
        if (colourRange > 51) {
            return [MIN_RGB_VAL, map2Bin(intensity, max - 4 * step, max - 3 * step, MIN_RGB_VAL, MAX_RGB_VAL), MAX_RGB_VAL];
        }
        return [map2Bin(intensity, min, max - 4 * step, MAX_RGB_VAL, MIN_RGB_VAL), MIN_RGB_VAL, MAX_RGB_VAL];
    }

    var utilitiesFactory = {
        calculateBinIntensities: calculateBinIntensities,
        map2Bin: map2Bin,
        calculateBinColours: calculateBinColours,
        mapIntensityToColor: mapIntensityToColor
    };

    return utilitiesFactory;
});