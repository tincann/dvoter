In order to run the script the following has to be done:
* Install `PhantomJS 1.9.8` or higher and make sure it's in your PATH.
* Run `npm install` in the directory.
* Also install CasperJS: `npm install -g casperjs`.

Run the script with `casperjs main.js`.

Additionally if you want run the script through a tor proxy, then run the command:

`casperjs --proxy=127.0.0.1:9050 --proxy-type=socks5 main.js` where `9050` is the port that the tor service is listening on.
