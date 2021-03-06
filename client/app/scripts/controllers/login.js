'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, userService, $location, $log, $http, alertService) {

     $scope.isAuthenticated = function() {
       if(userService.username) {
         $log.debug(userService.username);
         $location.path('/main');
       } else {
         $log.debug('else:'+userService.username);
         // $http.get('/app/isauthenticated')
             // .error(function() {
               // $location.path('/login');
             // })
             // .success(function(data) {
               // if(data.hasOwnProperty('success')) {
                 // userService.username = data.success.user;
                 // $location.path('/main');
               // }
             // });
         $location.path('/login');
       }
     };

     $scope.isAuthenticated();

     $scope.login = function() {
      console.log('login start');
       var payload = {
         email : this.email,
         password : this.password
       };
       console.log(payload);
       $http.post('/app/login', payload)
           .error(function(data, status){
             if(status === 400) {
               angular.forEach(data, function(value, key) {
                 if(key === 'email' || key === 'password') {
                   alertService.add('danger', key + ' : ' + value);
                 } else {
                   alertService.add('danger', value.message);
                 }
               });
             } else if(status === 401) {
               alertService.add('danger', 'Invalid login or password!');
             } else if(status === 500) {
               alertService.add('danger', 'Internal server error!');
             } else {
               alertService.add('danger', data);
             }
           })
           .success(function(data){
             $log.debug(data);
             if(data.hasOwnProperty('success')) {
               userService.username = data.success.user;
               $location.path('/main');
             }
           });
     };
  });
