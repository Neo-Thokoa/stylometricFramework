todoModule.controller("startAppCtrl", ['$http',"$scope", "$location", function ($http, $scope, $location) {

  $scope.loading = false;

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
          $scope.loading = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/dataAcquisition/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .then(function(resp){
            $scope.loading = false;
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
          $scope.loading = true;
          $http({
            method:'GET',
            url:'http://127.0.0.1:5000/dataCleaning/',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .then(function(resp){
            $scope.loading = false;
              console.log(resp.data);

          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }



        $scope.initializeApp();

}]);
