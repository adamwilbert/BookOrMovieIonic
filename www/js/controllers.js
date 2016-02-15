angular.module('starter.controllers', [])

.controller('MainController', function($scope) {
  $scope.secret = 'Espeon is bae'
})

.controller('PropertiesCtrl', function($scope, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    var vm = this
      vm.test = 'espeon is bae';

      //pokemon api call through angular
      var allPropertiesUrl = 'http://localhost:8080/properties/api';
      vm.allProperties = [];

      $http.get(allPropertiesUrl)
        .success(function(data){
          vm.allProperties = data;
        });

})

.controller('PropertyDetailCtrl', function($scope, $http, $stateParams) {
    var vm = this
    vm.test = 'espeon is bae'



    var allPropertiesUrl = 'http://localhost:8080/properties/api/';
    $http.get(allPropertiesUrl + $stateParams.propertyId)
        .success(function(data){
          vm.movieCriticReview=data[0].movieCriticReview
          vm.bookCriticReview=data[0].bookCriticReview
          vm.bookTitle = data[0].bookTitle
          vm.bookTitle = data[0].movieTitle
          vm.name = data[0].movieTitle
          vm.poster = data[0].poster
        });
})

.controller('UserCtrl', function($scope, $http) {
    var vm = this
    vm.test = 'espeon is bae'
})
