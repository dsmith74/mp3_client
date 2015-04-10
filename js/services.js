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
            }
        }
    })
    ;
