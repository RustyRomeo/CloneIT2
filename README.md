**About CloneIT**
--
CloneIT is a project developed during the CAS-FEE course 2014 at HSR (Hochschule für Technik Rapperswil). The goal was to rebuild a Reddit.com clone featuring a lot of core functionalities like posting a new link, up- and downvoting, commenting etc. The project encompassed also the setup of a node.js based server including the definition of a restful API and respective routes. 

**Special Features**
--
 * Fully __flexible and responsive layout__  featuring isotope's masonry layout.
 * **Foundation's blockgrid** delivering flexible full-width filterbar .
 * __Theme chooser__ implemented using the alternate stylesheets technique.
 * Use of an **iconfont** to display the various icons.


**Sophisticated gulp tasks**
* The dev task runs a autorestart browser (nodemon) and the browser is
   automatically updated in case of CSS changes thanks to livereload. 
   Furthermore, the SASS files are compiled with an included sourcemap.
 * The build task tidies up all our CSS and reorders the properties,
   minifies and concatenates the CSS and JS files and transforms small
   images to base64 files to save HTTP requests.

**Security**

 - (302 bei erfolgreichem Login um back button login zu verhindern)
 - A new session is openend with every login
 - 
 - 

**Performance**

 - **CDN** for loading jQuery & Angular **with fallback** in case that CDN is not reachable
 - All the Angular files are **concatenated in the gulp build task** to avoid to many http requests

**Multi-device ready**


 - Impressive on 27' screens. Also optimized for mobile phones with a different, more minimalistic user interface.

**Analytics**

 - Google Webmaster Tools
 - Google Analytics
 - Page Speed
 - Y-Slow

**Installation**
--

* Clone the repository to your desktop
* Make sure node.js, npm and bower are installed
* Then install all the node packages with 
```
npm install
```
Same same thing for bower:
```
bower install
```
Install protractor globally:
``` 
npm install -g protractor
```
The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:
``` 
webdriver-manager update
```
If you wanna run the test server, enter:
``` 
webdriver-manager start
```

As there is a little bug in the nedb-connect-session node module, it is neccessary to replace the index.js file. Grab the file from > dist > connect-nedb-session > index.js and place it here: node_modules > connect-nedb-session > index.js.

Then just enter:
```
gulp 
```    
This will start an SCSS-compiler and your webserver on port 8888.

If you want the browser to reflect all the changes immediately without having to reload, download the livereload Chrome extension [here](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en). 

On server side, nodemon will already be in place for you to restart the server automagically when changes happen.

###Enjoy!

