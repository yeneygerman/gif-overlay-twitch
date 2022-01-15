/* Created by https://github.com/yeneygerman */
/* 15 January 2022 */

var randomIntFromInterval = function(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var randomBool = function () {
	return Math.random() < 0.5;
}