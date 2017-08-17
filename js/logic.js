"use strict";

;(function(){

	// intervals for work in minutes
	var shortInterval = 2;
	// calc interval in milliseconds
	shortInterval = shortInterval * 60000;

	// work pause interval
	var pauseInterval = 60000;

	// short timer
	var shortTimer;

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

	function notify (title, result, el){
		
		//set permission
		if (!('permission' in Notification)) {
	        Notification.permission = result;
	    }

	    var permission = Notification.permission;

	    if (permission === 'default') {
			title.textContent = "The permission request was dismissed.";
			return;
		}

		if (permission === 'denied') {
			title.textContent = "Permission wasn\'t granted. Allow a retry.";
			return;
		}

		if (permission === 'granted') {
			startNotify()
		}
		
	}

	function startNotify(){

		// remove start button
		document.querySelector("#check").remove();	  	
	  	document.querySelector("#config").remove();
	  	document.querySelector("#day").classList.remove('hide');

	}

	// short timer (need eye rest)
	function eyeRestTimer (shortInterval){

		console.log('start timer');

		shortTimer = setTimeout(function() { 
			console.log('finish timer');
			new Notification("You need to rest for eyes!");
			document.querySelector("#short-pause").classList.remove('hide');
		}, shortInterval);

	}

	// rest timer (pause in work)
	function pauseTimer (interval){

		document.querySelector("#work-wrapper").classList.add('hide');

		console.log('start pause');

		setTimeout(function() { 
			console.log('finish pause');
			new Notification("You can start work :)");
			document.querySelector("#short-pause").classList.add('hide');
			document.querySelector("#work-wrapper").classList.remove('hide');

			// start short timer
			eyeRestTimer(shortInterval);

		}, interval);

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

		// start short timer
		eyeRestTimer(shortInterval);

	});

	//start short pause in work
	document.querySelector("#pause").addEventListener("click", function(){

		//hide pause messages
		document.querySelector("#short-pause").classList.add('hide');

		// stop short timer
		clearInterval(shortTimer);	

		pauseTimer(pauseInterval)

	});

}) ();