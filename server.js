const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Odoo = require('./odoo_call');
const utils = require('./utils');
var path    = require("path");


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
   };

   utils.writeJsonDB(login);
   login['req'] = req;
   login['res'] = res;
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

app.get('/new', (req, res) =>{
	res.sendFile(path.join(__dirname+'/views/angular.html'));
});



app.post('/search/find', function(req, res){
	console.log(req.body);
	let vals = req.body;

	// Checa o Json do login do usuario atual
	// FIXME: Ajustar para escrever e ler de uma base de dados...
	utils.getJsonDb()
	.then((value) =>{
		// Retorna da Promises, após ler o Json... res é o conteudo do Json
		let login = value;
		// Adicionando os valores de vals ao objeto login
		if (login){
			for (prop in vals){
				login[prop] = vals[prop];
			}
			login['req'] = req;
   			login['res'] = res;
   			console.log("RES!!!");
   			console.log(res);
			utils.odooSearch(login);
		}
	})
	.catch((errorMessage) => {
    	console.log(errorMessage);
	});
});

app.get('/objtest', (req,res) => {
	console.log('Bateu')
	res.json({test: 'Um belo teste'})
});

// O Segundo argumento do Listen é opcional...
app.listen(port, () =>{
	console.log(`Server is running on port ${port}`);
});
