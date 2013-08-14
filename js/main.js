var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
	$scope.validateAndSubmit = function() {
		$scope.answers = ($scope.firstQ || '') + ' '
			+ ($scope.secondQ || '') + ' '
				+ ($scope.thirdQ || '');
	};
});

app.config(function($routeProvider) {
	$routeProvider.when('/',
		{
			controller: 'MainCtrl',
			templateUrl: './partials/partial_introspection.html'
		})
	.when('/signup', 
		{
			controller: 'MainCtrl',
			templateUrl: './partials/partial_signup.html'
		})
	.otherwise({ redirectTo: '/' });
});