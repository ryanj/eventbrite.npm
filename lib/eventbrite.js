/**
 * Eventbrite API Client for node.js
 * @author Ryan Jarvinen
 */
var qs = require('querystring'),
    https = require("https");

var Eventbrite = function (tokens, user_key, password) {
    this.api_host = "www.eventbrite.com";
    this.auth_tokens = {};
    this.headers = {
        "Host": this.api_host,
        "Content-Type": "application/json; charset=utf-8"
    };

    if( typeof tokens === 'object'){
        this.auth_tokens = tokens;
        if(this.auth_tokens.access_token){
            this.headers['Authorization']='Bearer '+this.auth_tokens.access_token;
        }
    }else{
        this.auth_tokens.app_key = tokens;
        if(password !== undefined){
            this.auth_tokens.password = password;
            this.auth_tokens.user = user_key;
        }else if(user_key !== undefined){
            this.auth_tokens.user_key = user_key;
        }
    }
    
    if (!(this instanceof Eventbrite)) {
        return new Eventbrite(tokens, user_key, password);
    }
};

Eventbrite.prototype = {
    api_methods: ['discount_new', 'discount_update', 'event_copy', 'event_get', 'event_list_attendees', 'event_list_discounts', 'event_new', 'event_search', 'event_update', 'organizer_list_events', 'organizer_new', 'organizer_update', 'organizer_get', 'payment_update', 'ticket_new', 'ticket_update', 'user_get', 'user_list_events', 'user_list_organizers', 'user_list_tickets', 'user_list_venues', 'user_new', 'user_update', 'venue_new', 'venue_get', 'venue_update'],
    request: function (method, params, callback) {
        var parameters={};
        if(typeof params === 'function'){
            callback = params;
        }else{
            parameters = params;
        }
        if(this.auth_tokens.access_token === undefined){
            if(this.auth_tokens.app_key){params.app_key = this.auth_tokens.app_key;}
            if(this.auth_tokens.user_key){params.user_key = this.auth_tokens.user_key;}
            if(this.auth_tokens.app_key){params.password = this.auth_tokens.password;}
        }

        var options = {
            host: this.api_host,
            path: '/json/' + method + '?' + qs.stringify(parameters),
            method: 'GET',
            headers: this.headers
        };        
    
        https.request(options, function (res) {
            var data = '';
            var err = null;
    
            res.addListener('data', function (chunk) {
                data += chunk.toString();
            });
    
            res.addListener('end', function () {
                if (res.statusCode >= 400) {
                    //throw new Error('');
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
    },

  // Widget rendering functions

    'widget': {
        'ticket': function( evnt ) {
            return '<div style="width:100%; text-align:left;" ><iframe    src="http://www.eventbrite.com/tickets-external?eid=' + evnt.id + '&ref=etckt" frameborder="0" height="192" width="100%" vspace="0" hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe><div style="font-family:Helvetica, Arial; font-size:10px; padding:5px 0 5px; margin:2px; width:100%; text-align:left;" ><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/r/etckt" >Online Ticketing</a><span style="color:#ddd;" > for </span><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/event/' + evnt.id + '?ref=etckt" >' + evnt.title + '</a><span style="color:#ddd;" > powered by </span><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com?ref=etckt" >Eventbrite</a></div></div>';
        },
        'registration': function( evnt ) {
            return '<div style="width:100%; text-align:left;" ><iframe    src="http://www.eventbrite.com/event/' + evnt.id + '?ref=eweb" frameborder="0" height="1000" width="100%" vspace="0" hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe><div style="font-family:Helvetica, Arial; font-size:10px; padding:5px 0 5px; margin:2px; width:100%; text-align:left;" ><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/r/eweb" >Online Ticketing</a><span style="color:#ddd;" > for </span><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/event/' + evnt.id + '?ref=eweb" >' + evnt.title + '</a><span style="color:#ddd;" > powered by </span><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com?ref=eweb" >Eventbrite</a></div></div>';
        },
        'calendar': function ( evnt ) {
            return '<div style="width:195px; text-align:center;" ><iframe    src="http://www.eventbrite.com/calendar-widget?eid=' + evnt.id + '" frameborder="0" height="382" width="195" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="true"></iframe><div style="font-family:Helvetica, Arial; font-size:10px; padding:5px 0 5px; margin:2px; width:195px; text-align:center;" ><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/r/ecal">Online event registration</a><span style="color:#ddd;" > powered by </span><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com?ref=ecal" >Eventbrite</a></div></div>';
        }, 
        'countdown': function ( evnt ) {
            return '<div style="width:195px; text-align:center;" ><iframe    src="http://www.eventbrite.com/countdown-widget?eid=' + evnt.id + '" frameborder="0" height="479" width="195" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="true"></iframe><div style="font-family:Helvetica, Arial; font-size:10px; padding:5px 0 5px; margin:2px; width:195px; text-align:center;" ><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/r/ecount" >Online event registration</a><span style="color:#ddd;" > for </span><a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/event/' + evnt.id + '?ref=ecount" >' + evnt.title + '</a></div></div>';
        }, 
        'button': function ( evnt ) {
            return '<a href="http://www.eventbrite.com/event/' + evnt.id + '?ref=ebtn" target="_blank"><img border="0" src="http://www.eventbrite.com/custombutton?eid=' + evnt.id + '" alt="Register for ' + evnt.title + ' on Eventbrite" /></a>';
        }, 
        'link': function ( evnt, text, color ) {
            return '<a href="http://www.eventbrite.com/event/' + evnt.id + '?ref=elink" target="_blank" style="color:' + ( color || "#000000" ) + ';">' + ( text || evnt.title ) + '</a>';
        } 
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

module.exports = Eventbrite;
