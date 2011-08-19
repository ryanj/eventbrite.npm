# Eventbrite.npm

A javascript client library (Node.js module) for the [Eventbrite](http://developer.eventbrite.com) API

## Installation ##

    npm install eventbrite

## Examples ##

### First, load the Eventbrite module

    var Eventbrite = require('eventbrite');

### Initialize your API client
- Eventbrite users can request an API key on the following page:
    http://www.eventbrite.com/api/key/
- Each user can find their user_key on this page: 
    http://www.eventbrite.com/userkeyapi

Add your API key below. Optionally, you can also supply a user_key to access private data. Clients that do not provide a valid user_key will be limited to public data access levels.

    var eb_client = Eventbrite({'app_key':"YOUR_API_KEY", 'user_key':"YOUR_USER_KEY"});

### [ event_search ]( http://developer.eventbrite.com/doc/events/event_search/ )

    var params = {'city': "San Francisco", 'region': "CA"};

    eb_client.event_search( params, function(err, data){
        console.log(err);
        console.log(data);
    });

### [ event_get ]( http://developer.eventbrite.com/doc/events/event_get/ )

    eb_client.event_get( {'id': EVENT_ID }, function(err, data){
        // render the event as a ticket widget:
        var ticket_widget_html = eb_client.widget.ticket( data.event ); 

        // or, render it as a countdown widget:
        var countdown_widget_html = eb_client.widget.countdown( data.event ); 

        console.log( countdown_widget_html + ticket_widget_html );
    });

### [ event_list_attendees ]( http://developer.eventbrite.com/doc/events/event_list_attendees/ )

    eb_client.event_list_attendees ( {'id': EVENT_ID }, function(err, data){
        console.log(err);
        console.log(data);
    });

### [user_list_events]( http://developer.eventbrite.com/doc/users/user_list_events/ )

    eb_client.user_list_events ( {}, function(err, data){
        console.log(err);
        console.log(data);
    });

Check out the [Eventbrite developer docs](http://developer.eventbrite.com/doc/) for more information about the functions available through the API.

    
## Resources ##

- [Eventbrite Developer website](http://developer.eventbrite.com/)
- [Eventbrite API docs](http://developer.eventbrite.com/doc/)
- [Eventbrite Open Source](http://eventbrite.github.com/)
- [Eventbrite App Showcase](http://eventbrite.appstores.com/)
- [Eventbrite Branding Guidelines](http://developer.eventbrite.com/news/branding/)
- [Eventbrite Developer Terms of Service](http://developer.eventbrite.com/terms/)
