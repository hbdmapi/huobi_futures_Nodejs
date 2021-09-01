const SPLIT_CHAR = ','; //not exported so cannot be used outside

import * as utils from '../../utils/http.js'

export class Market {
    constructor(host) {
        this.host = host;
    }

    getContractInfo(contract_code, callback) {
        let path = '/linear-swap-api/v1/swap_contract_info';
        let url = `https://${this.host}${path}`;
        if (contract_code != null) {
            url = `${url}?contract_code=${contract_code}`;
        }
        utils.httpsGet(url, callback);
    }
};