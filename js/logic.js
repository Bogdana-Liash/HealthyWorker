"use strict";

;(function(){

	// intervals in minutes
	var shortInterval = 1;
	// calc interval in milliseconds
	shortInterval = shortInterval * 1000;
	// time of start day
	var currentTime;

	// set current Date/Time
	function currentTime(){
		var timeFull = new Date();
		var time = {
			"hours": timeFull.getHours(),
			"minutes": timeFull.getMinutes()
		}
		return time;
	}

	// short timer (eye rest)
	function eyeRestTimer (currentTime, shortInterval){

		setTimeout(function() { 
			console.log('start timer');
		}, shortInterval);

	}

	function notify (title, result, el){
		
		//set permission
		if (!('permission' in Notification)) {
	        Notification.permission = result;
	    }

	    var permission = Notification.permission;

	    if (permission === 'default') {
			console.log("def", result, "+",  Notification.permission); 
			title.textContent = "The permission request was dismissed.";
			return;
		}

		if (permission === 'denied') {
			console.log("den", result, "+", Notification.permission); 
			title.textContent = "Permission wasn\'t granted. Allow a retry.";
			return;
		}

		if (permission === 'granted') {
			console.log("gran", result, "+", Notification.permission);
			startNotify()
		}
		
	}

	function startNotify(){
		console.log("granted", "+",  Notification.permission); 
		// remove start button
		document.querySelector("#check").remove();
	  	//start notify
	  	console.log('test');
	  	var notification = new Notification("Hi there!");
	  	document.querySelector("#config").remove();
	  	document.querySelector("#day").classList.remove('hide');
	}

	// start check config
	document.querySelector("#check").addEventListener("click", function(){

		var title = document.querySelector("#config h1"); 

		// check possibility to send notifications
		if (!Notification) {
			// remove start button
			this.remove();
			title.textContent = "Desktop notifications not available in your browser. Try Chromium.";
			return;
		}
		console.log("st", Notification.permission);   

		if (Notification.permission !== "granted"){

			title.textContent = "Please allow notifications."

			//request permission to notifications
			window.Notification.requestPermission().then(function(result) {

				notify(title, result);

			});
		}

		if (Notification.permission === "granted"){

			startNotify()

		}
		
	});
	// end check config

	//start day
	document.querySelector("#start-day").addEventListener("click", function(){
		//remove start messages
		document.querySelector("#before-work-wrapper").remove();

		//set time of start day
		currentTime = currentTime();

		// start short timer
		eyeRestTimer(currentTime, shortInterval);
		console.log(Notification.permission);
	});

}) ();