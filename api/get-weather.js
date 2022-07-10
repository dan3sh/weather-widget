const fetch = require('node-fetch')
const API_KEY = process.env.API_KEY;
const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall'
module.exports = (req, res) => {
	const qs = {
		lat: req.query.lat,
		lon: req.query.lon
	}
	fetchData(qs, res);
}

function fetchData(qs, res) {
	fetch(`${WEATHER_ENDPOINT}?lat=${qs.lat}&lon=${qs.lon}&appid=${API_KEY}&exclude=minutely,hourly,daily,alerts&units=metric`)
		.then(res => res.json())
		.then(result => typeof (result) !== "undefined" ? result.current : { message: 'no data' })
		.then(res.send.bind(res));
}
