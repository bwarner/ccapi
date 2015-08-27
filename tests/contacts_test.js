var appconnect = require("../appconnect");
var Contacts = require("../lib").Contacts;

describe("Contacts initialization", function() {
    it("Contacts collection endpoint", function(done){
    try {
        var contacts =  new Contacts({apikey:appconnect.apikey, accessToken: appconnect.accessToken});
        var next;
        var err;
        function fetchAll(contacts, callback) {
            contacts.list(function (err, response) {
                if (response.meta && response.meta.pagination && response.meta.pagination.next_link) {
                    contacts.next(response.meta.pagination.next_link);
                    fetchAll(contacts, callback);
                }
                else {
                    done(err);
                }
                //console.log(response.result);
            });
        }
        fetchAll(contacts, function(err, result) {
            console.log(result);

        });


    }
    catch(e) {
        console.log("error ", e);
        done(e);
    }

});
});
