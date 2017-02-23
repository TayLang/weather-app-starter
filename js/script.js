var handleCoords = function(coordsObj) {
	var lat = coordsObj.coords.latitude,
		lng = coordsObj.coords.longitude,
		hashString = lat + '/' + lng + '/current'
	location.hash = hashString
}

var handleError = function(err) {
	console.log('Error!', err)
}

var handleCurrent = function(latitude,longitude) {
	var containerNode = document.querySelector('.weatherContainer')
	containerNode.innerHTML = '<p>gonna show you the Current weather at ' + latitude + ', ' + longitude + '</p>'
}

var handleDaily = function(latitude,longitude) {
	var containerNode = document.querySelector('.weatherContainer')
	containerNode.innerHTML = '<p>gonna show you the Daily weather at ' + latitude + ', ' + longitude + '</p>'
}

var handleHourly = function(latitude,longitude) {
	var containerNode = document.querySelector('.weatherContainer')
	containerNode.innerHTML = '<p>gonna show you the hourly weather at ' + latitude + ', ' + longitude + '</p>'
}

var controller = function() {
	var hashStr = location.hash.substr(1),
		hashParts = hashStr.split('/'),
		latitude = hashParts[0],
		longitude = hashParts[1],
		viewType = hashParts[2]

	if (hashParts.length < 3) {
		// if there is not enough information currently in the hash,
		 	// then get the user's current location, and write 
		 	// a new hash accordingly
		navigator.geolocation.getCurrentPosition(handleCoords, handleError)
		return // leave the controller. the controller will run again when
		// handleCoords causes another hashchange
	}

	if (viewType === 'current') {
		handleCurrent(latitude,longitude)
	}

	else if (viewType === 'daily') {
		handleDaily(latitude,longitude)
	}

	else if (viewType === 'hourly') {
		handleHourly(latitude,longitude)
	}
}

window.addEventListener('hashchange', controller)

controller()