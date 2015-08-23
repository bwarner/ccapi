var CCAPI = require("../lib"),CCAPI;

describe("CCAPI initialization", function() {
  it("requires an accessToken and apiKey in contstructor", function(){
      try {
       var ccapi =  CCAPI();
        fail("excepted constructor to fail");
      }
      catch(e) {
      }
      
    });
});
