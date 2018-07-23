var xmlrpc = require('xmlrpc');
var url = require('url');
const Odoo = require('./odoo_call');
const fs = require('fs');

var odooConnection = function(loginObject){

	const odoo = new Odoo({
		url: `http://${loginObject.url}`,
		port: loginObject.port,
		db: loginObject.db,
		username: loginObject.userName,
		password: loginObject.password
	});   

	odoo.connect((err) => {

		if (err) { 
			loginObject.res.redirect('/login?error=notfound');
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
	        	loginObject.res.render('home.hbs',{
	        		welcomeMessage: "Bem vindo ao Webservice interface",
	        		results_to_show: results
	        	});
	        });
	    });
	});
};


var odooSearch = function(loginObject){

	let vals = {
		model: loginObject.model_name,
		domain_search: loginObject.domain_to_search,
		fields: loginObject.fields_list
	};

	let domain_odoo = [];
	if (loginObject.domain_to_search){
		domain_odoo.push(loginObject.field)
		domain_odoo.push(loginObject.operator)
		domain_odoo.push(loginObject.domain_to_search);
	}	

	const odoo = new Odoo({
		url: `http://${loginObject.url}`,
		port: loginObject.port,
		db: loginObject.db,
		username: loginObject.userName,
		password: loginObject.password,
	});   

	odoo.connect((err) => {

		if (err) { 
			loginObject.res.redirect('/search');
		}

		let inParams = [];

		inParams.push([domain_odoo]);
	    // inParams.push(0);  //offset
	    // inParams.push(10);  //Limit
	    let params = [];
	    params.push(inParams);
	    odoo.execute_kw(vals.model, 'search', params, function (err, value) {
	    	if (err) { 
	    		return console.log(err);
	    	}
	    	let inParams = [];
	        inParams.push(value); //ids
	        inParams.push(loginObject.fields_list); //fields
	        let params = [];
	        params.push(inParams);
	        odoo.execute_kw(vals.model, 'read', params, function (err2, value2) {
	        	if (err2) { 
	        		return console.log(err2);
	        	}
	        	let results = value2;
	        	console.log(results);
	        	loginObject.res.render('home.hbs',{
	        		welcomeMessage: "Bem vindo ao Webservice interface",
	        		results_to_show: results
	        	});
	        });
	    });
	});
};


var writeJsonDB = function(data_to_write){
	let data = JSON.stringify(data_to_write, null, 2);  
	fs.writeFileSync('login.json', data);  
}

const getJsonDb = () =>{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			fs.readFile('login.json', (err, data) => {  
				if (err) throw err;
		    // console.log(JSON.parse(data));
		    resolve(JSON.parse(data));
			});
		}, 1500);
	});
}

module.exports = {
	odooConnection,
	odooSearch,
	writeJsonDB,
	getJsonDb
};