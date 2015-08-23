"use strict";

function CCAPI(options) {
  var opts = options || {};
  var host = opts.host || "api.constantcontact.com";
  if (opts.apikey && opts.accessToken && host) {
      Object.defineProperties(this, {
          "accessToken": {value : opts.accessToken, enumerable : true},
          "apikey": {value : opts.apikey, enumerable : true},
              "host": {value:host, enumerable : true, writable: true},
              "limit": {enumerable : true, writable: true},
          "nextLink":{enumerable:true, writable:true}
        }
      );
  }
  else {
    throw Error("apikey and accessToken are requried")
  }
}

CCAPI.prototype.next = function(nextLink) {
    this.nextLink = nextLink;
    return this;
};

CCAPI.prototype.limit = function(limit) {
    this.limit = limit;
    return this;
};
module.exports.CCAPI = CCAPI;
