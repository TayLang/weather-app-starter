// weather url https://api.darksky.net/forecast/f693ad4fa47137321f70f403e91be488/37.8267,-122.4233


var baseURL = 'https://api.darksky.net/forecast/f693ad4fa47137321f70f403e91be488',
	weatherNode = document.querySelector('.weather')

var onCurrentPositionFound = function(foundPosition) {
	var lat = foundPosition.coords.latitude
	var lng = foundPosition.coords.longitude
	console.log(lat, lng)
	location.hash = lat + '/' + lng + '/' + 'current'
}

var handleCurrentWeatherResponse = function(weatherObject) {
	// var currentTemp = weatherObject.currently.temperature
	// var chanceOfRain = weatherObject.currently.precipProbability
	// var skyStatus = weatherObject.currently.summary
	// var windSpeed = weatherObject.currently.windSpeed
	// console.log(currentTemp)
	// console.log(chanceOfRain)
	// console.log(skyStatus)
	// console.log(windSpeed)
	var finalWeatherHTML = ''
	var containerNode = document.querySelector('.weatherContainer')
	finalWeatherHTML += renderHTML(weatherObject)
	containerNode.innerHTML = finalWeatherHTML

}

var renderHTML = function(weatherObject) {
	var getHTML = ''
	getHTML += '<h1 class="temp">' + weatherObject.currently.temperature + '&#8457' + '</h1>'
	getHTML += '<p class="windSpeed">' + 'The current wind speed is ' + weatherObject.currently.windSpeed + 'mph' + '</p>'
	getHTML += '<p class="skyStatus">' + 'Skies are ' + weatherObject.currently.summary + '</p>'
	getHTML += '<p class="rainChance">' + 'The chance of precipitation is ' + weatherObject.currently.precipProbability + '</p>'
	return getHTML
}

var onCurrentPositionNotFound = function() {
	alert('Sam is awesome')
}


var makeNavString = function(lat,lng) {
	// use the lat and lng to write 
	// the buttons/links for current, daily, and hourly 
	// views
	// stick them onto the DOM
	//refer to amanda's slack
}
var hashController = function() {
	console.log('hashController')
	// hash must have form #LAT/LNG/VIEWTYPE
	// read the latitude, longitude, and viewtype from the hash

		// the lat and long should be used to construct an api request url
		// make that request, store the promise.

		// depending on the viewtype, assign one of three view rendering functions
		// to run when the response comes back


	var hashString = location.hash.substr(1),
		hashParts = hashString.split('/'),
		lat = hashParts[0],
		lng = hashParts[1],
		viewType = hashParts[2]


	makeNavString(lat,lng)

	if (hashParts.length < 3) {
		console.log('<3')
		navigator.geolocation.getCurrentPosition(onCurrentPositionFound, onCurrentPositionNotFound)
		// redirect the user. tbd later.
		// default behavior. run a function to get current position, writing the 
			// current lat and long to the hash after some delay. let the controller
			// kick back into action at that point.
		return 
	}

	var requestURL = baseURL + '/' + lat + ',' + lng + '?callback=?'


	if (viewType === 'current')  {
		var weatherPromise = $.getJSON(requestURL)
		weatherPromise.then(handleCurrentWeatherResponse)
		// queue up the currentRenderer
		console.log('showing current data')
	}

	else if (viewType === 'daily') {
		var weatherPromise = $.getJSON(requestURL)
		weatherPromise.then(handleDailyWeatherResponse)
		// queue up the dailyRenderer
		alert('showing daily data')

	}

	else if (viewType === 'hourly') {
		var weatherPromise = $.getJSON(requestURL)
		weatherPromise.then(handleHourlyWeatherResponse)
		//queue up the hourly renderer
		alert('showing hourly data')
	}
}

window.addEventListener('hashchange',hashController)

hashController()