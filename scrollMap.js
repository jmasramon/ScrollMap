'use strict';
/* global define, util*/
(function(name, context, factory) {
    // Supports UMD. AMD, CommonJS/Node.js and browser context
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        context[name] = factory();
    }
}) ('scrollMap', this, function() {

    var shadowCtx,
        ctx;
    var 
        // pageHeight = 600,
        pageHeight = 1180,
        pageLength = 600,
        binHeight = 50,
        // scrollHeights = [0, 25, 50, 100, 110, 250, 299, 401, 450, 500];
        scrollHeights = [0, 50, 60, 110];

    function ScrollMap(containerId) {
        var binCount = Math.floor(pageHeight / binHeight),
            // binIntensities = util.calculateBinIntensities(scrollHeights, pageHeight, binCount),
            binIntensities = [
                0.37037037037037035,
                0.37037037037037035,
                0.37037037037037035,
                0.37037037037037035,
                0.37037037037037035,
                0.37037037037037035,
                0.4074074074074074,
                0.4074074074074074,
                0.4074074074074074,
                0.4444444444444444,
                0.4444444444444444,
                0.4444444444444444,
                0.4444444444444444,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                1.00,
                0.6296296296296297,
                0.6296296296296297,
                0.6296296296296297,
                0.6296296296296297,
                0.6296296296296297,
                0.6296296296296297,
                0.5925925925925926,
                0.5925925925925926,
                0.5925925925925926,
                0.5555555555555556,
                0.5555555555555556,
                0.5555555555555556,
                0.5555555555555556],
            maxBinIntensity = Math.max.apply(Math, binIntensities).toFixed(2),
            minBinIntensity = Math.min.apply(Math, binIntensities).toFixed(2);
        
        this.binColours = util.calculateBinColours(binIntensities, binCount, 
                                            minBinIntensity, maxBinIntensity);
        
        appendCanvasToContainer(document.getElementById(containerId));
        ctx.globalAlpha = 0.2;
        
        this.binColours.forEach(function(col, i) {
            var colour;
            
            colour = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
            ctx.fillStyle = colour;
            ctx.fillRect(0, i * binHeight, pageLength, binHeight);
        });
    }

    ScrollMap.prototype.setData = function(data) {
        this.binColours.forEach(function(col, i) {
            var colour;
            colour = 'rgb(' + col[0] + ',' +
                col[1] + ',' + col[2] + ')';
            ctx.fillStyle = colour;
            ctx.fillRect(0, i * binHeight, pageLength, binHeight);
        });
    };

    // function calculateBinIntensities (scrollHeights, binCount) {
    //     var binIntensities = new Array(binCount),
    //         binId;

    //     scrollHeights.forEach(function(scrollHeight) {
    //         binId = Math.floor(map2Bin(scrollHeight, 0, pageHeight, 0, binCount));
    //         binIntensities[binId] = binIntensities[binId] ? (binIntensities[binId] + 1) : 1;
    //     });
    //     return binIntensities;
    // }

    // function map2Bin(curVal, startVal, endVal, initBinNum, endBinNum) {
    //     var numRegions = (endBinNum - initBinNum),
    //         verticalOffset = (curVal - startVal),
    //         verticalRange = (endVal - startVal),
    //         normalizedHeight = (verticalOffset / verticalRange),
    //         binCardinality = (numRegions * normalizedHeight),
    //         absBinNum = initBinNum + binCardinality;

    //     return absBinNum;
    // }

    // function calculateBinColours (binIntensities, binCount, minBinIntensity, maxBinIntensity) {
    //     var binColours = new Array(binCount);

    //     binIntensities.forEach(function(intensity, i) {
    //         binColours[i] = mapIntensityToColor(intensity,
    //             minBinIntensity,
    //             maxBinIntensity, binCount);
    //     });
    //     return binColours;
    // }

    // function mapIntensityToColor(intensity, min, max, binCount) {
    //     var intensityRange = map2Bin(intensity, min, max, 0, 255),
    //         step = (max - min) / binCount;

    //     if (intensityRange > 204) {
    //         return [255, Math.floor(map2Bin(intensity, max - step, max, 255, 0)), 0];
    //     }
    //     if (intensityRange > 153) {
    //         return [Math.floor(map2Bin(intensity, max - 2 * step, max - step, 0, 255)), 255, 0];
    //     }
    //     if (intensityRange > 102) {
    //         return [0, 255, Math.floor(map2Bin(intensity, max - 3 * step, max - 2 * step, 255, 0))];
    //     }
    //     if (intensityRange > 51) {
    //         return [0, Math.floor(map2Bin(intensity, max - 4 * step, max - 3 * step, 0, 255)), 255];
    //     }
    //     return [Math.floor(map2Bin(intensity, min, max - 4 * step, 255, 0)), 0, 255];
    // }

    function appendCanvasToContainer(container) {
        var shadowCanvas = document.createElement('canvas');
        var canvas = document.createElement('canvas');

        var computed = getComputedStyle(container) || {};
        var width = +(computed.width.replace(/px/, '')) || container.clientWidth;
        var height = +(computed.height.replace(/px/, '')) || container.clientHeight;

        canvas.className = 'heatmap-canvas';

        canvas.width = shadowCanvas.width = width;
        canvas.height = shadowCanvas.height = height;

        shadowCtx = shadowCanvas.getContext('2d');
        ctx = canvas.getContext('2d');

        canvas.style.cssText = shadowCanvas.style.cssText = 'position:absolute;left:0;top:0;';

        container.style.position = 'relative';
        container.appendChild(canvas);
    }

    var scrollMapFactory = {
        create: function(config) {
            return new ScrollMap(config);
        }
    };

    return scrollMapFactory;
});