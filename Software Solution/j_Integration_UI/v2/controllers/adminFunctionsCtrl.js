
zoonosisModule.controller("adminFunctionsCtrl",
    ["$scope", "$http", "$location", "ZoonosisService", "$routeParams", "oiSelect", "$timeout",
    function ($scope, $http, $location, ZoonosisService, $routeParams, oiSelect, $timeout) {
          $scope.isAdmin = "false";
          $scope.loader = false;
          $scope.url = {

              templateUrl: "pages/navBar.html",
              controller: "homePageCtrl"
          }

          $scope.displayAdder = false;
          $scope.searchParams = null;
          $scope.newData = null;
          $scope.open_AGE = false;
          $scope.open_ANIMAL = false;
          $scope.open_BOX = false;
          $scope.open_CELL = false;
          $scope.open_DEATHVOUCHER = false;
          $scope.open_DRAWER = false;
          $scope.open_ENTITY = false;
          $scope.open_ENTITYTYPE = false;
          $scope.open_FREEZER = false;
          $scope.open_FUNCTION = false;
          $scope.open_IDMETHOD = false;
          //$scope.open_LOCALREGION = false;
          $scope.open_MATERIAL = false;
          $scope.open_MUSEUM = false;
          $scope.open_MUSEUMVOUCHER = false;
          $scope.open_ORIGIN = false;
          $scope.open_PHOTO = false;
          $scope.open_PUBLICATION = false;
          $scope.open_REGION = false;
          $scope.open_ROLE = false;
          $scope.open_SAMPLE = false;
          $scope.open_SEX = false;
          //$scope.open_SITE = false;
          $scope.open_SPECIES = false;
          $scope.open_TEST = false;
          $scope.open_TITLE = false;
          $scope.showUpdateModal = false;

              //Get DB List
              $scope.dbmodel = [];
              $scope.example9data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];
              $scope.example9settings = {enableSearch: true, showSelectAll: true, keyboardControls: true, checkBoxes: true, scrollable: true};

              $scope.getAdminData = null;
               ZoonosisService.getDBList().then(function(results){
                 var data = results.data;
                 $scope.getAdminData = data;
               }, function(results){
               });

               $scope.functionCalls = null;
               ZoonosisService.getAdminData().then(function(results){
                 var data = results.data;
                 $scope.functionCalls = data;
               }, function(results){
               });

               $scope.selectedAdminFunction = [];

               $scope.adminSelectionUpdater = function(){

                 var deny = this.dbmodel;
                 $scope.falsifyAdds();
                $scope.selectedAdminFunction =  $scope.functionCalls.filter(function(funcIndex){

                    return funcIndex.ID == deny.ID;
                });
                eval($scope.selectedAdminFunction[0].fnCall);
               }

               $scope.message = "Manage admin tables tables on this page. Select the table to manage from the list provided.";


               $scope.falsifyAdds = function(){

                 $scope.open_AGE = false;
                 $scope.open_ANIMAL = false;
                 $scope.open_AREA = false;
                 $scope.open_BOX = false;
                 $scope.open_CELL = false;
                 $scope.open_COUNTRY = false;
                 $scope.open_DEATHVOUCHER = false;
                 $scope.open_DRAWER = false;
                 $scope.open_ENTITY = false;
                 $scope.open_ENTITYTYPE = false;
                 $scope.open_FREEZER = false;
                 $scope.open_FUNCTION = false;
                 $scope.open_IDMETHOD = false;
                 $scope.open_LOCALREGION = false;
                 $scope.open_MATERIAL = false;
                 $scope.open_MUSEUM = false;
                 $scope.open_MUSEUMVOUCHER = false;
                 $scope.open_ORIGIN = false;
                 $scope.open_PHOTO = false;
                 $scope.open_PUBLICATION = false;
                 $scope.open_REGION = false;
                 $scope.open_ROLE = false;
                 $scope.open_SAMPLE = false;
                 $scope.open_SEX = false;
                 $scope.open_SITE = false;
                 $scope.open_SPECIES = false;
                 $scope.open_TEST = false;
                 $scope.open_TITLE = false;
               }


               $scope.userSelection = [];

               $scope.totalItems =  $scope.userSelection.length;
               $scope.currentPage = 0;
               $scope.itemsPerPage = 5;

               $scope.addToDBmodel = null;
               $scope.editToDBmodel = null;
               $scope.ageSelection = [];
               $scope.getAge = function(){
                 $scope.loader = true;
                 ZoonosisService.getAge().then(function (results){
                   $scope.loader = false;
                   $scope.open_AGE = true;

                    var data = results.data;
                    $scope.userSelection = data.slice(1, results.data.length);
                    $scope.totalItems =  $scope.userSelection.length;
                    $scope.ageSelection =  data.slice(1, results.data.length);
                    for(var k = 0; k < $scope.userSelection.length; k++)
                    {
                      $scope.ageSelection[k] = _.omit($scope.userSelection[k], "ID");
                    }
                    $scope.addToDBmodel = new Object();
                    $scope.addToDBmodel.userInputs = [];
                    $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){
                    $scope.loader = false;
                  });
               }

               $scope.countProperties = function(obj)
               {
                 var amount = Object.keys(obj).length;
                 return amount;
               }

               $scope.labelCreate = function(obj)
               {
                 $scope.labels = [];
                  for(var j = 0; j < Object.keys(obj).length; j++)
                  {
                    if(Object.keys(obj)[j].includes('Description'))
                    {
                      $scope.labels.push(Object.keys(obj)[j]);
                    }
                    else {
                    }
                  }
               }

               $scope.referentialObj = [];
               $scope.rIndex = 0;

               $scope.getReferences = function()
               {
                 if($scope.open_ANIMAL)
                 {
                     $scope.referentialObj = [];
                     ZoonosisService.getRegion().then(function(oResults){

                       var oData = oResults.data;
                       $scope.referentialObj = oData.slice(1, oData.length);
                       $scope.rIndex++;
                       console.log($scope.referentialObj);
                     }, function(results){
                       alert("Something went wrong");
                     });
                 }
                 else if($scope.open_ENTITY)
                 {
                     $scope.referentialObj = [];
                     ZoonosisService.getCountry().then(function(oResults){

                       var oData = oResults.data;
                       $scope.referentialObj = oData.slice(1, oData.length);
                       $scope.rIndex++;
                       console.log($scope.referentialObj);
                     }, function(results){
                       alert("Something went wrong");
                     });
                 }
                 else if($scope.open_MUSEUMVOUCHER)
                 {
                     $scope.referentialObj = [];
                     ZoonosisService.getCountry().then(function(oResults){

                       var oData = oResults.data;
                       $scope.referentialObj = oData.slice(1, oData.length);
                       $scope.rIndex++;
                       console.log($scope.referentialObj);
                     }, function(results){
                       alert("Something went wrong");
                     });
                 }
                 else if($scope.open_Sample)
                 {
                     $scope.referentialObj = [];
                     ZoonosisService.getCountry().then(function(oResults){

                       var oData = oResults.data;
                       $scope.referentialObj = oData.slice(1, oData.length);
                       $scope.rIndex++;
                       console.log($scope.referentialObj);
                     }, function(results){
                       alert("Something went wrong");
                     });
                 }
                 else if($scope.open_TEST)
                 {
                     $scope.referentialObj = [];
                     ZoonosisService.getCountry().then(function(oResults){

                       var oData = oResults.data;
                       $scope.referentialObj = oData.slice(1, oData.length);
                       $scope.rIndex++;
                       console.log($scope.referentialObj);
                     }, function(results){
                       alert("Something went wrong");
                     });
                 }

               }

               $scope.labels = [];
               $scope.responseData = null;
               $scope.getAnimal = function(){
                 $scope.responseData = null;
                 $scope.userSelection = null;
                   $scope.currentPage = 0;
                 ZoonosisService.getAnimal().then(function (results){
                   //origin; sex; species
                    $scope.open_ANIMAL = true;
                    var data = results.data;
                    $scope.userSelection = data.slice(1, results.data.length);
                    $scope.responseData = data.slice(1, results.data.length);
                    $scope.totalItems =  $scope.userSelection.length;
                    $scope.currentPage = 1;
                    $scope.addToDBmodel = new Object();
                    $scope.addToDBmodel.userInputs = [];
                    $scope.labelCreate($scope.userSelection[0]);
                    $scope.rIndex = 0;
                    $scope.referentialObj = [];
                    $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]) - $scope.labels.length - 1;
                    ZoonosisService.getOrigin().then(function(oResults){
                      var oData = oResults.data;
                      $scope.referentialObj[$scope.rIndex] = oData.slice(1, oData.length);
                      $scope.rIndex++;
                      ZoonosisService.getSex().then(function(sResults){
                          var sData = sResults.data;
                          $scope.referentialObj[$scope.rIndex] = sData.slice(1, sData.length);
                          $scope.rIndex++;
                          ZoonosisService.getSpecies().then(function(oResults){
                            var oData = oResults.data;
                            $scope.referentialObj[$scope.rIndex] = oData.slice(1, oData.length);
                            $scope.rIndex++;
                          },
                          function(oResults){
                          });

                        },
                        function(oResults){
                        //  console.log(oResults.status);
                        });

                    },
                    function(oResults){

                    });

                  },
                  function(results){

                  });
               }

               $scope.getArea = function(){
                 $scope.loader = true;
                 ZoonosisService.getArea().then(function (results){
                    $scope.loader = false;
                    $scope.open_AREA = true;
                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getBox = function(){
                 $scope.loader = true;
                 ZoonosisService.getBox().then(function (results){
                    $scope.loader = false;
                    $scope.open_BOX = true;
                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }




               $scope.getDeathVoucher = function(){
                 $scope.loader = true;
                 ZoonosisService.getDeathVoucher().then(function (results){
                    $scope.loader = false;
                    $scope.open_DEATHVOUCHER = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);
                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){
                  });
               }

               $scope.getDrawer = function(){
                 $scope.loader = true;
                 ZoonosisService.getDrawer().then(function (results){
                    $scope.loader = false;

                    $scope.open_DRAWER = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getEntity = function(){
                 $scope.loader = true;
                 ZoonosisService.getEntity().then(function (results){
                    $scope.loader = false;
                    $scope.open_ENTITY = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.labelCreate($scope.userSelection[0]);
                   $scope.rIndex = 0;
                   $scope.referentialObj = [];
                   //$scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);

                   //$scope.labelCreate($scope.userSelection[0]);
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]) - $scope.labels.length - 1;

                   ZoonosisService.getTitle().then(function(oResults){
                     var oData = oResults.data;
                     $scope.referentialObj[$scope.rIndex] = oData.slice(1, oData.length);
                     $scope.rIndex++;

                     ZoonosisService.getEntityType().then(function(sResults){
                         var sData = sResults.data;
                         $scope.referentialObj[$scope.rIndex] = sData.slice(1, sData.length);
                         $scope.rIndex++;
                       },
                       function(oResults){

                       });

                   },
                   function(oResults){

                   });


                  },
                  function(results){

                  });
               }

               $scope.getEntityType = function(){
                 $scope.loader = true;
                 ZoonosisService.getEntityType().then(function (results){
                    $scope.loader = false;

                    $scope.open_ENTITYTYPE = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }


               $scope.getFreezer = function(){
                 $scope.loader = true;
                 ZoonosisService.getFreezer().then(function (results){
                    $scope.loader = false;

                    $scope.open_FREEZER = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getFunction = function(){
                 $scope.loader = true;
                 ZoonosisService.getFunction().then(function (results){
                    $scope.loader = false;

                    $scope.open_FUNCTION = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getIDMethod = function(){
                 $scope.loader = true;
                 ZoonosisService.getIDMethod().then(function (results){
                    $scope.loader = false;

                    $scope.open_IDMETHOD = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getLocalRegion = function(){
                 $scope.loader = true;
                 ZoonosisService.getLocalRegion().then(function (results){
                    $scope.loader = false;

                    $scope.open_LOCALREGION = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getMaterial = function(){
                 $scope.loader = true;
                 ZoonosisService.getMaterial().then(function (results){
                    $scope.loader = false;

                    $scope.open_MATERIAL = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getMuseum = function(){
                 $scope.loader = true;
                 ZoonosisService.getMuseum().then(function (results){
                    $scope.loader = false;

                    $scope.open_MUSEUM = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getMuseumVoucher = function(){
                 $scope.loader = true;
                   $scope.referentialObj = [];
                 ZoonosisService.getMuseumVoucher().then(function (results){
                    $scope.loader = false;

                    $scope.open_MUSEUMVOUCHER = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.labelCreate($scope.userSelection[0]);
                   $scope.rIndex = 0;
                  // $scope.referentialObj = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]) - $scope.labels.length - 1;

                   ZoonosisService.getMuseum().then(function(oResults){
                     var oData = oResults.data;
                     $scope.referentialObj[$scope.rIndex] = oData.slice(1, oData.length);
                     $scope.rIndex++;

                   },
                   function(oResults){

                   });
                  },
                  function(results){

                  });
               }

               $scope.getOrigin = function(){
                 $scope.loader = true;
                 ZoonosisService.getOrigin().then(function (results){
                    $scope.loader = false;

                    $scope.open_ORIGIN = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getPhoto = function(){
                 $scope.loader = true;
                 ZoonosisService.getPhoto().then(function (results){
                    $scope.loader = false;
                    $scope.open_PHOTO = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getPublication = function(){
                 $scope.loader = true;
                 ZoonosisService.getPublication().then(function (results){
                    $scope.loader = false;

                    $scope.open_PUBLICATION = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getRegion = function(){
                 $scope.loader = true;
                 ZoonosisService.getRegion().then(function (results){
                    $scope.loader = false;

                    $scope.open_REGION = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getRole = function(){
                 $scope.loader = true;
                 ZoonosisService.getRole().then(function (results){
                    $scope.loader = false;

                    $scope.open_ROLE = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getSample = function(){
                 $scope.loader = true;
                 ZoonosisService.getSample().then(function (results){
                    $scope.loader = false;

                    $scope.open_SAMPLE = true;

                    $scope.userSelection = data.slice(1, results.data.length);

                    $scope.addToDBmodel = new Object();
                    $scope.addToDBmodel.userInputs = [];
                    $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getSex = function(){
                 $scope.loader = true;
                 ZoonosisService.getSex().then(function (results){
                    $scope.loader = false;

                    $scope.open_SEX = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  })
               }

               $scope.getSite = function(){
                 $scope.loader = true;
                 ZoonosisService.getSite().then(function (results){
                    $scope.loader = false;

                    $scope.open_SITE = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });
               }

               $scope.getSpecies = function(){
                 $scope.loader = true;
                 ZoonosisService.getSpecies().then(function (results){
                    $scope.loader = false;

                    $scope.open_SPECIES = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  })
               }

               $scope.getTest = function(){
                 $scope.loader = true;
                 ZoonosisService.getTest().then(function (results){
                    $scope.loader = false;

                    $scope.open_TEST = true;

                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.labelCreate($scope.userSelection[0]);
                   $scope.rIndex = 0;
                  // $scope.referentialObj = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]) - $scope.labels.length - 1;

                   /*$scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);*/

                   ZoonosisService.getTestTypes().then(function(oResults){
                     var oData = oResults.data;
                     $scope.referentialObj[$scope.rIndex] = oData.slice(1, oData.length);
                     $scope.rIndex++;
                   }, function(results){

                   });
                  },
                  function(results){

                  })

               }

               $scope.getTitle = function(){
                 $scope.loader = true;
                 ZoonosisService.getTitle().then(function (results){
                   $scope.loader = false;

                   $scope.open_TITLE = true;
                   var data = results.data;
                   $scope.userSelection = data.slice(1, results.data.length);

                   $scope.addToDBmodel = new Object();
                   $scope.addToDBmodel.userInputs = [];
                   $scope.addToDBmodel.userInputs.length = $scope.countProperties($scope.userSelection[0]);
                  },
                  function(results){

                  });

               }

               $scope.getUser = function(){
                 ZoonosisService.getUser().then(function (results){
                   var data = results.data;
                   $scope.userSelection = data;


                  },
                  function(results){

                  });
               }
               $scope.displayAdder = false;
               $scope.autoCaller = function (id) {
                 $scope.displayAdder = true;

              }
              $scope.clearAutoCaller = function()
              {
                $scope.newData = null;
                $scope.displayAdder = false;
                $scope.loader = true;
              }
              $scope.Back = function()
              {


                    $rootScope = null;
                  	$location.path('/adminMenu');

              }

              $scope.edit = function(obj){


                $scope.editToDBmodel = new Object();
                $scope.editToDBmodel = obj;

              //  $scope.showUpdateModal = true;

              }

              $scope.closeUpdateModel = function()
              {
                $scope.showUpdateModal = false;
              }

                $scope.addAgeToDB = function () {
                  var newAgeObject = new Object();

                  newAgeObject.Description = $scope.addToDBmodel.userInputs[0];
                  $scope.loader = true;
                  ZoonosisService.addAge(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;

                    $scope.getAge();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

              $scope.updateAddAnimal = function() {

              }

                $scope.addAnimal = function () {
                  var newAgeObject = new Object();

                  newAgeObject.OriginID = $scope.addToDBmodel.userInputs[0].ID;
                  newAgeObject.SexID = $scope.addToDBmodel.userInputs[1].ID;
                  newAgeObject.SpeciesID = $scope.addToDBmodel.userInputs[2].ID;
                  newAgeObject.TattooNum = $scope.addToDBmodel.userInputs[3];
                  newAgeObject.UPNumber = $scope.addToDBmodel.userInputs[4];
                  $scope.loader = true;
                  ZoonosisService.addAnimal(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;

                    $scope.getAnimal();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }


                $scope.addDeathVoucher = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addDeathVoucher(newAgeObject).then(function (results) {
                $scope.loader = false;
                    var data = results.data;
                    $scope.getDeathVoucher();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addEntityType = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addEntityType(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getEntityType();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

              $scope.addEntity = function () {
                var newAgeObject = new Object();
                newAgeObject.Cell = "0114549678";
                newAgeObject.Email = "neot@hotmail.co.za";
                newAgeObject.Name = "Neo";
                newAgeObject.Surname = "Thokoa";
                newAgeObject.TitleID = 3;
                newAgeObject.TypeID = 2;
                newAgeObject.Description = "The Guy that does things";

                $scope.loader = true;
                ZoonosisService.addEntity(newAgeObject).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                  $scope.getEntity();
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
            }

                $scope.addFunction = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addFunction(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;;
                    $scope.getFunction();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";

                });
              }

                $scope.addIDMethod = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addIDMethod(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getIDMethod();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addMaterial = function () {
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addMaterial(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getMaterial();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addMuseum = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addMuseum(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getMuseum();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addMuseumVoucher = function () {
                  var newAgeObject = new Object();
                  newAgeObject.CatNo = $scope.addToDBmodel.userInputs[1];
                  newAgeObject.SamplingOccID = $scope.addToDBmodel.userInputs[0].ID;
                  newAgeObject.MusID = parseInt($scope.addToDBmodel.userInputs[2]);

                  $scope.loader = true;
                  ZoonosisService.addMuseumVoucher(newAgeObject).then(function (results) {
                $scope.loader = false;
                    var data = results.data;
                    $scope.getMuseumVoucher();
                  },
                  function (results) {
                    // on error.
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addOrigin = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addOrigin(newAgeObject).then(function (results) {
                $scope.loader = false;
                    var data = results.data;
                    $scope.getOrigin();
                  },
                  function (results) {
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                });
              }

                $scope.addRole = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addRole(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getRole();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addSample = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addSample(newAgeObject).then(function (results) {
                $scope.loader = false;
                    var data = results.data;
                    $scope.getSample();
                  },
                  function (results) {
                    // on error.
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                        //$scope.loader = true;

                });
              }

                $scope.addSex = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addSex(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getSex();
                  },
                  function (results) {
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                });
              }

                $scope.addSpecies = function () {
                  var newAgeObject = new Object();
                  newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                  $scope.loader = true;
                  ZoonosisService.addSpecies(newAgeObject).then(function (results) {
                //on success
                $scope.loader = false;
                    var data = results.data;
                    $scope.getSpecies();
                  },
                  function (results) {
                    $scope.loader = false;
                    $scope.message = results.textStatus();
                    $scope.feedColor = "#e10729";
                });
              }
              $scope.addTitle = function () {
                var newAgeObject = new Object();
                newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                $scope.loader = true;
                ZoonosisService.addTitle(newAgeObject).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                  $scope.getTitle();
                },
                function (results) {
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
            }
              $scope.addTest = function () {
                var newAgeObject = new Object();
                newAgeObject.Description = $scope.addToDBmodel.userInputs[1];
                newAgeObject.Date = $scope.addToDBmodel.userInputs[2];
                newAgeObject.Result = $scope.addToDBmodel.userInputs[3];
                newAgeObject.SamplingOccID = parseInt($scope.addToDBmodel.userInputs[4]);
                newAgeObject.TypeID = $scope.addToDBmodel.userInputs[0].ID;
                $scope.loader = true;
                ZoonosisService.addTest(newAgeObject).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                  $scope.getTest();
                },
                function (results) {
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
            }

            $scope.deleteAge = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteAge(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getAge();
              },
              function (results) {
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
            });

            }

            $scope.deleteAnimal = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteAnimal(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getAnimal();
              },
              function (results) {
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
            });
            }

            $scope.deleteArea = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteArea(delObj).then(function (results) {
            $scope.loader = false;
                var data = results.data;
                $scope.getArea();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
            });
            }

            $scope.deleteBox = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteBox(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getBox();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";

            });
            }

            $scope.deleteDeathVoucher = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteDeathVoucher(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getDeathVoucher();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";

            });
            }

            $scope.deleteEntity = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteEntity(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getEntity();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";

            });
            }

            $scope.deleteEntityType = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteEntityType(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getEntityType();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteFunction = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteFunction(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getFunction();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteIDMethod = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteIDMethod(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getIDMethod();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteMaterial = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteMaterial(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getMaterial();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteMuseum = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteMuseum(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getMuseum();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteMuseumVoucher = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteMuseumVoucher(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getMuseumVoucher();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteOrigin = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteOrigin(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getOrigin();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deletePhoto = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deletePhoto(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getPhoto();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deletePublication = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deletePublication(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getPublication();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteRole = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteRole(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getRole();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteRegion = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteRegion(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getRegion();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteSample = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteSample(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getSample();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteSex = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteSex(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getSex();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteSpecies = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteSpecies(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getSpecies();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteTest = function(id){
              var delObj = new Object();
              delObj.ID = id;
              $scope.loader = true;
              ZoonosisService.deleteTest(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getTest();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.deleteTitle = function(id){
              var delObj = new Object();
              delObj.ID = id;
                $scope.loader = true;
              ZoonosisService.deleteTitle(delObj).then(function (results) {
            //on success
            $scope.loader = false;
                var data = results.data;
                $scope.getTitle();
              },
              function (results) {
                // on error.
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
            }

            $scope.updateAddAge = function(){
            }
            $scope.updateAge = function () {
              angular.toJson(this.editToDBmodel)

              ZoonosisService.updateAge($scope.editToDBmodel).then(function (results) {

                $scope.loader = false;
                var data = results.data;
                $scope.getAge();
              },
              function (results) {
                // on error.
                  $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
                    //$scope.loader = true;

            });
          }

            $scope.updateAnimal = function () {
              $scope.loader = true;
              ZoonosisService.updateAnimal($scope.editToDBmodel).then(function (results) {
            $scope.loader = false;
                var data = results.data;
              },
              function (results) {
                $scope.loader = false;
                $scope.message = results.textStatus();
                $scope.feedColor = "#e10729";
            });
          }

              $scope.updateArea = function () {

                  ZoonosisService.updateArea($scope.editToDBmodel).then(function (results) {
                        //on success

                            var data = results.data;
                          },
                          function (results) {
                            // on error.
                            $scope.loader = false;
                            $scope.message = results.textStatus();
                            $scope.feedColor = "#e10729";
                                //$scope.loader = true;

                        });
                      }

                      $scope.updateBox = function () {
                      $scope.loader = true;
                        ZoonosisService.updateBox($scope.editToDBmodel).then(function (results) {
                      //on success
                      $scope.loader = false;
                          var data = results.data;
                        },
                        function (results) {
                          // on error.
                          $scope.loader = false;
                          $scope.message = results.textStatus();
                          $scope.feedColor = "#e10729";
                              //$scope.loader = true;

                      });
                    }

              $scope.updateDeathVoucher = function () {
              $scope.loader = true;
                ZoonosisService.updateDeathVoucher($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;

                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateEntity = function () {
              $scope.loader = true;
                ZoonosisService.updateEntity($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateEntityType = function () {
              $scope.loader = true;
                ZoonosisService.updateEntityType($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateFunction = function () {

              $scope.loader = true;
                ZoonosisService.updateFunction($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateIDMethod = function () {

              $scope.loader = true;
                ZoonosisService.updateIDMethod($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateMaterial = function () {

              $scope.loader = true;
                ZoonosisService.updateMaterial($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateMuseum = function () {
              $scope.loader = true;
                ZoonosisService.updateMuseum($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                //  $scope.getMuseum();
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateMuseumVoucher = function () {
              $scope.loader = true;
                ZoonosisService.updateMuseumVoucher($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                //  $scope.getMuseumVoucher();
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateOrigin = function () {

              $scope.loader = true;
                ZoonosisService.updateOrigin($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updatePhoto = function () {
              $scope.loader = true;
                ZoonosisService.updatePhoto($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updatePublication = function () {
              $scope.loader = true;
                ZoonosisService.updatePublication($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateRole = function () {
              $scope.loader = true;
                ZoonosisService.updateRole($scope.editToDBmodel).then(function (results) {
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateRegion = function () {
              $scope.loader = true;
                ZoonosisService.updateRegion($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateSample = function () {
              $scope.loader = true;
                ZoonosisService.updateSample($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateSex = function () {
              $scope.loader = true;
                ZoonosisService.updateSex($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateSite = function () {
              $scope.loader = true;
                ZoonosisService.updateSite($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateSpecies = function () {
              $scope.loader = true;
                ZoonosisService.updateSpecies($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";

              });
              }

              $scope.updateTest = function () {

              $scope.loader = true;
                ZoonosisService.updateTest($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
              });
              }

              $scope.updateTitle = function () {
              $scope.loader = true;
                ZoonosisService.updateTitle($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.updateTestType = function () {
              $scope.loader = true;
                ZoonosisService.updateTestType($scope.editToDBmodel).then(function (results) {
              //on success
              $scope.loader = false;
                  var data = results.data;
                },
                function (results) {
                  // on error.
                  $scope.loader = false;
                  $scope.message = results.textStatus();
                  $scope.feedColor = "#e10729";
                      //$scope.loader = true;

              });
              }

              $scope.animalLabels = ["ID", "OriginID", "OriginDescription", "SexID", "SexDescription", "SpeciesID", "SpeciesDescription", "TattooNum", "UPNumber"];




              $scope.$watch("currentPage", function() {
                if($scope.open_AGE)
                {
                  console.log("Omunye ", $scope.userSelection);
                  if($scope.userSelection != null)
                  {
                    $scope.setPagingData($scope.currentPage);
                  }

                }

              });

              $scope.setPagingData = function(page) {
                var pagedData = $scope.responseData.slice(
                  (page - 1) * $scope.itemsPerPage,
                  page * $scope.itemsPerPage
                );
                $scope.userSelection = pagedData;
              }






}]);
