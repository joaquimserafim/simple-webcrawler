/**
 * external modules
 */
var mongojs = require('mongojs');// mongojs driver

// mongodb client
var mongodbClient = mongojs('mongodb://localhost:27017/crawler?w=1', ['items']);


function Item(obj) {
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
Item.prototype.save = function(cb) {
	var self = this;
	// save doc in MongoDB
	mongodbClient.items.insert(self, {safe: true}, function(err, res) {
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
