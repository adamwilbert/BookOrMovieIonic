angular.module('starter.controllers', ['LocalStorageModule', 'ionic', 'ngCordova'])

.controller('MainController', function($scope) {
  $scope.secret = 'Espeon is bae'
})

.controller('PropertiesCtrl', function($scope, $http) {

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
      $http.put(mainPropUrl + 'movieVote/'+ $stateParams.propertyId, {"userId": '56be8aa8899c5bdd8533bcfc'})
        .success(function(data){
          console.log(data)
        });
    }
    vm.bookVote = function(){
      $http.put(mainPropUrl + 'bookVote/'+ $stateParams.propertyId, {"userId": '56be8aa8899c5bdd8533bcfc'})
        .success(function(data){
          console.log(data)
        });

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

.controller('UserCtrl', function($scope, $http, localStorageService) {
    var vm = this
    vm.test = window.localStorage.user
    $scope.logout = function(){
      window.localStorage.clear()
      location.href = location.pathname
    }
})

.controller('OauthController', ['$scope', '$cordovaOauth', '$http', function($scope, $cordovaOauth, $http, localStorageService){
  $scope.loggedIn;
  $scope.googleLogin = function(){
    $cordovaOauth.google("805387380544-copmhikv3sg6cd36gsp949nugdol3hva.apps.googleusercontent.com",
      ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"]).
    then(function(result){
      console.log("google login success");
      var accessToken;
      //$location.url('/scan');
      accessToken = JSON.stringify(result);

      //getting profile info of the user
      $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+result.access_token}).
      success(function(response){
              var param = {
                provider: 'google',
                  google: {
                                uid: response["id"],
                                provider: 'google',
                                first_name: response["name"]["givenName"],
                                last_name: response["name"]["familyName"],
                                email: response.emails[0]["value"],
                                image: response.image.url
                            }
                };
                window.localStorage.user = response['id']
                $scope.loggedIn = window.localStorage.user

      }, function(error) {
      console.log(error);
    });

  }, function(error){
    console.log(error);
  });
}

}])
