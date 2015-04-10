// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/settings', {
    templateUrl: './partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/users', {
    templateUrl: './partials/users.html',
    controller: 'UsersController'
  }).
  when ('/tasks', {
    templateUrl: './partials/tasks.html',
    controller: 'TasksController'
  }).
  when('/llamalist', {
    templateUrl: './partials/llamalist.html',
    controller: 'LlamaListController'
  }).
  when('/addUser', {
    templateUrl: './partials/adduser.html',
    controller: 'AddUserController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);