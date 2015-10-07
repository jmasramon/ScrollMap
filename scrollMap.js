'use strict';
/* global define*/
(function (name, context, factory) {
    // Supports UMD. AMD, CommonJS/Node.js and browser context
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      define(factory);
    } else {
      context[name] = factory();
    }
}) ('scrollMap', this, function () {
    var pageHeight = 600,
        binHeight = 50,
        heightRegions = Math.floor(pageHeight / binHeight),
        binNum = heightRegions,
        regionHeight = (pageHeight / heightRegions),
        binIntensities = [],
        userScrollHeights = [0, 25, 50, 100, 200, 250, 300, 400, 450, 500],
        binColours = new Array(heightRegions),
        binMax = 0,
        shadowCtx,
        ctx;
    
    while (binNum--) { binIntensities.push(0); }
    
    binIntensities.forEach(function (value) {
        if (value > binMax) {
            binMax = value;
        }
    });
    
    userScrollHeights.forEach(function (scrollHeight) {
        var binId = Math.floor(map2Bin(scrollHeight, 0, pageHeight, 0, heightRegions));
        binIntensities[binId] = binIntensities[binId] ? (binIntensities[binId] + 1) : 1;
    });
    
    function map2Bin(curVal, startVal, endVal, initBinNum, endBinNum) {
        var numRegions = (endBinNum - initBinNum),
            verticalOffset = (curVal - startVal),
            verticalRange = (endVal - startVal),
            normalizedHeight = (verticalOffset / verticalRange),
            binCardinality = (numRegions * normalizedHeight),
            absBinNum = initBinNum + binCardinality;
    
        return absBinNum;
    }
    
    binIntensities.forEach(function (intensity, i) {
        binColours[i] = mapIntensityToColor(intensity, 
                                            Math.min.apply(Math, binIntensities), 
                                            Math.max.apply(Math, binIntensities));
    });
    
    function mapIntensityToColor(intensity, min, max) {
        var intensityRange = map2Bin(intensity, min, max, 0, 255),
            step = (max - min) / heightRegions;
    
        if (intensityRange > 204) {
            return [255, Math.floor(map2Bin(intensity, max - step, max, 255, 0)), 0]; 
        }
        if (intensityRange > 153) {
            return [Math.floor(map2Bin(intensity, max - 2 * step, max - step, 0, 255)), 255, 0]; 
        }
        if (intensityRange > 102) {
            return [0, 255, Math.floor(map2Bin(intensity, max - 3 * step, max - 2 * step, 255, 0))]; 
        }
        if (intensityRange > 51) {
            return [0, Math.floor(map2Bin(intensity, max - 4 * step, max - 3 * step, 0, 255)), 255]; 
        }
        return [Math.floor(map2Bin(intensity, min, max - 4 * step, 255, 0)), 0, 255]; 
    }
       
    function ScrollMap (containerId) {
        appendCanvasToContainer(document.getElementById(containerId));
        ctx.globalAlpha=0.2;
        binColours.forEach(function(col, i) {
            var colour;
            colour = 'rgb(' + col[0] + ',' +
                            col[1] + ',' + col[2] +')';
            ctx.fillStyle = colour;    
            ctx.fillRect(0, i*regionHeight, 600, regionHeight); 
        }); 
    }  

    ScrollMap.prototype.setData = function(data) {
        binColours.forEach(function(col, i) {
            var colour;
            colour = 'rgb(' + col[0] + ',' +
                            col[1] + ',' + col[2] +')';
            ctx.fillStyle = colour;    
            ctx.fillRect(0, i*regionHeight, 600, regionHeight); 
        }); 
    };
    
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
