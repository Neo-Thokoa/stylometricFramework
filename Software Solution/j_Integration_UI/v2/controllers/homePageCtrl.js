todoModule.controller("homePageCtrl", ["$scope", "$location", function ($scope, $location) {

      $scope.cleaner = function()
        {
            $rootScope = null;
        }


      $scope.openPage = function(url)
      {
        window.location = url;
      };

        $scope.url = {

        templateUrl: "pages/navBar.html",
        controller: "navCtrl"
        }

        $scope.viewTodoMenu = function()
        {
          $rootScope = null;
        	$location.path('/todoListMenu');
        }

        $scope.startApp = function()
        {
          $rootScope = null;
        	$location.path('/startApp');
        }

}]);
