var CCAPI = require("./ccapi").CCAPI,
    https = require("https");

function Contacts(options) {
  CCAPI.call(this, options); 

}

Contacts.prototype = Object.create(CCAPI.prototype);

Contacts.prototype.list = function(callback) {
  this.execute('collection', callback);
};


Contacts.prototype.execute = function(operation, payload, callback) {
    callback = typeof payload === 'function' ? payload : callback;

    function flattenParams(params) {
        var queryArray=[];
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                queryArray.push(key + "=" + params[key]);
            }
        }
        return queryArray.join("&");
    }
    var params = {}

    var opts = {
        port: 443,
        hostname: this.host,
        method: 'GET',
        //path: path,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Authorization": "Bearer " + this.accessToken
        }
    };


    params.api_key = this.apikey;
    if (this.nextLink) {
        opts.path =  this.nextLink + "&api_key=" + this.apikey;
    }
    else  {
        var queryString = flattenParams(params);

        if (this.limit) {
            params.limit = Number(this.limit);
        }

        if (operation === 'collection') {
            opts.path = '/v2/contacts';
            if (queryString) {
                opts.path = opts.path + "?" + queryString;
            }
        }
        else {
            throw Error("Unknow operation: " + operation);
        }
    }

    console.log("opts: ", opts);
    this.sendRequest(opts, callback);
};

Contacts.prototype.sendRequest = function(options, payload, callback) {
    callback = typeof payload === 'function' ? payload : callback;

   var req = https.request(options, function(res) {
       //res.headers["Authorization"] = "Bearer " + this.accessToken;
        console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var buffer = '';

       res.on('data', function (chunk) {
           console.log('BODY: ' + chunk);
           buffer = buffer + chunk;
       });

       res.on('end', function (chunk) {
           callback(null, JSON.parse(buffer));
       });

     });

     req.on('error', function(e) { 
       callback(e);
       console.log('problem with request: ' + e.message); 
     }); 
    // write data to request body
    if (typeof payload == 'object') {
        var data = typeof payload === 'object' ? JSON.stringify(payload) : payload.toString();
        req.write(data);
    }
    req.end(); 
  };

module.exports.Contacts = Contacts;

