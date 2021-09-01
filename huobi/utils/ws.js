const SPLIT_CHAR = ','; //not exported so cannot be used outside

import WebSocket from 'ws';
import * as zlib from 'zlib'
import * as logger from './log.js'
import CryptoJS from 'crypto-js';

export class Ws {
    constructor(host, path, callback, access_key = null, secret_key = null, auto_reconnect = true, version = 2) {
        this.host = host;
        this.path = path;
        this.callback = callback;
        this.access_key = access_key;
        this.secret_key = secret_key;
        this.auto_reconnect = auto_reconnect;
        this.version = version;
        this._send_data = null;

        let url = `wss://${host}${path}`;
        this.websocket = new WebSocket(url);
        this.has_opened = false;

        var _this = this;
        this.websocket.on('open', function open() {
            _this.has_opened = true;
            logger.log(`has opened ${url}`);
            if (access_key != null || secret_key != null) {
                if (version == 2) {
                    _this._send_auth2(this, host, path, access_key, secret_key);
                } else {
                    _this._send_auth2dot1(this, host, path, access_key, secret_key);
                }
            }
        });

        this.websocket.on('close', function close() {
            _this.has_opened = false;
            logger.log(`has closed ${url}`);
            if (auto_reconnect) {
                _this.websocket = new WebSocket(url);
            }
        });

        this.websocket.on('message', function incoming(message) {
            if (_this._send_data != null) {
                this.send(_this._send_data);
                logger.log(`has send ${_this._send_data}`);
                _this._send_data = null;
            }

            if (version != 2) {
                _this._on_msg(message, callback);
                return;
            }
            zlib.gunzip(message, function (err, decoded) {
                _this._on_msg(decoded, callback);
            })
        });
    }

    _on_msg(data, callback) {
        let msg = data.toString('utf-8')
        var jdata = JSON.parse(msg);
        if (jdata.ping || (jdata.op && jdata.op == 'ping') || (jdata.action && jdata.action == 'ping')) {
            var pong = msg.replace('ping', 'pong');
            this.websocket.send(pong);
        } else {
            callback(msg);
        }
    }

    _send_auth2(ws, host, path, access_key, secret_key) {
        let method = 'GET';
        let time_stamp = new Date().toISOString().slice(0, 19);
        var params = `AccessKeyId=${access_key}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(time_stamp)}`;

        var payload = `${method.toUpperCase()}\n${host}\n${path}\n${params}`;
        var signatureBytes = CryptoJS.HmacSHA256(payload, secret_key);
        var signature = CryptoJS.enc.Base64.stringify(signatureBytes);

        var data = {
            "op": "auth",
            "type": "api",
            "AccessKeyId": access_key,
            "SignatureMethod": "HmacSHA256",
            "SignatureVersion": "2",
            "Timestamp": time_stamp,
            "Signature": signature,
        };
        data = JSON.stringify(data);
        ws.send(data);
        logger.log(`has send auth ${data}`);
    }

    _send_auth2dot1(ws, host, path, access_key, secret_key) {
        let method = 'GET';
        let time_stamp = new Date().toISOString().slice(0, 19);
        var params = `accessKey=${access_key}&signatureMethod=HmacSHA256&signatureVersion=2.1&timestamp=${encodeURIComponent(time_stamp)}`;

        var payload = `${method.toUpperCase()}\n${host}\n${path}\n${params}`;
        var signatureBytes = CryptoJS.HmacSHA256(payload, secret_key);
        var signature = CryptoJS.enc.Base64.stringify(signatureBytes);

        var data = {
            "action": "req",
            "ch": "auth",
            "params": {
                "authType": "api",
                "accessKey": access_key,
                "signatureMethod": "HmacSHA256",
                "signatureVersion": "2.1",
                "timestamp": time_stamp,
                "signature": signature
            }
        }
        data = JSON.stringify(data);
        ws.send(data);
        logger.log(`has send auth ${data}`);
    }

    send(jdata) {
        this._send_data = JSON.stringify(jdata);
    }
}
