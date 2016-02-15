angular.module('app.auth', ['LocalStorageModule', 'ionic'])

.factory('GoogleLoginService', function($window, localStorageService) {

  var url = 'http://localhost:8080/auth/google'
  var loginWindow, token, hasToken, userId, hasUserId

  return {
    login: function(){
      loginWindow = $window.open(url, '_blank', 'location=no, toolbar=no, hidden=yes')
      loginWindow.addEventListener('loadstart', function(event){
        console.log(event.url)
        hasToken = event.url.indexOf('?oauth_token=')
        hasUserId = event.url.indexOf('&userId=')
      if(hasToken > -1 && hasUserId > -1) {
        token = event.url.match('oauth_token=(.*)&userId'[1])
        userId = event.url.match('&userId=(.*)'[1])
          localStorageService.set("google-token", token)
          localStorageService.set('token-date', JSON.stringify(new Date()))
          localStorageService.set('userId', userId)
          loginWindow.close()
          location.href=location.pathname
      }
      })
    }
  }
})
