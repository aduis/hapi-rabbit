var rabbitjs = require('rabbit.js');
var Hoek = require('hoek');

exports.register = function (plugin, userOptions, next) {

	var defaultOptions = {
		url : "www.github.com", 
		routing : 'topic',
		encoding : 'utf8' 
	};

	var options = Hoek.applyToDefaults(defaultOptions, userOptions);

	plugin.hapiRabbit = {
		context: false,
		subscribe: function (context, exchange, callback) {
	        var sub = context.socket('SUB', {routing: options.routing});

	        sub.connect(exchange, exchange + '.*', function () {
	            sub.setEncoding(options.encoding);

	            sub.on('data', function (message) {
	                callback(null, JSON.parse(message));
	            });
	        });

	    },
	    publish  : function (context, exchange, messageType, message) {
	        var pub = context.socket('PUB', {routing: options.routing});

	        var messageObject = {
	            type: messageType,
	            data: message
	        };

	        pub.connect(exchange, function () {
	            pub.publish(exchange + '.' + messageType, JSON.stringify(messageObject));
	        });
	        
	    }
	};

	var context = rabbitjs.createContext(options.rabbitUrl);
    
    context.on('ready', function () {
        plugin.hapiRabbi.context = context;
        next();
    });
	
};

exports.register.attributes = {
    pkg: require('../package.json')
};
