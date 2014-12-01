**About CloneIT**
--
CloneIT is a project developed during the CAS-FEE course 2014 at HSR (Hochschule für Technik Rapperswil). The goal was to rebuild a Reddit.com clone featuring a lot of core functionalities like posting a new link, up- and downvoting, commenting etc. The project encompassed also the setup of a node.js based server including the definition of a restful API and the respective routes. 


**Special Features**
--
 * Fully __flexible and responsive layout__  featuring isotope's masonry layout.
 * **Foundation's blockgrid** delivering flexible full-width filterbar .
 * __Theme chooser__ implemented using the alternate stylesheets technique.
 * Use of an **iconfont** to display the various icons.


**Sophisticated gulp tasks**

 * The dev task runs a **autorestart browser (nodemon)** and the browser is automatically updated in case of CSS changes thanks to **livereload**. Furthermore, the SASS files are compiled with an **included sourcemap**.
 * The build task **tidies up all our CSS** and **reorders the properties**, **minifies** and **concatenates** the CSS and JS files and **transforms small images to base64 files** to save HTTP requests.

**Security**

 * Only session id is stored in cookie - **no login or password** credentials
 * **Only hash** is saved in DB - we don't store any critical data    
 * A **new session** is opened with every login
 * The user is given the possibility to choose to stay logged in or not -> **different session handling**

**Performance**

 * **CDN** for loading jQuery & Angular **with fallback** in case that CDN is not reachable
 * All the Angular files are **concatenated in the gulp build task** to avoid to many HTTP requests
 * Small images are **base64 encoded** in the gulp build task for the same reason

**Multi-device ready**

 * Impressive on 27' screens but playing just as nicely on mobile phones thanks to the **responsive, more minimalistic navigation**
 
**Optimized user interface**
 
 * Gathering a lot of feedback and insights by implementing user **testing on effectiveness, efficiency and overall satisfaction**
 * **Analysing the user feedback** gathered in the 'u-labs' resulting in modified button sizes, adapted wording and the use of more tool tips
 * As a further result of the testing, every single action now causes an **immediate visual feedback** (e.g. when upvoting, button color that was white and then blue on hover changes to green after clicking even while still on hover). Upvoting, downvoting, commenting, adding a new post, erasing a post, log in and out, creation of a new post or a new user all have their own visual feedback which gives the app a very responsive overall-feel.
 * Beautifully **animated SVG graphics** for the **"Blank Slate" state** of the app (CSS only of course)
 
**Analytics**

 * Use of **Google Webmaster Tools** to better understand how the search engines interpret our SPA
 * **Google Analytics** to track the site's visitors and their time spent on the site
 * Optimized the app using the analytical insights provided by **Page Speed** 
 * **Y-Slow** juiced out the last tiny bit of optimization potential of the already optimized app


**Set up the project**
--

Clone the repository to your desktop and make sure node.js, npm and bower are installed. Then install all the node packages with:
```
npm install
```
Same same thing for bower:
```
bower install
```

As there is a little bug in the nedb-connect-session node module, it is neccessary to replace the index.js file. Grab the file index.js from > app > scripts > connect-nedb-session and place it here at node_modules > connect-nedb-session > index.js.

Then just enter:
```
gulp 
```    
This will start an SCSS-compiler and your webserver on port 8888.

If you want the browser to reflect all the changes immediately without having to reload, download the livereload Chrome extension [here](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en). 

On server side, nodemon will already be in place for you to restart the server automagically when changes happen.


**Set up the test environment**
-- 
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
To run the tests use the terminal to navigate to the test folder by

```
cd test
```
 
Then run the test config file with:

```
protractor conf.js
```


###Enjoy!

