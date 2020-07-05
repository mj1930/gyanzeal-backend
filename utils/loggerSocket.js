let moment = require('moment');

/**
 * Logger Socket that send logs to browsers for viewing
 */
class loggerSocket {

    constructor(io) {
        this.io = io;
    }

    // Log Method that console as well as send data via socket
    async log(message, data) {
        if (data) {
            console.log(message, ' ', data);
        } else {
            console.log(message);
        }
        let obj = {
            message: message,
            data: data ? data : '',
            time: moment().format('DD-MM-YY hh:mm:ss:SSSS A')
        };
        this.io.emit('update_logs', obj);
    }

}

module.exports = loggerSocket;