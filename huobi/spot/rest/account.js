const SPLIT_CHAR = ','; //not exported so cannot be used outside

import * as utils from '../../utils/http.js'
import { toSignatureUrl } from '../../utils/http.js';

export class Account {
    constructor(host, access_key, secret_key) {
        this.host = host;
        this.access_key = access_key;
        this.secret_key = secret_key;
    }

    getAccount(callback) {
        let path = '/v1/account/accounts';
        let url = `https://${this.host}${path}`;
        url = toSignatureUrl('GET', url, this.access_key, this.secret_key);
        utils.httpsGet(url, callback);
    }
};