# hapi-rabbit

A simple hapijs plugin to connect to rabbitMQ 

## Introduction
TODO

## Prerequisites
TODO

## Installation
TODO

## Examples
```javascript
var context = plugin.plugins['hapi-rabbit'].context;   

plugin.plugins['hapi-rabbit'].subscribe(context, 'notification', function(err, message){
    console.log('received message: ', message);
});

plugin.plugins['hapi-rabbit'].publish(context, 'notification', 'newNotification', 'hey i got a new notification');
```