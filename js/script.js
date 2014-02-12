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
   $scope.isActive = false;

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
    });//end jsonp

// Data manipulation routines ( put, delete, refresh)....   
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
      }//end putData


      $scope.deleteData = function(taskId) {
          $http.jsonp('http://sonyainc.net/json/delete_item.php?taskid='+taskId +'&format=jsonp&callback=JSON_CALLBACK').success(function(data, status) {
            $scope.data = data;
            $scope.status = status;

            $scope.isActive = !$scope.isActive;
        }).
          error(function(data, status) {
             $scope.isActive = true; //!$scope.isActive;
             alert('alert 2: ' + $scope.isActive);
            $scope.data = data || " Delete Request failed";
            $scope.status = status;
        });
   
      }//end deleteData

       $scope.refreshData = function () {
          $http.jsonp('http://sonyainc.net/json/get_sql_data.php?format=jsonp&callback=JSON_CALLBACK').success(function(data, status) {
            $scope.data = data;
            $scope.status = status;

            $scope.total = data.length;

            $scope.isActive = !$scope.isActive;
        }).
          error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
      };//end refreshData
      //when a link is clicked mark for deletion 

     $scope.toggleActive = function () {
        $scope.isActive = !$scope.isActive;
      };
      
   
}//end DataCtrl controller 
 