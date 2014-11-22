describe('CloneIt basic tests', function() {
    browser.get('http://localhost:8888/');
    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('boah!');
    });

    it('should login', function() {
        browser.waitForAngular();
        element(by.linkText('Log in here, Stranger.')).click();
        element(by.model('user.login')).sendKeys('benno');
        element(by.model('user.password')).sendKeys('xxx');
        element(by.buttonText('Login')).click();
        browser.waitForAngular();

        expect(element(by.linkText('Benno Dietrich')).getText()).toEqual('Benno Dietrich');

    });

    it('should log out', function() {
        element(by.linkText('Benno Dietrich')).click();
        browser.waitForAngular();
        element(by.buttonText('Logout')).click();
        browser.waitForAngular();
        expect(element(by.linkText('Log in here, Stranger.')).getText()).toEqual('Log in here, Stranger.');

    });

    it('should add a new post', function() {
        var row = element.all(by.repeater('post in store.post'));
        var count = row.count();
        browser.waitForAngular();

        element(by.linkText('Log in here, Stranger.')).click();
        element(by.model('user.login')).sendKeys('benno');
        element(by.model('user.password')).sendKeys('xxx');
        element(by.buttonText('Login')).click();
        browser.waitForAngular();
        element(by.linkText('Benno Dietrich')).click();
        element(by.model('newPostCtrl.title')).sendKeys('TestPost');
        element(by.model('newPostCtrl.url')).sendKeys('http://www.google.ch');
        element(by.cssContainingText('option', 'Music')).click();
        element(by.buttonText('Add New Link')).click();

        var row2 = element.all(by.repeater('post in store.post'));
        count2 = row2.count();
        browser.waitForAngular();

        //Check if the post storage has increased after creating a new post
        expect(count2).toNotEqual(count);
    });
});