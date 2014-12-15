var should = require('chai').should();
var Hapi = require("hapi");
var hapiRabbit = require('../lib');

var setup = function (callback) {

    var server = new Hapi.Server();
    server.register({
        register: hapiRabbit
    }, function (err) {

        if (err) {
            console.log('Failed loading plugin');
        }

        var rabbit = server.plugins['hapi-rabbit'];

        var result = {
            rabbit: rabbit,
            server: server
        };

        callback(null, result);
    });

};

var context = {
    socket: function (type) {
        var connect = false;

        if (type === 'SUB') {
            connect = function (exchange, messageType, callback) {
                callback();
            };
        } else if (type === 'PUB') {
            connect = function (exchange, callback) {
                callback();
            };
        }

        return {
            connect    : connect,
            publish    : function () {
            },
            setEncoding: function () {
            },
            on         : function (event, callback) {
                callback('{"type":"messageType","data":"message"}');
            }
        };
    }
};

describe('hapiRabbit', function () {

    describe('plugin', function () {
        var server = null;
        var rabbit = null;

        beforeEach(function (done) {
            setup(function (err, result) {
                server = result.server;
                rabbit = result.rabbit;
                done();
            });
        });

        it('should be defined', function () {
            rabbit.should.be.an('object');
        });

        it('should have subscribe function', function () {
            rabbit.should.respondTo('subscribe');
        });

        it('should have publish function', function () {
            rabbit.should.respondTo('publish');
        });

        it('should have createContext function', function () {
            rabbit.should.respondTo('createContext');
        });

    });

    describe('subscribe invalid exchange', function () {
        var error = null;

        beforeEach(function (done) {

            setup(function (err, result) {
                result.rabbit.subscribe(context, 'exchange.bla', function (err) {
                    error = err;
                    done();
                });
            });

        });

        it('should return validation error when entering non-alphanumeric value', function () {
            error.name.should.equal('ValidationError');
        });

    });

    describe('publish invalid exchange', function () {
        var error = null;

        beforeEach(function (done) {

            setup(function (err, result) {
                result.rabbit.publish(context, 'exchange.bla', 'messageType', 'message', function (err) {
                    error = err;
                    done();
                });
            });

        });

        it('should return validation error when entering non-alphanumeric value', function () {
            error.name.should.equal('ValidationError');
        });

    });

    describe('publish invalid messageType', function () {
        var error = null;

        beforeEach(function (done) {

            setup(function (err, result) {
                result.rabbit.publish(context, 'exchange', 'messageType.sdks', 'message', function (err) {
                    error = err;
                    done();
                });
            });

        });

        it('should return validation error when entering non-alphanumeric value', function () {
            error.name.should.equal('ValidationError');
        });

    });

    describe('publish', function () {
        var msg = null;

        beforeEach(function (done) {

            setup(function (err, result) {
                result.rabbit.publish(context, 'exchange', 'messageType', 'message', function (err, message) {
                    msg = message;
                    done();
                });
            });

        });

        it('should return messageObject', function () {
            msg.should.be.an('object');
        });

        it('should return messageObject with messageType', function () {
            msg.type.should.equal('messageType');
        });

        it('should return messageObject with data', function () {
            msg.data.should.equal('message');
        });

    });

    describe('subscribe', function () {
        var msg = null;

        beforeEach(function (done) {

            setup(function (err, result) {
                result.rabbit.subscribe(context, 'exchange', function (err, message) {
                    msg = message;
                    done();
                });
            });

        });

        it('should return messageObject', function () {
            msg.should.be.an('object');
        });

        it('should return messageObject with messageType', function () {
            msg.type.should.equal('messageType');
        });

        it('should return messageObject with data', function () {
            msg.data.should.equal('message');
        });

    });

});