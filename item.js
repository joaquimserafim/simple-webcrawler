/*global require*/
/*blobal exports*/
/**
 * Created with IntelliJ IDEA.
 * User: joaquimserafim
 * Date: 11/05/13
 * Time: 16:36
 * To change this template use File | Settings | File Templates.
 */
/**
 * external modules
 */
var mongojs = require('mongojs');// mongojs driver
/**
 * internal
 */
var mongodbClient = mongojs('mongodb://localhost:27017/crawler?w=1', ['items']);// mongodb client
/**
 * Item class
 */
var Item = function (obj) {
	for (var key in obj) {// iterate keys in the object passed
		if (obj.hasOwnProperty(key)) {
			this[key] = obj[key];// merge values
		}
	}
};
/**
 * save item
 * @param cb - callback
 */
Item.prototype.save = function (cb) {
	var self = this;
	// save doc in MongoDB
	mongodbClient.items.insert(self, {safe: true}, function (err, res) {
		if (err) {
			return cb(err, null);
		}
		// result
		return cb(null, res ? res[0]._id : 0);
	});
};
/**
 * export the class
 */
module.exports = Item;
