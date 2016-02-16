angular.module('starter.controllers', ['LocalStorageModule', 'ionic'])

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
    vm.decision;
    var mainPropUrl = 'http://localhost:8080/properties/api/';
    vm.decider = function(){
      if (vm.movieCriticReview > vm.bookCriticReview){
        vm.decision = "See the movie first!"
      }else {
        vm.decision = "Read the book first!"
      }
    }
    vm.movieVote = function(){
      $http.put(mainPropUrl + $stateParams.propertyId, {userId: 'Movie'})
        .success(function(data){
        });
    }
    vm.bookVote = function(){

    }

    $http.get(mainPropUrl + $stateParams.propertyId)
        .success(function(data){
          vm.movieCriticReview=data[0].movieCriticReview
          vm.bookCriticReview=data[0].bookCriticReview
          vm.bookTitle = data[0].bookTitle
          vm.bookTitle = data[0].movieTitle
          vm.name = data[0].movieTitle
          vm.poster = data[0].poster
          vm.movieVotes = data[0].movieVotes
          vm.bookVotes = data[0].bookVotes
          vm.decider()
        });
})

.controller('UserCtrl', function($scope, $http, localStorageService, GoogleLoginService) {
    var vm = this
    vm.test = 'espeon is bae'
    $scope.localstorage = localStorageService
    $scope.logout = function(){
      localStorageService.clearAll()
      location.href = location.pathname
    }
})

.controller('AuthenticationController', function($scope, $state, localStorageService, GoogleLoginService, $http){
  $scope.test = 'espeon is bae'
    // if(localStorageService.get('google-token')){
    //   $http.get('http://localhost:8080/users/show')
    //   User.get({id: localStorageService.get('userId')}), function(user){
    //     $state.transitionTo('dash')
    //     $scope.Authenticated = true
    //   }
    // } else {
    //   $scope.needsAuthentication = true
    // }
  $scope.googlelogin = GoogleLoginService.login
  $scope.logout = function(){
      localStorageService.clearAll()
      location.href = location.pathname
    }
})
