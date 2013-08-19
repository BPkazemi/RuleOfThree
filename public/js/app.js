'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);
  
  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/introspection',
        controller: IntrospectCtrl
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: SignupCtrl
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode = true;
  }]);