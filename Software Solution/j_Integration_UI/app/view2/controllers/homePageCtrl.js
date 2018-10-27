arcgisModule.controller("homePageCtrl",
    ["$scope", "$location",
    function ($scope, $location) {
      $scope.map;
      $scope.showForm = false;
      $scope.bothSitesexists = false;
      $scope.siteBOpen = false;
      $scope.siteAOpen = false;
      $scope.siteAExists = false;
      $scope.siteBExists = false;

      $scope.selectSection = function()
      {

        $scope.showForm = true;
        if($scope.siteAOpen)
        {
          $scope.siteAExists = true;
          $scope.siteAOpen = false;
        }
        else
        {
          $scope.siteBExists = true;
          $scope.siteBOpen = false;
        }

        if($scope.siteAExists && $scope.siteBExists)
        {
          $scope.bothSitesexists = true;

        }



      }

      $scope.reloadSection = function()
      {

        $scope.showForm = false;
        $scope.siteAExists = false;
        $scope.siteBExists = false;
        $scope.bothSitesexists = false;
        $scope.siteAOpen = false;
        $scope.siteBOpen = false;
        delete $scope.siteOne;
        $scope.siteOne = new Object();
        $scope.siteOne.regionResult = null;
        $scope.siteOne.buildingResult = null;
        $scope.siteOne.addressResult = null;
        delete $scope.siteTwo;
        $scope.siteTwo = new Object();
        $scope.siteTwo.regionResult = null;
        $scope.siteTwo.buildingResult = null;
        $scope.siteTwo.addressResult = null;
      }

      $scope.init = function()
      {
        // $(window).load(function() {
      	// 	// Animate loader off screen
      	// 	$(".se-pre-con").fadeOut("slow");;
      	// });
        
      }

      $scope.watchSiteB = function()
      {
        $scope.siteBOpen = true;
      }

      $scope.watchSiteA = function()
      {
        $scope.siteAOpen = true;
      }


}]);
