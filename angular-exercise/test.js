describe('directives', function() {
  
  var $scope, form;
  beforeEach(module('myApp'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input class="form-control" type="text" ng-model="model.name" name="name" id="name" placeholder="Persons Name" reserved-words="reservedWords">' +
      '</form>'
    );
    $scope.model = { name: null }
    $compile(element)($scope);
    form = $scope.form;
  }));

  describe('input validation', function() {
    it('passing sam', function() {
      form.name.$setModelValue('sam');
      $scope.$digest();
      expect($scope.model.name).toEqual('sam');
      expect(form.name.$valid).toBe(true);
    });
    it('passing bob', function() {
      form.name.$setModelValue('bob');
      $scope.$digest();
      expect($scope.model.name).toEqual('bob');
      expect(form.name.$valid).toBe(true);
    });
    
    it('passing random value other than sam and bob', function() {
      form.name.$setModelValue('varsha');
      $scope.$digest();
      expect($scope.model.name).toBeUndefined();
      expect(form.name.$valid).toBe(false);
    });
  });
  
});
