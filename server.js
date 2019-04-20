const express = require('express');
const handlebar = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

handlebar.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
  var dates = new Date().toString();
  var data = `${dates}: ${req.method} ${req.url}`;
  console.log(data);
  fs.appendFile('server.log',data +'\n',(err) => {
    if(err) {
      console.log('Unable to append to the file');
    }
  });
 next();
});

// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname+'/public'));//static method

handlebar.registerHelper('Date', () => {
  return new Date().getFullYear();
});

handlebar.registerHelper('Screamit',(tex) => {
    return tex.toUpperCase();
})

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home',
    text: ' Welocome to the Home page'
  });
});

app.get('/about',(req,res) => {
 res.render('about.hbs',{
     pageTitle: 'About page',
     text : 'Some text there'
 });
});

app.get('/bad',(req,res) => {
 res.send({
     errorMessage: 'Unable to connect to the server',
     error:'404'
 });
})
app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});