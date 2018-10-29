todoModule.controller("navCtrl", ["$scope", "$location","todoService", function ($scope, $location, todoService){

        $scope.cleaner = function () {
            $rootScope = null;
        }
        
        $scope.viewdataCollection = function () {
            $rootScope = null;
            $location.path('/sampleWizardPanal');
        };

        $scope.viewFindings = function () {
            $rootScope = null;
            $location.path('/adminMenu');
        };

        $scope.home = function () {
            $rootScope = null;
            $location.path('/home');
        }


}]);
