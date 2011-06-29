# Eventbrite.npm

A Node.js module for interfacing with the [Eventbrite](http://www.eventbrite.com) API

## Installation ##

    npm install eventbrite

## Examples ##

### First, load the Eventbrite module
    Eventbrite = require('./lib/eventbrite').Eventbrite;

### Initialize your API client
- Eventbrite users can request an API key on the following page:
    http://www.eventbrite.com/api/key/
- Each user can find their user_key on this page: 
    http://www.eventbrite.com/userkeyapi

Add your API key below, define a user_key to access private data
    var eb_client = Eventbrite('YOUR_API_KEY','USER_KEY');

Check out the [Eventbrite developer docs](http://developer.eventbrite.com/doc/) for more information about the functions available through this API
    params = {'city': "San Francisco", 'region': "CA"};

    eb_client.event_search( params, function(err, data){
        console.log(err);
        console.log(data);
    });

    
## Resources ##

- [Eventbrite Developer website](http://developer.eventbrite.com/)
- [Eventbrite API docs](http://developer.eventbrite.com/doc/)
- [Eventbrite Open Source](http://eventbrite.github.com/)
- [Eventbrite App Showcase](http://eventbrite.appstores.com/)
- [Eventbrite Branding Guidelines](http://developer.eventbrite.com/news/branding/)
- [Eventbrite Developer Terms of Service](http://developer.eventbrite.com/terms/)