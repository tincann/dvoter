var useragent = require('random-useragent');
var exec = require('child_process').exec;

var casper = require('casper').create({
    verbose: true,
    // logLevel: 'debug',
    waitTimeout: 1000,
    pageSettings: {
        loadImages: false,
        loadPlugins: false
    }
});
var votes = 0;

casper.start();

function vote(){
    
    casper.thenOpen('https://api.ipify.org/', function(){
        console.log('');
        console.log('--- Starting...', new Date());
        console.log('Current IP Address:', this.getElementInfo('pre').html);
        setRandomUseragent();
    });

    casper.thenOpen('https://nl.surveymonkey.com/r/gse15vote', function(){
        //Click on candidate
        var candidate = this.getElementInfo('.answer-label.radio-button-label .radio-button-label-text').html.trim();
        console.log('Voting on:', candidate);
        this.click('.answer-label.radio-button-label');

        //Check if checkbox is actually checked
        console.log('Checked?: ', this.evaluate(function(){
            return document.querySelectorAll('.radio-button-container input')[0].checked;
        }));

        //Click on vote
        this.click('button');
    });

    casper.then(function(){
        console.log('Success!:', this.getCurrentUrl());
        casper.clear();
        phantom.clearCookies();

        var waitTime = Math.random() * 9 * 60 * 1000 + 1 * 60 * 1000;
        console.log('Votes so far:', ++votes);
        console.log('Waiting for', waitTime / 60000, 'minutes');
        this.wait(waitTime);
        
        vote();        
    });
}

vote();

casper.run();

function setRandomUseragent(){
    var ua = useragent.getRandom(function (uagent) {
        return uagent.browserName === 'Chrome' || 
               uagent.browserName === 'Firefox' || 
               uagent.browserName === 'IE';
    });
    console.log('Using useragent:', ua);
    casper.userAgent(ua);
}
