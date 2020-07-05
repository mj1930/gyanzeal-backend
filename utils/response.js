let localizify = require('localizify');

class ResponseUtil {

    constructor() {}

    static getResponse(data = {}, message = 'OKAY', statusCode = 500, optionalData) {
        let obj = {};
        try {
            obj.statusCode = statusCode;
            if (statusCode === 200) {
                obj.data = data;
            }
            if(optionalData) {
                obj = {...obj, ...optionalData}
            }
            obj.message = localizify.translate(message)
        } catch (ex) {
            console.log('Error @ getResponse ', ex);
        } finally {
            // console.log(obj)
            return obj;
        }
    }

}

module.exports = ResponseUtil;
