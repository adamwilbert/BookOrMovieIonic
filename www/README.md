Book or Movie is an ionic based mobile app that let's user decide which is better, the book or the movie?

The front end of this app (on this repo) is built entirely in Ionic/Angular.  The back end (https://github.com/adamwilbert/BookOrMovie) is built in Node.js Express.js and MongoDB and is currently hosted with Heroku.  The front end uses the API hosted on Heroku to get and use data and makes all of its interactions with the back end through $http requests in Ionic.  

In general the project uses the power of Angular/Ionic on the front end to do some of the heavy lifting of the search/sorting functionality as well as making fairly heavy use of state based views.  The more I wrote code the fewer and fewer views I actually wanted to have.  Soon I would like to combine the Main view and the Movies view into one as there is almost no reason to have them separate currently.  

The app has a variety of dependencies on both the front and back-end, on the front-end the app is dependent on these cordova plugins
"cordovaPlugins": [
  "cordova-plugin-device",
  "cordova-plugin-console",
  "cordova-plugin-whitelist",
  "cordova-plugin-splashscreen",
  "cordova-plugin-statusbar",
  "ionic-plugin-keyboard"
]
as well as
{
    "angular-local-storage": "^0.2.2",
    "body-parser": "^1.15.0",
    "cookie-parser": "^1.4.1",
    "cors": "^2.7.1",
    "dotenv": "^2.0.0",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "mongoose": "^4.4.3",
    "morgan": "^1.6.1",
    "passport": "^0.3.2",
    "passport-google": "^0.3.0",
    "request-promise": "^2.0.0"
  }
  on the back end.

  These can all be included with basic npm install commands.  The app also makes extensive use of the Good Reads API as well as OMDB.  

  The biggest hurdle came early, verifying that a movie is also a book I thought would be one of the largest problems, but was solved by taking a look at how OMDB stores its writer credit.  By doing some simple indexOf functions on the writing credit, I was able to determine whether or not a property was both a movie and a book and then store it in my database.  I feel fairly strongly that a relational database would have been a better choice for storing data here, but I wanted to get some more experience working with MongoDB.  

  I would like to add more functionality surrounding storing of genres of properties and then be able to suggest similar options to users, but the 4 day sprint got in the way.  I plan to implement some of that functionality soon.

  Below are some screenshots and wireframes of the beginning of the project.  


https://trello.com/b/FY1bwDYq/book-or-movie  THis is a trello board I used to keep track of running bugs and information on the app.
