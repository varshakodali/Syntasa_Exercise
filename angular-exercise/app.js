var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.reservedWords = ["bob", "sam"];
});
app.directive('reservedWords', [ '$filter', function($filter) { 
    return {
      require: "ngModel",
      restrict: 'A',
      scope: {
        words: "=reservedWords"
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.reservedWords = function(modelValue) {
          return scope.words.indexOf($filter('lowercase')(modelValue)) === -1;
        };
        scope.$watch(function () {
          return ngModel.$modelValue;
        }, function(newValue) {
            ngModel.$validate();
        });
      }
    }
}]);