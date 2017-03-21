const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


//Setting up bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));


//Middleware saving server.log
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});


//Middleware to use if site is under maintance 
app.use((req, res, next)=>{
    res.render('maintance.hbs',{
        title: 'Under Maintance'
    });
});


hbs.registerPartials(__dirname + '/views/layouts');
app.set('view_engine', 'hbs');


//Register Partial helpers
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});


//Register Home Page Route
app.get('/', (req, res)=> {
    res.render('home.hbs', {
        title: 'Home Page',
    });
});


//Register About Page Route
app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        title: 'About Us',
    });
});





app.listen(port, ()=> {
     console.log(`Server Start on port ${port}!`)
});



// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.get('/', (req, res) => {
//     // res.send('<h1>Home Page</h1>');

//     res.send({
//         name : 'Andrew',
//         likes : [

//             'bikes',
//             'Moorcars'

//         ]


//     });

// });

// app.get('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

// POST method route
// app.get('/about', function (req, res) {
//   res.send('POST request to the About Page')
// })
