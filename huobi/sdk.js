const SPLIT_CHAR = ','; //not exported so cannot be used outside

import { Market as SpotRestMarket } from "./spot/rest/market.js";
import { Account as SpotRestAccount } from "./spot/rest/account.js";
import { Order as SpotRestOrder } from "./spot/rest/order.js";
import { Market as SpotWsMarket } from "./spot/ws/market.js";
import { Account as SpotWsAccount } from "./spot/ws/account.js";

import { Market as LinearSwapRestMarket } from "./linear_swap/rest/market.js";
import { Account as LinearSwapRestAccount } from "./linear_swap/rest/account.js";
import { Market as LinearSwapWsMarket } from "./linear_swap/ws/market.js";
import { Account as LinearSwapWsAccount } from "./linear_swap/ws/account.js";

export {
    SpotRestMarket,
    SpotRestAccount,
    SpotRestOrder,
    SpotWsMarket,
    SpotWsAccount,

    LinearSwapRestMarket,
    LinearSwapRestAccount,
    LinearSwapWsMarket,
    LinearSwapWsAccount
};

