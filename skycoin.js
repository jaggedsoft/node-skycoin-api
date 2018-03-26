module.exports = function() {
    'use strict';
    const axios = require('axios');
    const defaults = {
        proxy: false,
        timeout: 5000
    };
    let options = {};

    async function request(url, data = {}, flags = {}) {
        const base = 'https://node.skycoin.net/api/';
        const userAgent = 'Mozilla/4.0 (compatible; Node Skycoin API)';
        const contentType = 'application/x-www-form-urlencoded';
        let headers = {
            'User-Agent': userAgent,
            'Content-Type': contentType
        };        
        let params = {
            url: url,
            method: 'GET',
            headers: headers,
            timeout: options.timeout,
            proxy: options.proxy,
            baseURL: base
        };
        if ( typeof flags.method !== 'undefined' ) params.method = flags.method; // GET POST PUT DELETE
        if ( params.method == 'GET' ) {
            params.params = data;
        } else {
            params.headers['X-CSRF-Token'] = await csrf();
            params.headers['Content-Type'] = 'application/json';
            params.data = data;
        }
        try {
            const response = await axios.request(params);
            if ( response && response.status !== 200 ) return new Error(JSON.stringify(response.data));
            return response.data;
        } catch ( error ) {
            return new Error(JSON.stringify(error.response.data)); // error.message
        }
    }

    async function csrf() {
        return request('/csrf');
    }

    return {
        options: function(opt) {
            // Accept options as string (load json from file) or object
            //if ( typeof opt === 'string' ) options = JSON.parse(file.readFileSync(opt));
            //else options = opt;
            options = opt;
            // Set default options
            for ( let key in defaults ) {
                if ( typeof options[key] === 'undefined' ) {
                    options[key] = defaults[key];
                }
            }
        },

        // Get current csrf token
        csrf: async function() {
            return request('/csrf');
        },

        // Get node version info
        version: async function() {
            return request('/version');
        },

        // Spend coins from wallet

        // Updates wallet label

        // Generate new address in wallet

        // Create a wallet from seed

        // Generate wallet seed

        // Get wallet folder name

        // Get wallets

        // Get wallet transactions

        // Get wallet

        /////////////////////////////////////////////
        // Get unconfirmed transactions
        pendingTxs: async function() {
            return request('/pendingTxs');
        },

        // Get transaction info by id
        transaction: async function(txid) {
            return request('/transaction', { txid });
        },

        // Get transactions that are addresses related
        transactions: async function(addresses = '', confirmed = undefined) {
            if ( typeof addresses === 'string' ) addresses = [addresses];
            let params = { addrs: addresses.join(',') };
            if ( confirmed !== undefined ) params.confirmed = confirmed ? 1 : 0;
            return request('/transactions', params);
        },

        // Get raw transaction by id
        rawtx: async function(txid) {
            return request('/rawtx', { txid });
        },

        // Inject raw transaction
        injectTransaction: async function(txid) {
            return request('/injectTransaction', { txid }, { 'method': 'POST' });
        },

        // Resend unconfirmed transactions
        resendUnconfirmedTxns: async function() {
            return request('/resendUnconfirmedTxns');
        },

        // Get wallet balance
        balance: async function(addresses) {
            if ( typeof addresses === 'string' ) addresses = [addresses];
            return request('/balance', { addrs: addresses.join(',') });
        },

        // Get blockchain metadata
        metadata: async function() {
            return request('/blockchain/metadata');
        },

        // Get blockchain progress
        progress: async function() {
            return request('/blockchain/progress');
        },

        // Get block by hash or seq
        block: async function(params) { // hash, or seq
            return request('/block', params);
        },

        // Get blocks in specific range
        blocks: async function(start, end) {
            return request('/blocks', { start, end });
        },

        // Get last N blocks
        last_blocks: async function(num) {
            return request('/last_blocks', { num });
        },

        // Get address affected transactions
        explorer: async function(address) {
            return request('/explorer/address', { address });
        },

        // Get uxout
        uxout: async function(uxid) {
            return request('/uxout', { uxid });
        },

        // Get address affected uxouts
        address_uxouts: async function(address) {
            return request('/address_uxouts', { address });
        },

        // Coin supply
        coinSupply: async function() {
            return request('/coinSupply');
        },

        // Richlist show top N addresses by uxouts
        richlist: async function(amount = 20, distributions = false) { // -1 = all
            return request('/richlist', { n: amount, 'include-distribution': distributions })
        },

        // Count unique addresses
        addresscount: async function() {
            return request('/addresscount');
        },

        // Get information for a specific connection
        connection: async function(addr) {
            return request('/network/connection', {addr: addr});
        },

        // Get a list of all connections
        connections: async function() {
            return request('/network/connections');
        },

        // Get a list of all default connections
        defaultConnections: async function() {
            return request('/network/defaultConnections');
        },

        // Get list of all trusted connections
        trust: async function() {
            return request('/network/connections/trust');
        },

        // Get a list of all connections discovered through peer exchange
        exchange: async function() {
            return request('/network/connections/exchange');
        },
    }
}();
// https://github.com/skycoin/skycoin/blob/develop/src/gui/README.md
