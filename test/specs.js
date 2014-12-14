var should = require('chai').should();
var Hapi = require("hapi");
var hapiRabbit = require('../lib');

describe('hapiRabbit', function(){

  describe('plugin', function(){
  	var server = null;
  	var rabbit = null;

  	beforeEach(function(done){
  		server = new Hapi.Server();
  		server.register({
		    register: hapiRabbit
		}, function (err) {

		    if (err) {
		        console.log('Failed loading plugin');
		    }

			rabbit = server.plugins['hapi-rabbit'];
		    done();
		});
		
	});
    
    it('should be defined', function(){
    	rabbit.should.be.an('object');
    });

    it('should have subscribe function', function(){
    	rabbit.should.respondTo('subscribe');
    });

    it('should have publish function', function(){
    	rabbit.should.respondTo('publish');
    });

    it('should have createContext function', function(){
    	rabbit.should.respondTo('createContext');
    });

  });

  describe('subscribe', function(){
  	var server = null;
  	var rabbit = null;
  	var error = null;

  	beforeEach(function(done){
  		var context = {};

  		server = new Hapi.Server();
  		server.register({
		    register: hapiRabbit
		}, function (err) {

		    if (err) {
		        console.log('Failed loading plugin');
		    }

			rabbit = server.plugins['hapi-rabbit'];
            rabbit.subscribe(context, 'exchange.bla', function(err, message){
            	error = err;
                done();
            });
		});
		
	});
    
    it('should return validation error when entering non-alphanumeric exchange', function(){
    	error.name.should.equal('ValidationError');
    });

  });

});