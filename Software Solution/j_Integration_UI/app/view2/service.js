arcgisModule.factory('arcgisService', ["$http", function ($http) {

    // this.helloWorld = function (){
    //     console.log("Hello");
    // };

    var factoryObj = {};
    var path = "./Json/";
    console.log("Service activated");
    factoryObj.getTattooClass = function () {
        return $http.get(path + 'tattoClassifications.json');
    }


    return factoryObj;
}]);
