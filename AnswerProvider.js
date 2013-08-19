var mongodb = require('mongodb');

var Server = mongodb.Server,
	Db = mongodb.Db,
	Connection = mongodb.Connection,
	BSON = mongodb.BSON,
	ObjectID = mongodb.ObjectID;

var answersCounter = 1;

AnswerProvider = function(host, port) {
	this.db = new Db('RuleOfThree', new Server(host, port, {auto_reconnect: true}), {w:1});
	this.db.open(function (err) {});
};

// An easier way to get the answers collection
AnswerProvider.prototype.getCollection = function(callback) {
	this.db.collection('answers', {w:1}, function( error, answers_collection ) {
		if( error ) callback(error);
		else callback(null, answers_collection);
	});
};

// Get all results of the answers collection
AnswerProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, answers_collection) {
		if( error ) callback(error);
		else {
			answers_collection.find().toArray(function(error, results) {
				if(error) callback(error);
				else callback(null, results);
			});
		};
	});
};

AnswerProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, answers_collection) {
		if(error) callback(error);
		else {
			answers_collection.findOne({_id: answers_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
				if(error) callback(error);
				else callback(null, result);
			});
		}
	});
};

AnswerProvider.prototype.save = function(answers, callback) {
	this.getCollection(function (error, answers_collection) {
		if(error) callback(error);
		else {
			answers.created_at = new Date();
			answers_collection.insert(answers, {w:1}, function() {
				callback(null, answers);
			});
		}
	});
};

exports.AnswerProvider = AnswerProvider;
// [
// 	{
// 		id: 0
// 		username: 'Babak',
// 		answers: [
// 			dateCreated: {
// 				first: 'michael jordan',
// 				second: 'usain bolt',
// 				third: 'Fedor E.'
// 			},
// 			dateCreated: {
// 				first: 'michael jordan',
// 				second: 'usain bolt',
// 				third: 'Fedor E.'
// 			}
// 		]
// 	},
// 	{
// 		id: 1
// 		username: 'Yassi',
// 		answers: [
// 			dateCreated: {
// 				first: 'flowers',
// 				second: 'medical school',
// 				third: 'wedding'
// 			},
// 			dateCreated: {
// 				first: 'one',
// 				second: 'two',
// 				third: 'three'
// 			}
// 		]
// 	}
// ]
