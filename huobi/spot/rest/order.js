const SPLIT_CHAR = ','; //not exported so cannot be used outside

import * as utils from '../../utils/http.js'
import * as logger from '../../utils/log.js'
import { toSignatureUrl } from '../../utils/http.js';

export class Order {
    constructor(host, access_key, secret_key) {
        this.host = host;
        this.access_key = access_key;
        this.secret_key = secret_key;
    }

    place(account_id, symbol, type, amount, callback, price = null, source = null, client_order_id = null, stop_price = null, operator = null) {
        let path = '/v1/order/orders/place';
        let url = `https://${this.host}${path}`;
        url = toSignatureUrl('POST', url, this.access_key, this.secret_key);
        var data = {
            "account-id": account_id,
            "symbol": symbol,
            "type": type,
            "amount": amount
        };
        if (price != null) {
            data["price"] = price;
        }
        if (source != null) {
            data["source"] = source;
        }
        if (client_order_id != null) {
            data['client-order-id'] = client_order_id;
        }
        if (stop_price != null) {
            data['stop-price'] = stop_price;
        }
        if (operator != null) {
            data['operator'] = operator;
        }
        data = JSON.stringify(data);
        utils.httpsPost(url, data, callback);
    }
};