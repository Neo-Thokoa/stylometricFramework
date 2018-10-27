var arcgisModule = angular.module('arcgisModule', ['ngRoute','ui.bootstrap', 'esri.map']);

arcgisModule.config(["$routeProvider", function($routeProvider) {

    $routeProvider
   .when("/", {
       templateUrl: "pages/homePage.html"
   })
    .otherwise({
      redirectTo: "/"
  });

}]);
