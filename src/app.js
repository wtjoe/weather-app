const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joe Robbins'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joe Robbins'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Hello!  Here is a helpful message',
        name: 'Joe Robbins'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })

          })
    })





})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })

    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        message: 'This help article does not exist!',
        name: 'Joe Robbins'
    })
})

app.get('*', (req, res) =>  {
    res.render('404', {
        title: '404',
        message: 'This page does not exist',
        name: 'Joe Robbins'
    })

})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})