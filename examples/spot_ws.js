import { SpotWsAccount, SpotWsMarket } from '../huobi/sdk.js'
import { spot_host, access_key, secret_key } from './const.js'
import * as logger from '../huobi/utils/log.js'


var market = new SpotWsMarket(spot_host, (jdata) => {
    logger.log(jdata);
});
market.subKline('btcusdt', '1min');

var account = new SpotWsAccount(spot_host, (jdata) => {
    logger.log(jdata);
}, access_key, secret_key);
account.subAccounts(3);