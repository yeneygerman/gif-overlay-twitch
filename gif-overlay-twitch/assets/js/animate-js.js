/* Created by https://github.com/yeneygerman */
/* 15 January 2022 */
/* Chibi may start flipped to left or right */
/* If the current position is less than 100, it is facing to the right. */
/* If the current position is more than 750, it is flipped to the left. */
/* Otherwise, it's random */
/* Chibi's speed is random */
/* Chibi's initial position is random */

$(document).ready(function() {
	
	var globalChibiWidth = 300;
	
	var globalMinChibi = 1;
	var globalMaxChibi = 6;
	
	var globalMinLeftPos = 0;
	var globalMaxLeftPos = 950;
	
	var globalMinSpeed = 8500;
	var globalMaxSpeed = 9600;
	
	var globalMinPos = 100;
	
	var createChibi = function() {			
		var html = "";
		
		for (var chibiCount = globalMinChibi; chibiCount < globalMaxChibi; chibiCount++) {
			var leftPosition = randomIntFromInterval(globalMinLeftPos, globalMaxLeftPos);
			var flipClass = "";
			var flipIt = randomBool();
			
			if (leftPosition < (globalMinLeftPos + globalMinPos)) {
				flipClass = ""
			}
			else if (flipIt || leftPosition > (globalMaxLeftPos - globalMinPos)) {
				flipClass = "flip";
			}
			
			html += '<div id="chibi-' + chibiCount + '" style="position:absolute;left:' + leftPosition.toString() + 'px">';
			html += '<img id="img-chibi-' + chibiCount + '" class="' + flipClass + '" src="assets/chibi/chibi-' + chibiCount + '.gif" width="' + globalChibiWidth + 'px" height="auto" />';
			html += '</div>';
		}
		
		jQuery("#chibi-div").append(html);
	}
	
	var animateChibi = function(id, speed) {
		
		var currentPos = $("#chibi-" + id).css("left").replace("px","");			
		console.log(currentPos);		
		
		if ($("#img-chibi-" + id).hasClass("flip")) {
			
			$("#chibi-" + id).animate({left:'-=' + currentPos + 'px'}, speed,
				function () { 
					$("#img-chibi-" + id).removeClass("flip");				
					$("#chibi-" + id).animate({left:'+=' + globalMaxLeftPos + 'px'}, speed,
						function () { $("#img-chibi-" + id).addClass("flip");
							animateChibi(id, speed);
						});
			});	
		}
		else {
			
			var walkTo = globalMaxLeftPos - currentPos;
		
			$("#chibi-" + id).animate({left:'+=' + walkTo + 'px'}, speed,
				function () { 
					$("#img-chibi-" + id).addClass("flip");				
					$("#chibi-" + id).animate({left:'-=' + globalMaxLeftPos + 'px'}, speed,
						function () { $("#img-chibi-" + id).removeClass("flip");
							animateChibi(id, speed);
						});
			});		
		}
	}
		
	createChibi();
	
	for (var i = globalMinChibi; i < globalMaxChibi; i++) {
		var speed = randomIntFromInterval(globalMinSpeed, globalMaxSpeed);
		
		animateChibi(i, speed);
	}

});