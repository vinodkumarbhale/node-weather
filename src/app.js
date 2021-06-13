const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');

app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: "weather index",
        name: 'vinod'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "this is the help page text",
        name: "vinod"
    });
})

//     app.get('/weather',(req,res)=>{
//         res.send('<h1>Weather h1</h1>');
//         })
app.get('/about', (req, res) => {
    res.render('about', {
        title: "about page",
        name: "vinod"
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "vinod",
        errorMessage: " help article page not found"
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "please send req params"
        })
    }
    console.log(req.query);

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "please send req params"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "vinod",
        errorMessage: "404 page not found"
    })
})
app.listen(port, () => {
    console.log("server is up"+ port)
})