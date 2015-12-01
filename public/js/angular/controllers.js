app.controller('IcecreamController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/icecreams').then(function(res) {
    $scope.icecreams = res.data;
  });
}]);