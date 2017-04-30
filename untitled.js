class ProviderAbstract {
constructor(shippotoken){
    this.shippotoken = shippotoken;
}
getRates(object_id){
var https = require('https');    
var optionsget = {
    host : 'api.goshippo.com', 
    port : 443,
    path : '/shipments/',
    headers: {
        'Authorization': 'ShippoToken ' + this.shippotoken 
    }   

};
console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');
 
// do the GET request
var reqGet = https.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
 
 
    res.on('data', function(d) {
        console.info('GET result:\n');
        var parsed = JSON.parse(d);
        var array_of_results = parsed.results;
        var index;
        var array = [];
        for (index = 0; index < array_of_results.length; index++) {
          array.push(parsed.results[index].rates.amount);
        }
        console.log(array);
        console.info('\n\nCall completed');
    });
 
});
 
reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});
}
}
class CanadaPostProvider extends ProviderAbstract{

}
const myCPInstance = new CanadaPostProvider('shippo_test_d1f4e4bb3c2cb6237349cb6f1216d52bb9222062')
const object_id = '6ee44027e3a543d18ff21294c571e528';
console.log(myCPInstance.getRates(object_id));