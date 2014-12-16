# hapi-rabbit

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aduis/hapi-rabbit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A simple hapijs plugin to connect to rabbitMQ

[![Build Status](https://travis-ci.org/aduis/hapi-rabbit.svg?branch=master)](https://travis-ci.org/aduis/hapi-rabbit) [![Coverage Status](https://img.shields.io/coveralls/aduis/hapi-rabbit.svg)](https://coveralls.io/r/aduis/hapi-rabbit?branch=master) [![npm version](https://badge.fury.io/js/hapi-rabbit.svg)](http://badge.fury.io/js/hapi-rabbit) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/hapi-rabbit.png)](https://npmjs.org/package/hapi-rabbit)

## Introduction
hapi-rabbit basically wraps rabbit.js and gives the user a simple api to publish and subscribe to rabbitMQ

## Prerequisites
* RabbitMQ
* Node.js
* Hapi.js

## Installation
```javascript
npm install hapi-rabbit --save
```
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
        rabbit.publish(context, 'exchange', 'messageType', 'message', function(err, data){
            console.log('messageObject', data);
        });
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
