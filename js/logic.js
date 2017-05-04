"use strict";

;(function(){

	// intervals in minutes
	var shortInterval = 1;
	//calc interval in milliseconds
	shortInterval = shortInterval * 1000;
	// time of start day
	var currentTime;

	//set current Date/Time
	function currentTime(){
		var timeFull = new Date();
		var time = {
			"hours": timeFull.getHours(),
			"minutes": timeFull.getMinutes()
		}
		return time;
	}

	//short timer (eye rest)
	function eyeRestTimer (currentTime, shortInterval){

		setTimeout(function() { 
			console.log('start timer');
		}, shortInterval);

	}

	//start day
	document.querySelector("#start-day").addEventListener("click", function(){
		//remove start messages
		document.querySelector("#before-work-wrapper").remove();

		//set time of start day
		currentTime = currentTime();

		// start short timer
		eyeRestTimer(currentTime, shortInterval);

	});

}) ();