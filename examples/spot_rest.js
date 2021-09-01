import { SpotRestAccount, SpotRestMarket, SpotRestOrder } from '../huobi/sdk.js'
import { spot_host, access_key, secret_key, account_id } from './const.js'
import * as logger from '../huobi/utils/log.js'

var market = new SpotRestMarket(spot_host);
market.getSymbols(function (data) {
    logger.log('\nget public data.')
    logger.log(data);
});

market.getKline('btcusdt', '1min', function (data) {
    logger.log('\nget public data.')
    logger.log(data);
});

var account = new SpotRestAccount(spot_host, access_key, secret_key);
account.getAccount(function(data){
    logger.log('\nget private data.')
    logger.log(data);
});

var order = new SpotRestOrder(spot_host, access_key, secret_key);
order.place(account_id, 'eosusdt', 'buy-limit', 10, function (data) {
    logger.log('\nget private data.')
    logger.log(data);
}, 1);