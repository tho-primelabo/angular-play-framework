'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ContactCtrl', function($scope, $http) {
     $scope.filteredTodos = []
     ,$scope.names = []
    ,$scope.currentPage = 1
    ,$scope.numPerPage = 4
    ,$scope.maxSize = 5;
   $http.get('app/users')
    .error(function(data, status) {
         console.log(data);
             if(status === 400) {
            
               angular.forEach(data, function(value, key) {
                 if(key === 'email' || key === 'password') {
                   //console.log(key+':' + value);
                   alertService.add('danger', key + ' : ' + value);
                 } else {
                   alertService.add('danger', value.message);
                 }
               });
             }
             if(status === 500) {
               alertService.add('danger', 'Internal server error!');
             }
           })
    .success(function(data) {
       console.log(data);
       $scope.names = data;
        $scope.filteredTodos = $scope.names;
    });
    
    $scope.$watch("currentPage + numPerPage", function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

    $scope.filteredTodos = $scope.names.slice(begin, end);
  });
  });
