/**
 * Eventbrite API Client for node.js
 * @author Ryan Jarvinen
 */
var qs = require('querystring'),
    http = require("http");

var Eventbrite = exports.Eventbrite = function (apikey,userkey) {
    this.api_host = "www.eventbrite.com";
    this.app_key = apikey;
    this.user_key = userkey;
    this.headers = {
        "Host": this.api_host,
        "Content-Type": "application/json; charset=utf-8"
    };
    
    if (!(this instanceof Eventbrite)) {
        return new Eventbrite(apikey, userkey);
    }
};

Eventbrite.prototype = {
    api_methods: ['discount_new', 'discount_update', 'event_copy', 'event_get', 'event_list_attendees', 'event_list_discounts', 'event_new', 'event_search', 'event_update', 'organizer_list_events', 'organizer_new', 'organizer_update', 'organizer_get', 'payment_update', 'ticket_new', 'ticket_update', 'user_get', 'user_list_events', 'user_list_organizers', 'user_list_tickets', 'user_list_venues', 'user_new', 'user_update', 'venue_new', 'venue_get', 'venue_update'],
    request: function (method, params, callback) {
        params.app_key = this.app_key;
        if ( this.user_key !== undefined ) {
            params.user_key = this.user_key;
        }

        var options = {
            host: this.api_host,
            path: '/json/' + method + '?' + qs.stringify(params),
            method: 'GET',
            headers: this.headers
        };        
    
        http.request(options, function (res) {
            var data = '';
            var err = null;
    
            res.addListener('data', function (chunk) {
                data += chunk.toString();
            });
    
            res.addListener('end', function () {
                if (res.statusCode >= 400) {
                    err = {statusCode:res.statusCode,data:JSON.parse(data)};
                    data = null;
                } else {
                    data = JSON.parse(data);
                    if (data.error){
                        err = data.error;
                        data = null;
                    }
                }
                callback(err,data,res);
            });
        }).end();
    }
};

(function(){
    var len = Eventbrite.prototype.api_methods.length;
    function addMethod ( method ) {
        Eventbrite.prototype[method] = function( params, callback) {
            this.request( method, params, callback );
        }
    }

    for ( var i = 0; i < len ; i += 1 ){
        addMethod( Eventbrite.prototype.api_methods[i] );
    }
}());
