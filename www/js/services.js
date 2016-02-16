angular.module('app.auth', ['LocalStorageModule', 'ionic'])

.factory('GoogleLoginService', function($window, localStorageService) {

  var url = 'http://localhost:8080/auth/google'
  var loginWindow, token, hasToken, userId, hasUserId

  return {
    test: function(){
      console.log('working')
    },
    login: function(){
      loginWindow = $window.open(url, '_blank', 'location=no, toolbar=no, hidden=yes')
      loginWindow.addEventListener('loadstart', function(event){
        hasToken = event.url.indexOf('?code=')
        hasUserId = event.url.indexOf('&authuser=')
          console.log(event.url)
      if(hasToken > -1 && hasUserId > -1) {
        token = event.url.match('?code=(.*)&authuser='[1])
        userId = event.url.match('&authuser=(.*)&session_state='[1])
          console.log('token ='+ token)
          localStorageService.set("google-token", token)
          // localStorageService.set('token-date', JSON.stringify(new Date()))
          localStorageService.set('userId', userId)
          loginWindow.close()
          location.href=location.pathname
      }
      })
    }
  }
})

