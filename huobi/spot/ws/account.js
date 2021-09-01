const SPLIT_CHAR = ','; //not exported so cannot be used outside

import { Ws } from '../../utils/ws.js'

export class Account {
    constructor(host, callback, access_key, secrect_key) {
        this.ws = new Ws(host, '/ws/v2', callback, access_key, secrect_key, true, 2.1);
    }

    subAccounts(mode = null) {
        let jdata = {
            "action": "sub",
            "ch": "accounts.update"
        }
        if (mode != null) {
            jdata["ch"] += `#${mode}`;
        }
        this.ws.send(jdata);
    }
};