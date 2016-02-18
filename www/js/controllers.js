angular.module('starter.controllers', ['LocalStorageModule', 'ionic', 'ngCordova'])

.controller('MainController', function($scope) {
  $scope.secret = 'Espeon is bae'
})

.controller('PropertiesCtrl', function($scope, $http) {

    var vm = this
      vm.test = 'espeon is bae';

      //calling deployed server for list of properties, returning data on all properties stored in DB
      var allPropertiesUrl = 'http://bookormovie.herokuapp.com/properties/api';
      vm.allProperties = [];

      $http.get(allPropertiesUrl)
        .success(function(data){
          vm.allProperties = data;
        });

})

.controller('PropertyDetailCtrl', function($scope, $http, $stateParams) {
    var vm = this
    vm.test = 'espeon is bae'


    var mainPropUrl = 'http://bookormovie.herokuapp.com/properties/api/';
    // function to come to conclusion of voting and comparison of review scores.  Compares first metascores for book and movie and then compares user votes and updates div in view page
    vm.decider = function(){
      if (vm.movieCriticReview > vm.bookCriticReview){
        vm.decision = "critics say movie!"
      }else if (vm.movieCriticReview < vm.bookCriticReview) {
        vm.decision = "critics say book!"
      }else {
        vm.decision = 'critics love both!'
      }
      if (vm.movieVotes > vm.bookVotes){
        vm.userDecision = "users say movie!"
      }else if (vm.movieVotes < vm.bookVotes) {
        vm.userDecision = "users say book!"
      }else {
        vm.userDecision = 'users love both!'
      }
    }

    // both of the voting functions work similarly.  (possible refactor?) checks local storage to make sure a user is logged in, then runs a check to see if the user has already voted by checking to see if there is an index of the user's googleId already in the votes array.  If vote passes those tests runs a put request to db API to update the movie pushing to the votes array in the database.  Then updates the page locally for votes and re runs the decider function to check to see if there  has been a change.
    vm.movieVote = function(){
      if(window.localStorage.user === undefined || window.localStorage.user === null|| window.localStorage.user === ''){

        return console.log('not logged in')
      }else if(JSON.stringify(vm.movieVotes).indexOf(window.localStorage.user)>-1){
        return console.log('already voted!')
      }
      $http.put(mainPropUrl + 'movieVote/'+ $stateParams.propertyId, {userId: window.localStorage.user})
        .success(function(data){
          console.log(data)
          vm.movieVotes.push({userId: window.localStorage.user})
          vm.decider()
        });
    }
    vm.bookVote = function(){
      console.log('click')
      if(window.localStorage.user === undefined ||window.localStorage.user === null|| window.localStorage.user === ''){

        return console.log('not logged in')
      }else if(JSON.stringify(vm.bookVotes).indexOf(window.localStorage.user)>-1){
        return console.log('already voted!')
      }
      $http.put(mainPropUrl + 'bookVote/'+ $stateParams.propertyId, {"userId": window.localStorage.user})
        .success(function(data){
          console.log(data)
          vm.bookVotes.push({userId: window.localStorage.user})
          vm.decider()
        });

    }

    // function to display main information about a property.  queries db with the ID of the property from state params and then sets local variables to display for the property on the page.  Runs decider function to tabulate votes and metascores.

    $http.get(mainPropUrl + $stateParams.propertyId)
        .success(function(data){
          vm.movieCriticReview = data[0].movieCriticReview
          vm.bookCriticReview = data[0].bookCriticReview
          vm.bookTitle = data[0].bookTitle
          vm.bookTitle = data[0].movieTitle
          vm.name = data[0].movieTitle
          vm.poster = data[0].poster
          vm.movieVotes = data[0].movieVotes
          vm.bookVotes = data[0].bookVotes

          vm.decider()
        });
})

// controller for user no longer necessary, keeping in case of change of mind for future use

// .controller('UserCtrl', function($scope, $http, localStorageService) {
//     var vm = this
//     vm.test = window.localStorage.user
//     vm.image = window.localStorage.image
//     vm.firstName = window.localStorage.first_name
//     vm.lastName = window.localStorage.last_name
//     vm.email = window.localStorage.email
//     $scope.logout = function(){
//       console.log('logging out')
//       window.localStorage.clear()
//       location.href = location.pathname
//     }
// })


.controller('OauthController', ['$scope', '$cordovaOauth', '$http', function($scope, $cordovaOauth, $http, localStorageService, $state){
  // queries google oauth login to get access token, using $cordovaOauth
  $scope.googleLogin = function(){
    $cordovaOauth.google("805387380544-copmhikv3sg6cd36gsp949nugdol3hva.apps.googleusercontent.com",
      ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"], {"redirect_uri": 'http://localhost/callback'}).
    then(function(result){
      console.log("google login success");
      var accessToken;
      //$location.url('/scan')
      accessToken = JSON.stringify(result);

      //getting profile info of the user and setting info in local storage for usage in app
      $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+result.access_token}).
      success(function(response){
                window.localStorage.first_name = response["name"]["givenName"]
                window.localStorage.last_name = response['name']['familyName']
                window.localStorage.email = response.emails[0]["value"]
                window.localStorage.image = response.image.url
                window.localStorage.user = response['id']
                $scope.loggedIn = window.localStorage.user
                $scope.email = window.localStorage.email

      }, function(error) {
      console.log(error);
    });

  }, function(error){
    console.log(error);
  });
}

// basic logout function that clears local storage and resets location
$scope.logout = function(){
      console.log('logging out')
      window.localStorage.clear()
     window.location.reload(true)
    }
}])
