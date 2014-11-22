exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['Test1.js'],

    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    }
};