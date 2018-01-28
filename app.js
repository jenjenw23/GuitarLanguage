$('document').ready(function() {

    var webAuth = new auth0.WebAuth({
        domain: "guitarlanguage.auth0.com",
        clientID: "y8AA4z9Gre45oDzkbPIjJTM4RnE36HJG",
        redirectUri: "https://cocky-sinoussi-e4da0e.netlify.com/",
        audience: 'https://' + "guitarlanguage.auth0.com" + '/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    var loginBtn = $('#authLogin');

    loginBtn.click(function(e) {
        e.preventDefault();
        webAuth.authorize();
    });

    // cors work around for use in browsers like chrome
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // caching jquery object
    var $bit = $("#bit-div");

    //this function connects to the bitcoin weighted average api and
    //prints it to the $bit div
    var sevenDayWeightedAvg = function() {
        var queryURL = "http://api.bitcoincharts.com/v1/weighted_prices.json";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response;

            var obj = JSON.parse(results);
            console.log(obj.USD);

            // Printing the entire object to console
            var us = obj.USD["7d"];

            // Constructing HTML containing the bitcoin information
            $bit.html("Bitcoin USD 7 day weighted average price: $" + "<span>" + us + "</span>" + "<br>");

        });
    }
    // sevenDayWeightedAvg;
    // console.log(sevenDayWeightedAvg);

    // use the setInterval method to call sevenDayWeightedAvg every 1 min
    setInterval(sevenDayWeightedAvg, interval);
    //set interval for ajax repeated call
    var interval = 60000;


});
