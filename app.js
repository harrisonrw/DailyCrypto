/**
 * DailyCrypto: app.js
 * Licensed under MIT (https://github.com/harrisonrw/DailyCrypto/blob/master/LICENSE)
 */


// https://docs.coinapi.io/#latest-data
const baseURL = 'https://rest.coinapi.io/v1/ohlcv/';

var symbolTable = {
    'ADA': 'KRAKEN_SPOT_ADA_USD',
    'BTC': 'BITSTAMP_SPOT_BTC_USD',
    'BTG': 'BITFINEX_SPOT_BTG_USD',
    'BCH': 'BITSTAMP_SPOT_BCH_USD',
    'DASH': 'KRAKEN_SPOT_DASH_USD',
    'EOS': 'BITFINEX_SPOT_EOS_USD',
    'ETC': 'BITFINEX_SPOT_ETC_USD',
    'ETH': 'BITSTAMP_SPOT_ETH_USD',
    'GNT': 'BITFINEX_SPOT_GNT_USD',
    'KMD': 'BITTREX_SPOT_KMD_USD',
    'LTC': 'BITSTAMP_SPOT_LTC_USD',
    'MKR': 'BITFINEX_SPOT_MKR_USD',
    'NEO': 'BITFINEX_SPOT_NEO_USD',
    'TRX': 'BITFINEX_SPOT_TRX_USD',
    'USDT': 'BITTREX_SPOT_USDT_USD',
    'XLM': 'KRAKEN_SPOT_XLM_USD',
    'XEM': 'LIVECOIN_SPOT_XEM_USD',
    'XMR': 'KRAKEN_SPOT_XMR_USD',
    'XRP': 'BITFINEX_SPOT_XRP_USD',
    'ZEC': 'KRAKEN_SPOT_ZEC_USD'
};

var currencyNameTable = {
    'ADA': 'CARDANO',
    'BTC': 'BITCOIN',
    'BTG': 'BITCOIN GOLD',
    'BCH': 'BITCOIN CASH',
    'DASH': 'DASH',
    'EOS': 'EOS',
    'ETC': 'ETHEREUM CLASSIC',
    'ETH': 'ETHEREUM',
    'GNT': 'GOLEM', 
    'KMD': 'KOMODO',
    'LTC': 'LITECOIN',
    'MKR': 'MAKER',
    'NEO': 'NEO',
    'TRX': 'TRON',
    'USDT': 'TETHER',
    'XEM': 'NEM',
    'XLM': 'STELLAR LUMENS',
    'XMR': 'MONERO',
    'XRP': 'RIPPLE',
    'ZEC': 'ZCASH',
};

const timeZoneOffset = '-08:00';

/**
 * Set the form to the initial state.
 */
function initializeForm() {

    // Get yesterday's date.
    var date = new Date();
    date.setDate(date.getDate() - 1);

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    var day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    var formattedDate = year + '-' + month + '-' + day;

    document.getElementById("currency-symbol").value = 'BTC';
    document.getElementById("date").value = formattedDate;
    document.querySelector('#current-currency-name').textContent = currencyNameTable[currencySymbol];
    document.querySelector('#current-currency-value').textContent = '';
}

/**
 * Form submission handler.
 */
function submitForm() {
    var currencySymbol = document.getElementById("currency-symbol").value;
    var date = document.getElementById("date").value;
    document.querySelector('#current-currency-name').textContent = currencyNameTable[currencySymbol];
    document.querySelector('#current-currency-value').textContent = 'fetching';
    fetchClosePrice(currencySymbol, date);
}

/**
 * Fetch and update the UI with the closing price of a currency on the specified date.
 */
function fetchClosePrice(currencySymbol, date) {

    const formattedDate = date + 'T00:00:00' + timeZoneOffset;

    const url = baseURL + symbolTable[currencySymbol] + '/history?period_id=1DAY&time_start=' + formattedDate;

    var headers = new Headers();
    headers.append('X-CoinAPI-Key', COIN_API_KEY);
    headers.append('Accept', 'application/json');

    var init = { 
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default' 
    };

    var request = new Request(url, init);

    fetch(request)
    .then((resp) => resp.json())
        .then(function(data) {

            if (data.length == 0) {
                console.log('No data');
                return;
            }

            //console.log(data);

            var closePrice = data[0].price_close.toFixed(2);

            document.querySelector('#current-currency-value').textContent = '$' + closePrice;
        })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });   

}

initializeForm();
