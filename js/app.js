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
  when ('/users/:id', {
    templateUrl: './partials/userdetail.html',
    controller: 'UserDetailController'
  }).
  when('/tasks/:id', {
    templateUrl: './partials/taskdetail.html',
    controller: 'TaskDetailController'
  }).
  when('/editTasks/:id', {
    templateUrl: './partials/edittask.html',
    controller: 'EditTaskController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);