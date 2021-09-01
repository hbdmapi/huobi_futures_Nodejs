const SPLIT_CHAR = ','; //not exported so cannot be used outside

import * as utils from '../../utils/http.js'
import { toSignatureUrl } from '../../utils/http.js';

export class Account {
    constructor(host, access_key, secret_key) {
        this.host = host;
        this.access_key = access_key;
        this.secret_key = secret_key;
    }

    getCrossAccountInfo(margin_account, callback) {
        let path = '/linear-swap-api/v1/swap_cross_account_info';
        let url = `https://${this.host}${path}`;
        url = toSignatureUrl('POST', url, this.access_key, this.secret_key);
        var data = null;
        if (margin_account != null) {
            data = { "margin_account": margin_account };
            data = JSON.stringify(data);
        }
        // logger.log(url);
        // logger.log(data);
        utils.httpsPost(url, data, callback);
    }

    getApiTradingStatus(callback) {
        let path = '/linear-swap-api/v1/swap_api_trading_status';
        let url = `https://${this.host}${path}`;
        url = toSignatureUrl('GET', url, this.access_key, this.secret_key);
        // logger.log(url);
        // logger.log(data);
        utils.httpsGet(url, callback);
    }
};