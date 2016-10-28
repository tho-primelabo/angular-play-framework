'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ]).directive('activeLink', function ($location) {
    return {
       restrict: 'A', //use as attribute 
    replace: false,
    link: function (scope, elem) {
        //after the route has changed
        scope.$on("$routeChangeSuccess", function () {
            var hrefs = ['/#' + $location.path(),
                         '#' + $location.path(), //html5: false
                         $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                if (-1 !== hrefs.indexOf(a.attr('href'))) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');   
                }
            });
        });
    }
   
  };
})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      }).when('/about', {
        templateUrl: 'views/about.html',
        // controller: 'MainCtrl',
        // controllerAs: 'main'
      }).when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        // controllerAs: 'main'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        // controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        // controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

