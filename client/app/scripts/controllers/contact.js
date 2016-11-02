'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ContactCtrl', function($scope, $http, $timeout) {
     $scope.names = []
    ,$scope.currentPage = 1
    ,$scope.numPerPage = 3
   ,$scope.pageSize = 5
    ,$scope.maxSize = 5
    ,$scope.list = [];
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
        //document.getElementById("loader").style.display = "none";
    });
    
     $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    
    $scope.$on('lazyLoading', function () {
      $timeout(function() {
        var tempList = [];
        var temp = 0;
        for(var i = 0; i < 10; i++) {
          temp++;
          tempList.push(temp);
        }
        $scope.list = $scope.list.concat(tempList);
        if($scope.list.length > 50) {
          console.log($scope.list.length);
          $scope.$broadcast('allLoaded');
         // $scope.list = [{text: 'DONE'}];
          return;
        }
        $scope.$broadcast('lazyLoadingFinished');
      }, 1000);
    });
  });
