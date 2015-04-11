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

  $scope.deleteUser = function(id) {
    //API Call to Delete user
    //re-get the users list
    API.deleteUser(id).then(function (data) {
      if(data === "User deleted" || data === "Successfully deleted") {
        API.getUsers().then(function (data){
          $scope.users = data;
        });
      }
    });
  };
}]);

demoControllers.controller('AddUserController', ['$scope', 'API', '$window', function ($scope, API, $window) {
  $scope.name = "";
  $scope.email = "";
  $scope.errorMessage = false;
  $scope.successMessage = false;

  $scope.submitUser = function() {
    API.createUser($scope.name, $scope.email).then( function (data) {
      if(data.message === "This email already exists" || data.message === "Error: Email must be unique")
        $scope.errorMessage = true;
      else
        $scope.successMessage = true;
    });
    console.log($scope.name);
    console.log($scope.email);
  };

  $scope.toggleSuccessMessage = function() {
    $scope.successMessage = false;
  };

  $scope.toggleErrorMessage = function() {
    $scope.errorMessage = false;
  };
}]);

demoControllers.controller('UserDetailController', ['$scope', '$http', 'API', '$window', '$routeParams', function ($scope, $http, API, $window, $routeParams) {
  $scope.id = $routeParams.id;
  $scope.showCompleted = false;

  API.getSpecificUser($scope.id).then(function (data) {
    $scope.name = data.name;
    $scope.email = data.email;
  });

  API.getUsersTasks($scope.id, true).then(function (data) {
    $scope.completedTasks = data;
  });

  API.getUsersTasks($scope.id, false).then(function (data) {
    $scope.pendingTasks = data;
    /* TODO: Convert Deadline's to better readable data
      $.each($scope.pendingTasks, function (index, task) {
        $scope.pendingTasks[index].date = task.deadline.toDateString();
      });
    */
      console.log($scope.pendingTasks);
  });

  $scope.toggleCompleted = function() {
    if($scope.showCompleted)
      $scope.showCompleted = false;
    else
      $scope.showCompleted = true;
  };

  $scope.changeTaskStatus = function(id) {
    //Get the desired task to change
    API.getTask(id).then(function (task) {
      //Change the task completed status
      task.completed = true;
      //Update the task in the database
      API.changeTask(id, task).then(function (data) {
        //Update pending tasks list
        API.getUsersTasks($scope.id, false).then(function (data) {
          $scope.pendingTasks = data;
        });
        //Update completed tasks list
        API.getUsersTasks($scope.id, true).then(function (data) {
          $scope.completedTasks = data;
        });

      });
    });
  }

}]);

demoControllers.controller('TasksController', ['$scope', 'API', '$window', function ($scope, API, $window) {
  $scope.page = 0;
  $scope.limit = 10;
  $scope.tasksType = "pending";
  $scope.sortOrder = "dateCreated";

  API.getTasks(false, 0, $scope.limit).then(function (data) {
    $scope.selectedTasks = data;
  });

  $scope.getTasks = function(type) {
    if(type === "pending"){
      API.getTasks(false, 0, $scope.limit).then(function (data) {
        $scope.selectedTasks = data;
      });
    }
    else if (type === "completed") {
      API.getTasks(true, 0, $scope.limit).then(function (data) {
        $scope.selectedTasks = data;
      });
    }
    else {
      API.getAllTasks(0, $scope.limit).then(function (data) {
        $scope.selectedTasks = data;
      });
    }
  };

  $scope.previousPage = function() {
    if($scope.tasksType === "pending")
      var status = false;
    else if ($scope.tasksType === "completed")
      var status = true;
    else
      var status = "all";

    if($scope.page > 0) {
      $scope.page--;
      var skip = $scope.page * $scope.limit;
      if(status === "all") {
        API.getAllTasks(skip, $scope.limit).then(function (data) {
          $scope.selectedTasks = data;
        });
      }
      else {
        API.getTasks(status, skip, $scope.limit).then(function (data) {
          $scope.selectedTasks = data;
        });
      }
    }
  };

  $scope.nextPage = function() {
    if($scope.tasksType === "pending")
      var status = false;
    else if ($scope.tasksType === "completed")
      var status = true;
    else
      var status = "all";

    $scope.page++;
    var skip = $scope.page * $scope.limit;
    if(status === "all") {
      API.getAllTasks(skip, $scope.limit).then(function (data) {
          $scope.selectedTasks = data;
        });
    }
    else {
      API.getTasks(status, skip, $scope.limit).then(function (data) {
        $scope.selectedTasks = data;
      });
    }
  };

  $scope.deleteTask = function(id){
    API.deleteTask(id).then(function (data) {
      if(data === "Task deleted" || data === "Successfully deleted") {
        $scope.getTasks($scope.tasksType);
      }
    });
  };
}]);

demoControllers.controller('TaskDetailController', ['$scope', '$http', 'API', '$window', '$routeParams', function ($scope, $http, API, $window, $routeParams) {
  $scope.id = $routeParams.id;

  API.getSpecificTask($scope.id).then(function (data) {
    $scope.name = data.name;
    $scope.deadline = data.deadline;
    $scope.completed = data.completed;
    $scope.assignedUserName = data.assignedUserName;
  });
}]);

demoControllers.controller('EditTaskController', ['$scope', 'API', '$window', '$routeParams', function ($scope, API, $window, $routeParams) {
  $scope.id = $routeParams.id;
  $scope.successMessage = false;
  $scope.dateErrorMessage = false;
  $scope.dbErrorMessage = false;

  API.getSpecificTask($scope.id).then(function (data) {
    $scope.name = data.name;
    $scope.description = data.description;
    $scope.deadline = data.deadline;
    $scope.assignedUserName = data.assignedUserName;
    $scope.completed = data.completed;
    $scope.toggleCompletedRadios();
  });

  API.getUsersNames().then(function (data) {
    $scope.users = data;
  });

  $scope.toggleCompletedRadios = function() {
    if($scope.completed) {
      $('#task_complete_radio_true').prop('checked', true);
      $('#task_complete_radio_false').prop('checked', false);
    }
    else {
      $('#task_complete_radio_true').prop('checked', false);
      $('#task_complete_radio_false').prop('checked', true);
    }
  }

  $scope.toggleCompleted = function() {
    if($scope.completed)
      $scope.completed = false;
    else
      $scope.completed = true;
    $scope.toggleCompletedRadios();
  }

  $scope.toggleSuccessMessage = function() {
    $scope.successMessage = false;
  }

  $scope.toggleDateErrorMessage = function() {
    $scope.dateErrorMessage = false;
  }

  $scope.toggleDBErrorMessage = function() {
    $scope.dbErrorMessage = false;
  }

  $scope.editTask = function() {
    var id = $scope.id;
    API.getTask(id).then(function (task) {
      task.name = $scope.name;
      task.description = $scope.description;
      task.deadline = $scope.deadline;
      task.assignedUserName = $scope.assignedUserName;
      task.completed = $scope.completed;
      //Update the task in the database
      API.changeTask($scope.id, task).then(function (data) {
        //show toastr
        console.log(data);
        if(data.message === "Error: Task not found. Invalid ID" || data.message === "Task not found")
          $scope.dbErrorMessage = true;
        else if(data.message === "Error: Invalid Date" || data.message === "Error: Name and Deadline are required")
          $scope.dateErrorMessage = true;
        else
          $scope.successMessage = true;
      });
    });
  };
}]);

