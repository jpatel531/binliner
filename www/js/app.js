// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

angular.module('starter').controller('AppCtrl', function($scope, $ionicPlatform, $cordovaBackgroundGeolocation, $http){

  $scope.reminder = {}

  var getItemsFromLocalStorage = function(){
      var localStorage = window.localStorage['reminder_items']
      $scope.items = ((localStorage === "null") || (localStorage === "undefined") || !localStorage) ? [] : JSON.parse(localStorage)
  };

  getItemsFromLocalStorage();

  var saveItemToLocalStorage = function(item){
    $scope.items.push(item);
    updateLocalStorage();
  };

  var updateLocalStorage = function(){
    window.localStorage['reminder_items'] = JSON.stringify($scope.items);
    getItemsFromLocalStorage()
  };

  $scope.itemKeyDown = function(event){
    if ((event.keyCode != 13) || (!$scope.reminder.item)) return;
    saveItemToLocalStorage($scope.reminder.item);
    $scope.reminder = {}
  }

  $scope.clearLocalStorage = function(){
    window.localStorage['reminder_items'] = null
    getItemsFromLocalStorage();
  };

  $scope.deleteItemFromLocalStorage = function(item){
    var index = $scope.items.indexOf(item);
    $scope.items.splice(index, 1);
    updateLocalStorage();
  };

  document.addEventListener('deviceready', function () {

      window.geofence.initialize();
      window.geofence.addOrUpdate({
        id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
        latitude:       51.56893555838419, 
        longitude:      -0.1121797934174, 
        radius:         50, 
        transitionType: TransitionType.ENTER, 
        notification: {    
            id:             1,     
            title:          "You're near Tescos bro.", 
            text:           "Open this to see your shit.",
            openAppOnClick: true
        }
      }).then(function () {
          console.log('Geofence successfully added');
      }, function (reason) {
          console.log('Adding geofence failed', reason);
      })
  }, false);
  


});