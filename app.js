/*global require*/

var Crawler = require("simplecrawler");
var moment = require('moment');

var Item = require('./item');
var logger = require('./log');

(function() {
  var appName = 'crawler';
  // url to crawler
  var crawler = Crawler.crawl('http://www.site?????.pt/');
  // count the number off fetches
  var opNumber = 0;
  // timeout
  /**
   * crawler start
   */
  crawler.on("crawlstart", function() {
    logger.log(appName, logger.level.Info, 'crawler start');
  });
  /**
   * receive a 404
   */
  crawler.on("fetch404", function(queueItem, response) {
    logger.log(appName, logger.level.Error, ['Receive an 404:', queueItem.url, ', with response:', response.length].join(''));
  });
  /**
   * error on fetch
   */
  crawler.on("fetcherror", function(queueItem, response) {
    logger.log(appName, logger.level.Error, ['Error on fetch:', queueItem.url, 'with response:', response.length].join(''));
  });
  /**
   * fetch client error
   */
  crawler.on("fetchclienterror", function(queueItem, errorData) {
    logger.log(appName, logger.level.Error, ['fetch client error:', queueItem.url, ', error:', errorData].join(''));
  });

  /**
   * fetchcomplete
   */
  crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    // save in mongodb
    var item = new Item(queueItem);// create object
    item.save(function (err, res) {// save object
      if (err) {
        logger.log(appName, logger.level.Warning, [
          'op:',
          ++opNumber,
          ', ',
          'save in mongodb:',
          res, ', resource:',
          queueItem.url
        ].join(''));
        return;
      }
      // OK
      logger.log(appName, logger.level.Info, ['save in mongodb:', res, ', resource:',  queueItem.url].join(''));
    });
  });
  /**
   * complete process
   */
  crawler.on("complete", function() {
    logger.log(appName, logger.level.Info, 'crawler complete');
  });
})();


