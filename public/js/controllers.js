'use strict';

/* Controllers */

function IntrospectCtrl($scope, $http) {
  // Fetch answers from textfield models, then send a POST to update the data
  $scope.validateAndSubmit = function() {
  	$scope.recent = {
  		'first': ($scope.firstQ || ''),
  		'second': ($scope.secondQ || ''),
  		'third': ($scope.thirdQ || '')
  	}

  	$http.post('/addAnswer', $scope.recent)
    .success(function(data) {
  		  // $scope.answers = data;

        $http.get('/answers').success(function(data) {
          $scope.answers = data;
        });
      });
  }
  // $http.get('/api/posts').success(function(data) {
  // 	$scope.posts = data.posts;
  // });
}

function SignupCtrl($scope, $http) {
  $scope.signup = 'Yo! Join the party.';
}