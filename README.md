CloneIT2
========

Ressources for intial setup:

http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/


To install all dependencies, let's fire up npm::

    $ > mydesiredprojectpathname > npm install

To start the server, we use:

    $ > mydesiredprojectpathname > npm start

But first we have to install MongoDB. Follow the instructions here:

    http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

In your Mongo installation folder, let's setup a path to our data start up the server:

    $ > mongod --dbpath mydesiredprojectpathname\data

The server normally runs at port 27017. Then still in your Mongo installation folder, enter:

    $ > mongo

All right, you've got MongoDB up and running, and you've connected to it with the client. We'll can use this client to manually work on our database, but it's not necessary for running the website. Only the server daemon (mongod) is needed for that.

In your Mongo console, enter the following to start using our db instead of the test db:

    use mydesiredprojectpathname
