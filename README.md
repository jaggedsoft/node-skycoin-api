[![GitHub last commit](https://img.shields.io/github/last-commit/jaggedsoft/node-skycoin-api.svg?maxAge=2400)](#)
[![npm downloads](https://img.shields.io/npm/dt/skycoin.svg?maxAge=7200)](https://www.npmjs.com/package/skycoin)

[![NPM](https://nodei.co/npm/skycoin.png?compact=true)](https://npmjs.org/package/skycoin)
# Node Skycoin API
This project is designed to help you make your own projects that interact with the [Skycoin API](https://github.com/skycoin/skycoin/blob/develop/src/gui/README.md). You can query the rich list, total coin supply, download block information, view metadata, get account balances and more. This project seeks to have complete API coverage including wallet functionality and sending transactions.
> (Currently an experimental release. Wallet functionality will be added later)

#### Installation
```
npm install skycoin
```


#### Getting started
> When using async/await, your entire program must be wrapped in an async block:
```js
(async () => {
    const api = require('skycoin');
    console.log(await api.version());
})();
```

#### Setting optional parameters
```js
api.options({
    node: 'http://127.0.0.1:6420/', // Change to alternative node (or your own)
    proxy: { host: '127.0.0.1', port: 3128 }
});
```

#### Get wallet balance
```js
// Accepts single address, or array of addresses. divide balance by 1e6
console.log(await api.balance('2CfGyhRyvT8Y4uF9CqoKBgYZuRrgKfCP2nj'));
```
<details>
 <summary>View Response</summary>

```js
{ confirmed: { coins: 265000000, hours: 108286 },
  predicted: { coins: 265000000, hours: 108286 } }
```
</details>

#### Get node version info
```js
console.log(await api.version());
```
<details>
 <summary>View Response</summary>

```js
{ version: '0.21.1', commit: '' }
```
</details>

#### Get unconfirmed transactions
```js
console.log(await api.pendingTxs());
```

#### Get transaction info by id
```js
console.log(await api.transaction(txid));
```

#### Get transactions that are addresses related
```js
// Addresses can be a single address or an array
// Confirmed can be true or false, defaults to all
console.log(await api.transaction(addresses, confirmed));
```

#### Get raw transaction by id
```js
console.log(await api.rawtx(txid));
```

#### Inject raw transaction
```js
console.log(await api.injectTransaction(txid));
```

#### Resend unconfirmed transactions
```js
console.log(await api.resendUnconfirmedTxns());
```

#### Get blockchain metadata
```js
console.log(await api.metadata());
```

#### Get blockchain progress
```js
console.log(await api.progress());
```

#### Get block by hash or seq
```js
console.log(await api.block({seq: 2760}));
console.log(await api.block({hash: '6eafd13ab6823223b714246b32c984b56e0043412950faf17defdbb2cbf3fe30'}));
```

#### Get blocks in specific range
```js
console.log(await api.blocks(start, end));
```

#### Get last N blocks
```js
console.log(await api.blocks(num));
```

#### Get address affected transactions
```js
console.log(await api.explorer('2CfGyhRyvT8Y4uF9CqoKBgYZuRrgKfCP2nj'));
```

#### Get uxout
```js
console.log(await api.uxout(uxid));
```

#### Get address affected uxouts
```js
console.log(await api.address_uxouts('2CfGyhRyvT8Y4uF9CqoKBgYZuRrgKfCP2nj'));
```

#### Get a list of all default connections
```js
console.log(await api.defaultConnections());
```

#### Get a list of all connections
```js
console.log(await api.connections());
```

#### Get a list of all trusted connections
```js
console.log(await api.trust());
```

#### Get a list of all connections discovered through peer exchange
```js
console.log(await api.exchange());
```

#### Get information for a specific connection
```js
console.log(await api.connection(addr));
```

#### Coin supply
```js
console.log(await api.coinSupply());
```

#### Count unique addresses
```js
console.log(await api.addresscount());
```

#### Richlist show top N addresses by uxouts
```js
// amount defaults to 20. -1 returns all accounts
// distributions will include distribution address or not, defaults to false
console.log(await api.richlist(amount, distributions));
```


## Coming soon:
> #### Spend coins from wallet
> #### Update wallet label
> #### Generate new address in wallet
> #### Create a wallet from seed
> #### Generate wallet seed
> #### Get wallet folder name
> #### Get wallets
> #### Get wallet transactions
> #### Get wallet

### [Skycoin Website](https://www.skycoin.net)
### [Skycoin Reddit](https://skycoin.reddit.com)
### [Skycoin Telegram](https://t.me/Skycoin)

[![Views](http://hits.dwyl.io/jaggedsoft/node-skycoin-api.svg)](http://hits.dwyl.io/jaggedsoft/node-skycoin-api)
