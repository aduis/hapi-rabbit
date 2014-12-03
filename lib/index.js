var rabbitjs = require('rabbit.js');
var Hoek = require('hoek');

module.exports.register = function (plugin, userOptions, next) {

	var defaultOptions = {
		url : "amqp://localhost", 
		routing : 'topic',
		encoding : 'utf8' 
	};

	var options = Hoek.applyToDefaults(defaultOptions, userOptions);

	plugin.expose('subscribe', function (context, exchange, callback) {
        var sub = context.socket('SUB', {routing: options.routing});

        sub.connect(exchange, exchange + '.*', function () {
            sub.setEncoding(options.encoding);

            sub.on('data', function (message) {
                callback(null, JSON.parse(message));
            });
        });

    });

	plugin.expose('publish', function (context, exchange, messageType, message) {
        var pub = context.socket('PUB', {routing: options.routing});

        var messageObject = {
            type: messageType,
            data: message
        };

        pub.connect(exchange, function () {
            pub.publish(exchange + '.' + messageType, JSON.stringify(messageObject));
        });

    });

    plugin.expose('createContext', function(callback){
        var context = rabbitjs.createContext(options.url);

        context.on('ready', function () {
            callback(null, context);
        });
    });

    next();
};

module.exports.register.attributes = {
    pkg: require('../package.json')
};