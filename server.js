if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const path = require('path')

const port = process.env.PORT || 5000

const app = express()


app.use(express.static('public'))

app.get('*', (req, res) => res.sendFile(path.resolve('public/index.html')))

app.listen(port)
console.log('server listening on port ', port)
