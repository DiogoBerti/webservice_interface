const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Odoo = require('./odoo_call');

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
   let vals = req.body;

   const odoo = new Odoo({
	    url: `http://${vals.urlOdoo}`,
	    port: '8069',
	    db: vals.bdOdoo,
	    username: vals.userLogin,
	    password: vals.userPassword
   });

   odoo.connect((err) => {
	   	
	    if (err) { 
	    	res.redirect('/login?error=notfound');
	    }
	    console.log('Connected to Odoo server.');

	    let inParams = [];

	    inParams.push([]);
	    // inParams.push(0);  //offset
	    // inParams.push(10);  //Limit
	    let params = [];
	    params.push(inParams);
	    odoo.execute_kw('res.users', 'search', params, function (err, value) {
	        
	        if (err) { 
	        	return console.log(err);
	        }
	        let inParams = [];
	        inParams.push(value); //ids
	        inParams.push(['name', 'login']); //fields
	        let params = [];
	        params.push(inParams);
	        odoo.execute_kw('res.users', 'read', params, function (err2, value2) {
	            if (err2) { 
	            	return console.log(err2);
	            }
	            let results = value2;
	            res.render('home.hbs',{
				welcomeMessage: "Bem vindo ao Webservice interface",
				results_to_show: results
				});
	    	});
	    	// res.redirect('/home',results);
	    });
	});
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
