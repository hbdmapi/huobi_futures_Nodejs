const SPLIT_CHAR = ','; //not exported so cannot be used outside

import { Ws } from '../../utils/ws.js'

export class Market {
    constructor(host, callback) {
        this.ws = new Ws(host, '/ws', callback);
    }

    subKline(symbol, period, id = null) {
        if (id == null) {
            id = 'sub';
        }
        let jdata = {
            "sub": `market.${symbol}.kline.${period}`,
            "id": id
        }
        this.ws.send(jdata);
    }
};