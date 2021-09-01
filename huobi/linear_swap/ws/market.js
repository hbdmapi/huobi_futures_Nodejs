const SPLIT_CHAR = ','; //not exported so cannot be used outside

import { Ws } from '../../utils/ws.js'

export class Market {
    constructor(host, callback) {
        this.ws = new Ws(host, '/linear-swap-ws', callback);
    }

    subKline(contract_code, period, id = null) {
        if (id == null) {
            id = 'sub';
        }
        let jdata = {
            "sub": `market.${contract_code}.kline.${period}`,
            "id": id
        }
        this.ws.send(jdata);
    }

    reqKline(contract_code, period, from, to, id = null) {
        if (id == null) {
            id = 'req';
        }
        let jdata = {
            "req": `market.${contract_code}.kline.${period}`,
            "id": id,
            "from": from,
            "to": to
        };
        this.ws.send(jdata);
    }
};