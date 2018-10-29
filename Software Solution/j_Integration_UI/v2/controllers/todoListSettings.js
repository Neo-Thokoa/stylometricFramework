todoModule.controller("todoListSettingsCtrl", ["$scope", "$location", "todoService", "$routeParams", "oiSelect", "$timeout", function ($scope, $location, todoService, $routeParams, rootScope, oiSelect, $timeout) {

          $scope.loader = false;
          $scope.url = {

              templateUrl: "pages/navBar.html",
              controller: "homePageCtrl"
          }

          //variables
          $scope.addToDBmodel = null;
          $scope.tbltitle = null;
          $scope.editToDBmodel = null;
          $scope.rIndex = 0;
          $scope.referentialObj = [];

          $scope.countProperties = function(obj)
          {
            var amount = Object.keys(obj).length;
            return amount;
          }

          //Getters



          $scope.getCurrentList = function(){
            $scope.loader = true;
            todoService.getList().then(function (results){
               $scope.loader = false;

              var data = results.data;
              $scope.userSelection = data;
              console.log($scope.userSelection);
              $scope.addToDBmodel = new Object();
              $scope.addToDBmodel.userInputs = [];
              $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
             },
             function(results){
               console.log(results.status);
             });
          }

          $scope.getPriorityData = null;
          $scope.getPriority = function()
          {
            $scope.loader = true;
            todoService.getPriority().then(function(results){
              $scope.loader = false;
              $scope.getPriorityData = results.data;
              console.log($scope.getPriorityData );
            });
          }

          $scope.deleteTodo = function(id){

            console.log(id);

            $scope.loader = true;

              delete $scope.userSelection[id];

              $scope.loader = false;
          //   ZoonosisService.deleteCountry(delObj).then(function (results) {
          // //on success
          // $scope.loader = false;
          //     var data = results.data;
          //     console.log("Success: ");
          //     console.log(data);
          //     $scope.getCountry();
          //   },
          //   function (results) {
          //     // on error.
          //     $scope.loader = false;
          //     $scope.message = results.textStatus();
          //     $scope.feedColor = "#e10729";
          // });
          }


          $scope.addTodo = function () {
            console.log($scope.addToDBmodel);
            var newAgeObject = new Object();
            newAgeObject.ID = $scope.userSelection[$scope.userSelection.length - 1].ID + 1;
            newAgeObject.Title = $scope.addToDBmodel.userInputs[1];
            newAgeObject.Description = $scope.addToDBmodel.userInputs[2];
            newAgeObject.Priority = $scope.addToDBmodel.userInputs[3].Description;
            newAgeObject.Date_Completed = $scope.addToDBmodel.userInputs[4];
            $scope.userSelection.push(newAgeObject);
          //  $scope.loader = true;
            /*todoService.addToDB(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
              var data = results.data;
              console.log("Success: ");
              console.log(data);
            },
            function (results) {
              // on error.
              $scope.loader = false;
              $scope.message = results.textStatus();
              $scope.feedColor = "#e10729";
                  //$scope.loader = true;

          });*/
        }




        $scope.updateTodo = function () {
      //  $scope.loader = true;
        console.log("Ayeye Update");

        $scope.editToDBmodel.Priority = $scope.editToDBmodel.Priority.Description;

        /*
        console.log($scope.editToDBmodel);
          ZoonosisService.updateCountry($scope.editToDBmodel).then(function (results) {
        //on success
        $scope.loader = false;
            var data = results.data;
            $scope.getCountry();
          },
          function (results) {
            // on error.
            $scope.loader = false;
            $scope.message = results.textStatus();
            $scope.feedColor = "#e10729";
        });*/
      }


        $scope.placeValue = null;
        $scope.edit = function(obj){
          $scope.editToDBmodel = obj;
        }

        $scope.backFunction = function()
        {

            $rootScope = null;
          	$location.path('/adminMenu');
        }

        $scope.getCurrentList();
        $scope.getPriority();


        }
]);
