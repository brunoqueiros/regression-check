require( "babel/register" );

import Regression from './regression';

var r = new Regression({
  "browser": ['phantomjs'],

  "screenshotDirectory": "screenshots",

  "viewport": [1200],

  "project": "jquery",

  "url": "http://www.jquery.com"
});
