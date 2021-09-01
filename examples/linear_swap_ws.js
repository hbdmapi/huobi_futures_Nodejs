import { LinearSwapWsAccount, LinearSwapWsMarket } from '../huobi/sdk.js'
import { futures_host, access_key, secret_key } from './const.js'
import * as logger from '../huobi/utils/log.js'


var market1 = new LinearSwapWsMarket(futures_host, (jdata) => {
    logger.log(jdata);
});
market1.subKline('btc-usdt', '1min');

var market2 = new LinearSwapWsMarket(futures_host, (jdata) => {
    logger.log(jdata);
});
market2.reqKline('btc-usdt', '1min', 1630388021, 1630388421);

var account = new LinearSwapWsAccount(futures_host, (jdata) => {
    logger.log(jdata);
}, access_key, secret_key);
account.subCrossOrders('*');
