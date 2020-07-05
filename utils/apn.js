let moment = require('moment');
let apn = require('apn');
let fs = require('fs');

/**
 * Logger Socket that send logs to browsers for viewing
 */
class APN {

    constructor(obj) {
        this.from_user_id = obj.from_user_id;
        this.device_token = obj.device_token;
        this.apnProvider = new apn.Provider({
            cert: fs.readFileSync('pushcert_dev.pem'),
            key: fs.readFileSync('pushcert_dev.pem'),
            // cert: fs.readFileSync('pushcert_prod.pem'),
            // key: fs.readFileSync('pushcert_prod.pem'),
            passphrase: null,
            production: JSON.parse(process.env.APN_PROD_ENV)
        });
    }

    // Send Push Notification
    async sendPushNotification() {
        let response = '';
        try {
            if (this.device_token) {
                let note = new apn.Notification();
                note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
                note.badge = 3;
                note.sound = "ping.aiff";
                note.alert = "You are disconnected";
                note.payload = {
                    'messageFrom': 'FamiliasIn',
                    'from_user_id': this.from_user_id
                };
                note.topic = process.env.APP_BUNDLE_ID;
                response = await this.apnProvider.send(note, this.device_token);
                console.log(JSON.stringify(response));
            }
        } catch (ex) {
            console.error('error @ sendPushNotification ', ex);
        } finally {
            return response;
        }
    }
}

module.exports = APN;