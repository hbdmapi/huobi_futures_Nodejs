const SPLIT_CHAR = ','; //not exported so cannot be used outside

import { Ws } from '../../utils/ws.js'

export class Account {
    constructor(host, callback, access_key, secrect_key) {
        this.ws = new Ws(host, '/linear-swap-notification', callback, access_key, secrect_key);
    }

    subCrossOrders(contract_code, cid = null) {
        if (cid == null) {
            cid = 'sub';
        }
        let jdata = {
            "op": "sub",
            "cid": cid,
            "topic": `orders_cross.${contract_code}`
        }
        this.ws.send(jdata);
    }

    unsubCrossOrders(contract_code, cid = null) {
        if (cid == null) {
            cid = 'unsub';
        }
        let jdata = {
            "op": "unsub",
            "cid": cid,
            "topic": `orders_cross.${contract_code}`
        }
        this.ws.send(jdata);
    }
};