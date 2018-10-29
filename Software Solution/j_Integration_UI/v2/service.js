// zoonosisModule.factory('');
todoModule.factory('todoService', ["$http", function ($http) {

    var factoryObj = {};
    var path = "./Json/";
     // var apiURL = "http://localhost:54241/api/";
    var userObj = {'SessionID':'4f5b814d-0737-43b8-8255-82e76c0f01f3','GUID':'d7f9bb65-2958-452d-ad1e-83da36a909ac'};


    factoryObj.getList = function ()
    {
        return $http.get(path + 'todoListData.json');
    }

    factoryObj.getPriority = function ()
    {
        return $http.get(path + 'priority.json');
    }

    factoryObj.getCountryList = function ()
    {
        return $http.get(path + 'countries.json');
    }


    factoryObj.addToDB = function(data)
    {
      let fs = require(path + 'todoListData.json');
      fs.readFile(path + 'todoListData.json', (err, file) => {
        let jsonArray = JSON.parse(file);

        jsonArray.push({
          ID : data.ID,
          Title: data.Title,
          Description: data.Description,
          Priority: data.Priority,
          Date_Completed: data.Date_Completed

        });

        fs.writeFile(path + 'todoListData.json', JSON.stringify(jsonArray));
      });
      return $http.get(path + 'todoListData.json');
    }


    return factoryObj;
}]);
