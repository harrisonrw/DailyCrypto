/**
 * CryptoDashboard: app.js
 * Licensed under MIT (https://github.com/harrisonrw/CryptoDashboard/blob/master/LICENSE)
 */


// https://docs.coinapi.io/#latest-data
const baseURL = 'https://rest.coinapi.io/v1/ohlcv/';

var symbolTable = {};
symbolTable['BTC'] = ['BITSTAMP_SPOT_BTC_USD'];
symbolTable['ETH'] = ['BITSTAMP_SPOT_ETH_USD'];

var currencyNameTable = {};
currencyNameTable['BTC'] = ['BITCOIN'];
currencyNameTable['ETH'] = ['ETHEREUM'];

function submitForm() {
    var symbol = document.getElementById("currency-symbol").value;
    document.querySelector('#current-currency-name').textContent = currencyNameTable[symbol][0];
    document.querySelector('#current-currency-value').textContent = '';
    fetchClosePrice(symbol)
}

function fetchClosePrice(symbol) {

    const url = baseURL + symbolTable[symbol][0] + '/history?period_id=1DAY&time_start=2019-02-21T00:00:00-08:00'

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

            console.log(data);

            var closePrice = data[0].price_close

            document.querySelector('#current-currency-value').textContent = '$' + closePrice;
        })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });   

}
