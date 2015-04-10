var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

demoControllers.controller('UsersController', ['$scope', '$http', 'API', '$window' , function ($scope, $http, API, $window) {
  API.getUsers().then(function (data){
    $scope.users = data;
  });
}]);

demoControllers.controller('AddUserController', ['$scope', 'API', '$window', function ($scope, API, $window) {
  $scope.name = "";
  $scope.email = "";

  $scope.submitUser = function() {
    console.log($scope.name);
    console.log($scope.email);
  };
}]);

demoControllers.controller('TasksController', ['$scope', '$window', function ($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

}]);


/*
demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);
*/

