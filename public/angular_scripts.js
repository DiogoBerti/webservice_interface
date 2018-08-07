angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
    todoList.statusQuery = ''
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };

    todoList.checkTreta = function() {
      $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=UK&key=<KEY-GOES-HERE>', 
        type: 'GET',
        success: function(res) {
          console.log(res)
          return res.status;          
        }
      });
    };


  })
  .controller('myCtrl', function($scope, $http) {
    var myController = this;
    myController.checkApi = function(){
      $http({
        method : "GET",
        url : "https://maps.googleapis.com/maps/api/geocode/json?address=UK&key=<KEY-GOES-HERE>"
      }).then(function mySuccess(response) {
        $scope.myWelcome = response.data.error_message;
      }, function myError(response) {
        $scope.myWelcome = response.statusText;
      });  
    };
  })
  .controller('odooController', function($scope, $http) {
    var self = this;
    self.checkTest = function(){
      $http({
        method : "GET",
        url : "/objtest"
      }).then(function mySuccess(response) {
        $scope.another = response.data.test;
      }, function myError(response) {
        $scope.another = response.statusText;
      });  
    }

  })