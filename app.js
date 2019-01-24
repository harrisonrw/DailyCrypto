/**
 * CryptoDashboard: app.js
 * Licensed under MIT (https://github.com/harrisonrw/CryptoDashboard/blob/master/LICENSE)
 */

function submitForm() {
    var currencyId = document.getElementById("currency-id").value;
    console.log(currencyId);

    // TODO: Use Fetch to call a cryptocurrency API.
    document.querySelector('#current-currency-name').textContent = currencyId;
}
