const SPLIT_CHAR = ','; //not exported so cannot be used outside

import * as https from 'https';
import * as url_utils from 'url';
import CryptoJS from 'crypto-js';
import * as logger from '../utils/log.js';

export {
    httpsGet,
    httpsPost,
    toSignatureUrl
};

const TIME_OUT = 5 * 1000;

function httpsGet(url, callback) {
    var options = url_utils.parse(url);
    options.method = 'GET';
    options.port = 443;
    options.timeout = TIME_OUT;

    var respond_data = [];
    var req = https.request(options, function (res) {
        res.on('data', function (chunk) {
            respond_data.push(chunk);
        }).on('end', function () {
            var data = Buffer.concat(respond_data).toString('utf-8');
            callback(data);
        });
    });
    req.on('timeout', () => {
        logger.error(`get ${url} timeout(${TIME_OUT}ms)`);
        req.destroy();
    });
    req.on('error', (e) => { });
    req.end();
};

function httpsPost(url, data, callback) {
    var len = 0;
    if (data != null) {
        len = data.len;
    }

    var options = url_utils.parse(url);
    options.method = 'POST';
    options.port = 443;
    options.timeout = TIME_OUT;
    options.headers = {
        'Content-Type': 'application/json'
    };

    var respond_data = [];
    var req = https.request(options, function (res) {
        res.on('data', function (chunk) {
            respond_data.push(chunk);
        }).on('end', function () {
            var data = Buffer.concat(respond_data).toString('utf-8');
            callback(data);
        });
    });
    req.on('timeout', () => {
        logger.error(`get ${url} timeout(${TIME_OUT}ms)`);
        req.destroy();
    });
    req.on('error', (e) => { });
    if (data != null) {
        req.write(data);
    }
    req.end();
};

function toSignatureUrl(method, url, access_key, secret_key) {
    var options = url_utils.parse(url);
    var host = options.hostname;
    var path = options.path;
    var time_stamp = new Date().toISOString().slice(0, 19);
    var params = `AccessKeyId=${access_key}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(time_stamp)}`;

    var payload = `${method.toUpperCase()}\n${host}\n${path}\n${params}`;
    var signatureBytes = CryptoJS.HmacSHA256(payload, secret_key);
    var signature = CryptoJS.enc.Base64.stringify(signatureBytes);
    // logger.log(payload);
    // logger.log(signature);

    url = `${url}?${params}&Signature=${encodeURIComponent(signature)}`
    return url;
}
