var Datastore = require('nedb')
  , db = new Datastore({ filename: 'path/to/datafile', autoload: true });