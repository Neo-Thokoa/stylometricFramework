 var todoModule = angular.module('todoModule', ['ngRoute','leaflet-directive','oi.select','datepicker', 'ui.rCalendar', 'ui.bootstrap', 'angularjs-dropdown-multiselect']);

todoModule.config(["$routeProvider", function($routeProvider) {

    $routeProvider
  .when("/", {
       templateUrl: "pages/homePage.html",
       controller: "homePageCtrl"
   })
   .when("/adminFunctions", {
       templateUrl: "pages/adminFunctions.html",
       controller: "adminFunctionsCtrl"
   })
   .when("/navbar", {
       templateUrl: "pages/navBar.html",
       controller: "navCtrl"
   })
   .when("/todoListMenu", {
       templateUrl: "pages/todoListMenu.html",
       controller: "todoListMenuCtrl"
   })
   .when("/todoListSettings", {
       templateUrl: "pages/todoListSettings.html",
       controller: "todoListSettingsCtrl"
   })
   .when("/startApp", {
       templateUrl: "pages/startApp.html",
       controller: "startAppCtrl"
   })

    .otherwise({
      redirectTo: "/"
  });
}]);
