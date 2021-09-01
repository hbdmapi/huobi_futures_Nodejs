import { LinearSwapRestMarket, LinearSwapRestAccount } from '../huobi/sdk.js'
import { futures_host, access_key, secret_key } from './const.js'
import * as logger from '../huobi/utils/log.js'

var market = new LinearSwapRestMarket(futures_host);
market.getContractInfo('doge-usdt', function (data) {
    logger.log('\nget public data.')
    logger.log(data);
});

var account = new LinearSwapRestAccount(futures_host, access_key, secret_key);
account.getCrossAccountInfo('usdt', function (data) {
    logger.log('\npost private data.')
    logger.log(data);
});

account.getApiTradingStatus(function (data) {
    logger.log('\nget private data.')
    logger.log(data);
});