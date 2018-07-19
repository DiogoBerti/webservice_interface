var xmlrpc = require('xmlrpc');
var url = require('url');
const Odoo = require('./odoo_call');

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
   
   const odoo = new Odoo({
	    url: `http://${loginObject.url}`,
	    port: loginObject.port,
	    db: loginObject.db,
	    username: loginObject.userName,
	    password: loginObject.password,
	    model: loginObject.model,
	    domain: loginObject.domain_search
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
	    odoo.execute_kw(, 'search', params, function (err, value) {
	        
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

module.exports = {
  odooConnection
};