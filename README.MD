# hapi-rabbit
A simple hapijs plugin to connect to rabbitMQ

## Introduction
hapi-rabbit basically wraps rabbit.js and gives the user a simple api to publish and subscribe to rabbitMQ

## Prerequisites
* RabbitMQ
* Node.js
* Hapi.js

## Installation
```javascript
npm install hapi-rabbit --save
````
* add plugin to hapi server
* include in your code

## Examples
### load plugin
```javascript
plugin.register([
    {
        plugin: require('hapi-rabbit'),
        options: { 
            url: 'amqp://localhost'
        } 
    }
], function (err) {
    if (err) {
        throw err;
    }
});
```
### publish a message
```javascript
function (request, reply) {

    var rabbit = request.server.plugins['hapi-rabbit'];
    rabbit.createContext(function(err, context){
        rabbit.publish(context, 'exchange', 'messageType', 'message');
    });
    
    reply('Hello!');
}
```
### subscribe
```javascript
exports.register = function (plugin, options, next) {

    plugin.events.once('start', function () {

        var rabbit = plugin.plugins['hapi-rabbit'];
        rabbit.createContext(function(err, context){
            rabbit.subscribe(context, 'exchange', function(err, message){
                console.log('message', message);
            });
        });

    });

    next();
};
```
