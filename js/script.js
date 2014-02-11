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
   $scope.myData = 'Raw Data';

   $scope.code = null;
   $scope.response = null;


    $http.jsonp('http://sonyainc.net/json/get_sql_data.php?format=jsonp&callback=JSON_CALLBACK').success(function(data, status) {
        $scope.data = data;
        $scope.status = status;

       // alert("what have we got: "+ $scope.data );
    }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
   
   
    $scope.getData = function() {
        alert("get data: "+ $scope.data[0].task );
      }
      
      $scope.putData = function(taskname) {
        alert("put data: " +  taskname);
        var $sip = taskname;

          $http.jsonp("http://sonyainc.net/json/put_item.php?task="+taskname+"&format=jsonp&callback=JSON_CALLBACK").success(function(data, status) {
            $scope.data = data;
            $scope.status = status;

            alert("add this bad boy: "+ $scope.data );
        }).
          error(function(data, status) {
            $scope.data = data || " Delete Request failed";
            $scope.status = status;
        });
      }


      $scope.deleteData = function(taskId) {
            alert("delete data: " + taskId );

          $http.jsonp('http://sonyainc.net/json/delete_item.php?taskid='+taskId +'&format=jsonp&callback=JSON_CALLBACK').success(function(data, status) {
            $scope.data = data;
            $scope.status = status;

            alert("delete this bad boy: "+ $scope.data );
        }).
          error(function(data, status, err) {
            alert("oh oh: " + err);
            $scope.data = data || " Delete Request failed";
            $scope.status = status;
        });
   
      }

}//end DataCtrl controller 
 