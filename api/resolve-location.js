const fetch = require('node-fetch')
const API_KEY = process.env.API_KEY

const GEO_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/reverse';

module.exports = (req, res) => {
	const qs = {
		lat: req.query.lat,
		lon: req.query.lon
	}
	fetch(`${GEO_ENDPOINT}?lat=${qs.lat}&lon=${qs.lon}&appid=${API_KEY}`)
	  .then(res => res.json())
		.then(result => typeof(result) !== "undefined" ? result[0] : {message: 'Unable to fetch location.'} )
    	.then(res.send.bind(res))
}
