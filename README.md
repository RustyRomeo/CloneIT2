CloneIT2
========

Ressources for intial setup:

http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/


To install all dependencies, cd to desired installation folder and let's fire up npm::

    npm install

To start the server, we could use:

    npm start

But as we don't want to restart our server after every change, we gonna install Nodemon (https://github.com/remy/nodemon), which restarts the server automatically after changes have taken places. 

    npm install -g nodemon

This allows us to start the server with:

    nodemon ./bin/www

But first we have to install MongoDB. Follow the instructions here for an installation on a Mac:

    http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

In your Mongo installation folder, let's setup a path to our data start up the server:

    mongod --dbpath mydesiredprojectpathname\data

The server normally runs at port 27017. Now you need to open a second command prompt. Navigate again to your Mongo installation directory and type:

    mongo

All right, you've got MongoDB up and running, and you've connected to it with the client. We can use this client to manually work on our database, but it's not necessary for running the website. Only the server daemon (mongod) is needed for that.

In your Mongo console, enter the following to start using our db instead of the test db:

    use projectName

Now you are good to go!
