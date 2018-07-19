const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Odoo = require('./odoo_call');
const utils = require('./utils');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// Parser do Form...
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static('public'));


app.get('/login', (req, res) => {
	res.render('login.hbs', {
		pageTitle: 'Login',
	});

});

app.get('/search', (req, res) => {
	res.render('search.hbs', {
		pageTitle: 'Search',
	});

});

app.post('/login/submit', function(req, res){
	
	let vals = req.body;
	let port = '8069';
	if(vals.check_port){
   		port = vals.port;
   		console.log(port);
   	}else{
   		// const port = '8069';
   		console.log('Else');
   	}
   let login = {
   		url: vals.urlOdoo,
   		port: port,
   		bd: vals.bdOdoo,
   		userName: vals.userLogin,
   		password: vals.userPassword,
   		req: req,
   		res: res
   }
   console.log(login);

   utils.odooConnection(login);
 
});


app.get('/home', (req, res) => {
	res.render('home.hbs',{
		welcomeMessage: "Bem vindo ao Webservice interface"
	})
});

app.get('/bad', (req, res) => {
	res.render('bad.hbs',{
		errorMessage: "Conexão não foi completa...."
	})
});

// O Segundo argumento do Listen é opcional...
app.listen(port, () =>{
	console.log(`Server is running on port ${port}`);
});


// Url Para busca...
app.post('/search/find', function(req, res){
	console.log(req.body);
});