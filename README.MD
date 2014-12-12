# hapi-rabbit
A simple hapijs plugin to connect to rabbitMQ

## Introduction
hapi-rabbit basically wraps rabbit.js and gives the user a simple api to publish and subscribe to rabbitMQ

## Prerequisites
* RabbitMQ
* Node.js

## Installation
* npm install hapi-rabbit --save
* add plugin to hapi server
* include in your code

## Examples
### load plugin
```javascript
plugin.register([
    {
        plugin: require('hapi-rabbit')
    }
], function (err) {
    if (err) {
        throw err;
    }
});
```
### publish a message
```javascript
var rabbit = request.server.plugins['hapi-rabbit'];
rabbit.createContext(function(err, context){
    rabbit.publish(context, 'notification', 'newNotification', 'hey i got a new notification');
});
```
### subscribe
```javascript
var rabbit = request.server.plugins['hapi-rabbit'];
rabbit.createContext(function(err, context){
    rabbit.publish(context, 'notification', 'newNotification', 'hey i got a new notification');
});
```
