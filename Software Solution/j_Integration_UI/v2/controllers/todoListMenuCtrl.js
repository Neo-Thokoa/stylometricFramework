todoModule.controller("todoListMenuCtrl", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {

          $scope.url = {

              templateUrl: "pages/navBar.html",
              controller: "homePageCtrl"
          }

          $scope.viewAdminFunctions = function()
          {
            $rootScope = null;
          	$location.path('/adminFunctions');
          }

          $scope.manageList = function()
          {
            $rootScope = null;
            $location.path('/todoListSettings');
          }



}]);
