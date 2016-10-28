'use strict';

angular.module('clientApp').controller('NavbarController', function NavbarController($scope, $location) {

  $scope.routeIs = function(routeName) {
    console.log( $location.path() );
    return $location.path() === routeName;
     
  };
});
