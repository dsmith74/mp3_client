// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Llamas', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/llamas');
            }
        }
    })
    .factory('API', function($http, $window) {
        return {
            getUsers: function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl + '/api/users')
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getUsersNames: function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl + '/api/users?select={"name" : 1}')
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getSpecificUser: function(id) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/users/' + id)
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            createUser: function(name, email) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.post(baseurl + '/api/users', {"name" : name, "email": email})
                    .then(function (response){
                        return response.data;
                    }, function (response) {
                        return response.data;
                    });
            },
            deleteUser: function(id) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.delete(baseurl + '/api/users/' + id)
                    .then(function (response) {
                        console.log(response.data);
                        return response.data.message;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getUsersTasks: function(id, complete) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/tasks?where={"assignedUser" :' + JSON.stringify(id) 
                                  + ', "completed" :' + complete + '}')
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getTask: function (id) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/tasks/' + id)
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            changeTask: function(id, task) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.put(baseurl + '/api/tasks/' + id, $.param(task), 
                                  {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        return response.data;
                    });
            },
            getAllTasks: function(skip, limit) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/tasks?skip=' + skip + '&limit=' + limit)
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getTasks: function (status, skip, limit){
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/tasks?where={"completed":' + status + '}&skip=' + skip + '&limit=' + limit)
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getSpecifiedStatusTasks: function (status) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/tasks?where={"completed":' + status + '}')
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            getSpecificTask: function (id) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.get(baseurl + '/api/tasks/' + id)
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            },
            deleteTask : function(id) {
                var baseurl = $window.sessionStorage.baseurl;
                return $http.delete(baseurl + '/api/tasks/' + id)
                    .then(function (response) {
                        return response.data.message;
                    }, function (response) {
                        console.log("Error");
                        console.log(response);
                        console.log(response.data);
                    });
            }
        }
    });
