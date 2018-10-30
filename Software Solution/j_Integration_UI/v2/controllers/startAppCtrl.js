todoModule.controller("startAppCtrl", ['$http',"$scope", "$location", function ($http, $scope, $location) {

  $scope.loader = false;
  $scope.result = "-";
  $scope.naiveAccuracy = "-";
  $scope.dtAccuracy = "-";
  $scope.mostAccurate = "-";
  $scope.classifierUsed = "-";
  $scope.ngram = {
        value: 10
      };

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



        $scope.initializeApp = function()
        {
          $scope.loader = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/dataAcquisition/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .then(function(resp){
            $scope.loader = false;
              console.log(resp.data);
              if(resp.data.status == "Success")
              {
                console.log("Execution going to dataClean")
                $scope.dataClean();
              }
          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.dataClean = function()
        {
          console.log("Inside Data Clean")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/dataCleaning/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .then(function(resp){
            $scope.loader = false;
              console.log(resp.data);
              $scope.dataExtract();

          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.dataExtract = function()
        {
          console.log("Inside Data Extraction");
          $scope.loader = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/featureEngineer/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .then(function(resp){
            $scope.loader = false;
              console.log($scope.result);
              $scope.dataAnalysis();
          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.unreadAnalysis = function()
        {
          console.log("Inside Unread Analysis")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/unreadAnalysis/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            data:{'type': $scope.classifierUsed}
          })
          .then(function(resp){
            $scope.loader = false;
              $scope.result = resp.data;
              console.log($scope.result);
              $scope.activate();
          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.dataAnalysis = function()
        {
          console.log("Inside Data Analysis")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/featureAnalysis/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .then(function(resp){
            $scope.loader = false;
              $scope.result = resp.data;
              console.log($scope.result);
              $scope.naiveAccuracy = resp.data.naiveaccuracy;
              $scope.dtAccuracy = resp.data.dtaccuracy;
              $scope.classifierUsed = resp.data.mostAccurate;
          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.activate = function()
        {
          console.log("Heita");
          if($scope.result.authorastatus != "DNE")
          {
            if($scope.result.claimedA != $scope.result.detectedAuthorA)
            {
              $scope.sendMessage($scope.result.claimedA, $scope.result.detectedAuthorA);
            }
          }
          if($scope.result.authorbstatus != "DNE")
          {
            if($scope.result.claimedB != $scope.result.detectedAuthorB)
            {
              $scope.sendMessage($scope.result.claimedB, $scope.result.detectedAuthorB);
            }
          }
        }

        $scope.sendMessage = function(claimer, detecter)
        {
          $scope.message = "Please Note \n We Have Detected that the email claimed to by written by " + claimer + " was detected to be " + detecter;
          console.log("Inside Warning Message")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/sendwarningmail/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            data:{'message': $scope.message}
          })
          .then(function(resp){
            $scope.loader = false;
              $scope.result = resp.data;
              console.log($scope.result);
          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.initializeApp();


}]);
