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
    document.querySelector('#current-currency-name').textContent = currencyNameTable[currencySymbol][0];
    document.querySelector('#current-currency-value').textContent = '';
}

/**
 * Form submission handler.
 */
function submitForm() {
    var currencySymbol = document.getElementById("currency-symbol").value;
    var date = document.getElementById("date").value;
    document.querySelector('#current-currency-name').textContent = currencyNameTable[currencySymbol][0];
    document.querySelector('#current-currency-value').textContent = '';
    fetchClosePrice(currencySymbol, date);
}

/**
 * Fetch and update the UI with the closing price of a currency on the specified date.
 */
function fetchClosePrice(currencySymbol, date) {

    const formattedDate = date + 'T00:00:00' + timeZoneOffset;

    const url = baseURL + symbolTable[currencySymbol][0] + '/history?period_id=1DAY&time_start=' + formattedDate;

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
