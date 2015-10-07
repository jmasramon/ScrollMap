'use strict';
/* global describe, beforeEach, it, expect, utilities*/
describe('Utilities', function() {
	var util;
    var pageHeight = 600,
        binHeight = 50,
        scrollHeights = [0, 25, 50, 100, 110, 250, 299, 401, 450, 500],
        binCount;

	beforeEach(function() {
		util = utilities;
		binCount = Math.floor(pageHeight / binHeight);	
	});

	it('should map scroll heights to correct height bin', function() {
		expect(
			util.map2Bin(
				scrollHeights[0], 0, pageHeight, 0, binCount))
		.toEqual(0);
		
		expect(
			util.map2Bin(
				scrollHeights[1], 0, pageHeight, 0, binCount))
		.toEqual(0);
		
		expect(
			util.map2Bin(
				scrollHeights[2], 0, pageHeight, 0, binCount))
		.toEqual(1);
		
		expect(
			util.map2Bin(
				scrollHeights[3], 0, pageHeight, 0, binCount))
		.toEqual(2);
		
		expect(
			util.map2Bin(
				scrollHeights[4], 0, pageHeight, 0, binCount))
		.toEqual(2);
		
		expect(
			util.map2Bin(
				scrollHeights[5], 0, pageHeight, 0, binCount))
		.toEqual(5);
		
		expect(
			util.map2Bin(
				scrollHeights[6], 0, pageHeight, 0, binCount))
		.toEqual(5);
		
		expect(
			util.map2Bin(
				scrollHeights[7], 0, pageHeight, 0, binCount))
		.toEqual(8);
		
		expect(
			util.map2Bin(
				scrollHeights[8], 0, pageHeight, 0, binCount))
		.toEqual(9);
		
		expect(
			util.map2Bin(
				scrollHeights[9], 0, pageHeight, 0, binCount))
		.toEqual(10);
	});

	it('should map bin intensities to correct colour range', function() {
		var max = 2,
			min = 0;

		expect(
			util.map2Bin(2, min, max, 0, 255))
		.toEqual(255);
		
		expect(
			util.map2Bin(1.5, min, max, 0, 255))
		.toEqual(191);
		
		expect(
			util.map2Bin(1, min, max, 0, 255))
		.toEqual(127);
		
		expect(
			util.map2Bin(0.7, min, max, 0, 255))
		.toEqual(89);
		
		expect(
			util.map2Bin(0.5, min, max, 0, 255))
		.toEqual(63);
		
		expect(
			util.map2Bin(0, min, max, 0, 255))
		.toEqual(0);
	});

	it('should map bin intensities to correct colour bin', function() {
		var max = 2,
			min = 0,
			step = (max - min) / 5;

		expect(step).toEqual(2/5);
		expect(step).toBeCloseTo(0.4);

		expect(
			util.map2Bin(2, (max - step), max, 255, 0))
		.toEqual(0);
		
		expect(
			util.map2Bin(1.5, (max - 2 * step), (max - step), 0, 255))
		.toEqual(191);
		
		expect(
			util.map2Bin(1, (max - 3 * step), (max - 2 * step), 255, 0))
		.toEqual(127);
		
		expect(
			util.map2Bin(0.5, (max - 4 * step), (max - 3 * step), 0, 255))
		.toEqual(63);
		
		expect(
			util.map2Bin(0, min, (max - 4 * step), 255, 0))
		.toEqual(255);
	});


	it('should calculate bin intensities', function() {
		expect(
			util.calculateBinIntensities(
				scrollHeights, pageHeight, binCount))
		.toEqual([2,1,2,0,0,2,0,0,1,1,1,0]);
	});

	it('should map intensities to proper colours', function() {
		expect(
			util.mapIntensityToColor(
				2, 0, 2, binCount))
		.toEqual([255,0,0]);
		
		expect(
			util.mapIntensityToColor(
				1, 0, 2, binCount))
		.toEqual([0,255,127]);
		
		expect(
			util.mapIntensityToColor(
				0, 0, 2, binCount))
		.toEqual([255,0,255]);
		
	});

	it('should calculate bin Colours', function() {
		var binIntensities = util.calculateBinIntensities(scrollHeights, pageHeight, binCount),
			maxBinIntensity = Math.max.apply(Math, binIntensities),
	        minBinIntensity = Math.min.apply(Math, binIntensities);	
		expect(
			util.calculateBinColours (
				binIntensities, binCount, minBinIntensity, maxBinIntensity))
		.toEqual( [ [ 255, 0, 0 ], 	 [ 0, 255, 127 ], [ 255, 0, 0 ], 
					[ 255, 0, 255 ], [ 255, 0, 255 ], [ 255, 0, 0 ], 
					[ 255, 0, 255 ], [ 255, 0, 255 ], [ 0, 255, 127 ], 
					[ 0, 255, 127 ], [ 0, 255, 127 ], [ 255, 0, 255 ] ]);
	});

	
});