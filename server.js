const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// Parser do Form...
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/login', (req, res) => {
	res.render('login.hbs', {
		pageTitle: 'Login',
	});

});

app.post('/login/submit', function(req, res){
   console.log(req.body);
   res.redirect('/home');
 });

app.get('/home', (req, res) => {
	res.render('home.hbs',{
		welcomeMessage: "Bem vindo ao Webservice interface"
	})
});





// O Segundo argumento do Listen é opcional...
app.listen(port, () =>{
	console.log(`Server is running on port ${port}`);
});
