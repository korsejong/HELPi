'use strict';
const Duplex = require('stream').Duplex;
const browserChannel = require('browserchannel').server
const share = require('share').server.createClient({backend});

module.exports = function(app){
    app.use(browserChannel({webserver: webserver}, function(client) {
    var stream = new Duplex({objectMode: true});

    stream._read = function() {};
    stream._write = function(chunk, encoding, callback) {
        if (client.state !== 'closed') {
        client.send(chunk);
        }
        callback();
    };

    client.on('message', function(data) {
        stream.push(data);
    });

    client.on('close', function(reason) {
        stream.push(null);
        stream.emit('close');
    });

    stream.on('end', function() {
        client.close();
    });

    // Give the stream to sharejs
    return share.listen(stream);
    }));
};