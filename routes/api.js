/*
 *  Routes requests to database methods
 */


var AnswerProvider = require('../AnswerProvider').AnswerProvider;

var answerProvider = new AnswerProvider('localhost', 27017);

// GET
exports.getAllAnswers = function (req, res) {
  answerProvider.findAll(function(error, answers_array) {
    if(!error) {
      res.send({answers: answers_array});
    }
    else {
      res.send({'error': 'An error occurred'});
    }
  });
}

exports.getAnswer = function(req, res) {
  var id = req.params.id;
  answerProvider.findById(id, function(error, result) {
    if(!error) {
      res.send({answer: result});
    }
    else {
      res.send({'error': 'An error occurred'});
    }
  });
}

// POST
exports.addAnswer = function (req, res) {
  var answer = req.body;
  answerProvider.save(answer, function(error, result) {
    if(!error) {
      console.log('Successfully added answer: ' + result);
      res.send(result);
    }
    else {
      res.send({'error': 'An error occurred'});
    }
  });
}

//  var data = {
//     'posts': [
//       {
//         'first': 'Life',
//         'second': 'Love',
//         'third': 'The pursuit of happiness.'
//       }
//     ]
//   };

// // GET

// exports.post = function(req, res) {
//   var id = req.params.id;
//   if(id >= 0 && id < data.posts.length) {
//     res.json({
//       post: data.posts[id]
//     });
//   } else {
//     res.json(false);
//   }
// }

// exports.posts = function(req, res) {
//   res.json({
//     posts: data.posts
//   });
// }

// // POST

// exports.addPost = function(req, res) {
//   data.posts.push(req.body);
//   res.json(data);
// }