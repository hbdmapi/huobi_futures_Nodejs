const SPLIT_CHAR = ','; //not exported so cannot be used outside

import * as utils from '../../utils/http.js'
import * as logger from '../../utils/log.js'

export class Market {
    constructor(host) {
        this.host = host;
    }

    getSymbols(callback) {
        let path = '/v1/common/symbols';
        let url = `https://${this.host}${path}`;
        utils.httpsGet(url, callback);
    }

    getKline(symbol, period, callback, size = null) {
        let path = '/market/history/kline';
        let url = `https://${this.host}${path}?symbol=${symbol}&period=${period}`;
        if (size != null) {
            url = `${url}&size=${size}`;
        }
        utils.httpsGet(url, callback);
    }
};