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
	finalWeatherHTML += renderCurrentHTML(weatherObject)
	containerNode.innerHTML = finalWeatherHTML

}

var renderCurrentHTML = function(weatherObject) {
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
var WeatherRouter = Backbone.Router.extend({
	
	routes: {
		"current" : "showCurrentPage",
		"hourly" : "showHourlyPage",
		"daily" : "showDailyPage",
		":lat/:lng/:viewType": "showWeatherStuff",
		"*default" : "redirectToHome"
	},

	redirectToHome: function() {
		location.hash = 'current'
	},

	showCurrentPage: function() {
		var weatherPromise = $.getJSON('https://api.darksky.net/forecast/f693ad4fa47137321f70f403e91be488/37.8267,-122.4233')
		weatherPromise.then(handleCurrentWeatherResponse)
		renderCurrentHTML()
	},

	showHourlyPage: function() {
		renderHourlyPage()
	},
	showDailyPage: function() {
		renderDailyPage()
	},
	showWeatherStuff: function(lat, lng, viewType) {
		renderSearchPage()
	}
})

var rtr = new WeatherRouter()
Backbone.history.start()