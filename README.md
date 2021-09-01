# Huobi Node.js Demo

This is Huobi Node.js Demo, you can import to your node.js project. The Demo contains RESTful/Websocket API usecase.
And it's very happy thing that you fork the project and push your commit to add the uncode API interfaces.

## Table of Contents

- [Quick Start](#Quick-Start)
- [Usage](#Usage)
    - [Folder structure](#Folder-structure)
    - [Run Examples](#Run-examples)
- [RESTful examples](#RESTful-examples)
    - [Get public data](#Get-public-data)
    - [Get private data](#Get-private-data)
    - [Post private data](#Post-private-data)
- [Websocket examples](#Websocket-examples)
  - [Subscribe public data](#Subscribe-public-data)
  - [Request public data](#Request-public-data)
  - [Subscribe private data](#Subscribe-private-data)


## Quick Start

*The SDK is writed and run at nodejs 16.0 or above*

You can download and open the source code directly in your nodejs project, and then you can follow below steps:

* Create the client instance.
* Call the interfaces provided by client.

```js
import { LinearSwapRestMarket } from '../huobi/sdk.js'
import { futures_host, access_key, secret_key } from './const.js'
import * as logger from '../huobi/utils/log.js'

var market = new LinearSwapRestMarket(futures_host);
market.getContractInfo('doge-usdt', function (data) {
    logger.log('\nget public data.')
    logger.log(data);
});
```

## Usage
After above section, this Demo should be already download to your local machine, this section introduce this Demo and how to use it correctly.

### Folder structure
This is the folder and package structure of Demo source code and the description

- **huobi**: The core of the SDK
  - **linear_swap**: The implementation of usdt swap API interface.
  - **spot**: The implementation of spot API interface.
  - **utils**: The utils functions or class, such as http, websocket and so on.
  - **sdk.js**: The Demo interface for user, and your application should import it.
- **examples**: The examples of using the Demo API.
- **package.json**: The config of this nodejs project.

### Run examples

This Demo provides examples that under **/examples** folder, if you want to run the examples to access private data, you need below additional steps:

1. Create an **API Key** first from Huobi official website
2. Assign your API access key, secret key and account_id to as below in the file examples/const.js:
```js
export let access_key = 'xxx';
export let secret_key = 'xxx';
export let account_id = 'xxx';
```
3. Run the example
```shell
 node examples/linear_swap_rest.js
```

If you don't need to access private data, you can ignore the step 1,2.

#### Customized Host
The client class support customized host so that you can define your own host in the file examples/const.js:
```js
export let futures_host = 'api.hbdm.vn';
export let spot_host = 'api.huobi.ae';
```

## RESTful examples

### Get public data
Get public data such as market kline data

```js
import { SpotRestMarket } from '../huobi/sdk.js'
import { spot_host } from './const.js'
import * as logger from '../huobi/utils/log.js'

var market = new SpotRestMarket(spot_host);
market.getKline('btcusdt', '1min', function (data) {
    logger.log('\nget public data.')
    logger.log(data);
});
```

### Get private data

```js
import { SpotRestAccount } from '../huobi/sdk.js'
import { spot_host, access_key, secret_key } from './const.js'
import * as logger from '../huobi/utils/log.js'

var account = new SpotRestAccount(spot_host, access_key, secret_key);
account.getAccount(function(data){
    logger.log('\nget private data.')
    logger.log(data);
});
```

### Post private data

```js
import { SpotRestOrder } from '../huobi/sdk.js'
import { spot_host, access_key, secret_key, account_id } from './const.js'
import * as logger from '../huobi/utils/log.js'

var order = new SpotRestOrder(spot_host, access_key, secret_key);
order.place(account_id, 'eosusdt', 'buy-limit', 10, function (data) {
    logger.log('\npos private data.')
    logger.log(data);
}, 1);
```

## Websocket examples

### Subscribe public data

```js
import { SpotWsMarket } from '../huobi/sdk.js'
import { spot_host } from './const.js'
import * as logger from '../huobi/utils/log.js'

var market = new SpotWsMarket(spot_host, (jdata) => {
    logger.log(jdata);
});
market.subKline('btcusdt', '1min');
```

### Request public data

```js
import { LinearSwapWsMarket } from '../huobi/sdk.js'
import { futures_host } from './const.js'
import * as logger from '../huobi/utils/log.js'

var market = new LinearSwapWsMarket(futures_host, (jdata) => {
    logger.log(jdata);
});
market.reqKline('btc-usdt', '1min', 1630388021, 1630388421);
```

### Subscribe private data

```js
import { SpotWsAccount } from '../huobi/sdk.js'
import { spot_host, access_key, secret_key } from './const.js'
import * as logger from '../huobi/utils/log.js'

var account = new SpotWsAccount(spot_host, (jdata) => {
    logger.log(jdata);
}, access_key, secret_key);
account.subAccounts(2);
```
