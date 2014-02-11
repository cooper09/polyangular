// Code goes here
list = [];

function Ctrl($scope) {
  $scope.userType = 'guest';
  
  $scope.code = null;
  $scope.response = null;

  $scope.clear = function(test) {
    alert("test: " + test );
     $scope.userType = test;
   }

}//end of Ctrl 



function DataCtrl($scope, $http) {
   $scope.newTask = 'New Task';

   $scope.code = null;
   $scope.response = null;


    $http.jsonp('http://sonyainc.net/json/get_sql_data.php?format=jsonp&callback=JSON_CALLBACK').success(function(data, status) {
        $scope.data = data;
        $scope.status = status;

        $scope.total = data.length;
    }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
   
   
    $scope.getData = function() {
       // alert("get data: "+ $scope.data[0].task );
      }
      
      $scope.putData = function(taskname) {
        alert("put data: " +  taskname);
        $scope.newTask = '';

          $http.jsonp("http://sonyainc.net/json/put_item.php?task="+taskname+"&format=jsonp&callback=JSON_CALLBACK").success(function(data, status) {
            $scope.data = data;
            $scope.status = status;

        }).
          error(function(data, status) {
            $scope.data = data || " Delete Request failed";
            $scope.status = status;
        });
      }


      $scope.deleteData = function(taskId) {
          $http.jsonp('http://sonyainc.net/json/delete_item.php?taskid='+taskId +'&format=jsonp&callback=JSON_CALLBACK').success(function(data, status) {
            $scope.data = data;
            $scope.status = status;
        }).
          error(function(data, status) {
            $scope.data = data || " Delete Request failed";
            $scope.status = status;
        });
   
      }

}//end DataCtrl controller 
 