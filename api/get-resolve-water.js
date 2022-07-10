const fetch = require('node-fetch')
const API_KEY = process.env.API_KEY

const GEO_ENDPOINT = 'https://api.openweatherma


const lat = 58.7984;
const lng = 17.8081;
const params = 'waveHeight,airTemperature';

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': 'example-api-key'
  }
}).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.
});

module.exports = (req, res) => {
	const qs = {
		lat: req.query.lat,
		lon: req.query.lon
	}
	fetch(`${GEO_ENDPOINT}?lat=${qs.lat}&lon=${qs.lon}&appid=${API_KEY}`)
	  .then(res => res.json())
		.then(result => typeof(result) !== "undefined" ? result[0] : {message: 'Unable to fetch location.'} )
    	.then(res.send.bind(res))
	
	//   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${api_key}&units=metric`)
	// 	  .then(res => res.json())
	// 		.then(result => result.count === 1 ? result.data[0] : {message: 'no data'} )
	//     .then(res.send.bind(res))
	
	// res.send({
	// 	country: "HO",
	// 	lat: 11.12,
	// 	lon: 33.44,
	// 	name: 'Marama',
	// })
	//res.send({ temp: '74' })
}
