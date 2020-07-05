userModel = require('../models/users');
chatModel = require('../models/messages');

wsServer = require('../e2e/test_socket_server');
http = require('http');

socket_io = require('socket.io');
socket_io_client = require('socket.io-client')

assert = require('assert');
mocha = require('mocha');
chai = require('chai');

expect = chai.expect();
should = chai.should();