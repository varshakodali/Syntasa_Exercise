describe('Controller: myCtrl', function() {
beforeEach(module('myApp'));
var ctrl;
beforeEach(inject(function($controller) {
ctrl = $controller('myCtrl');
}));
it('should have items available on load', function() {
expect(ctrl.reservedWords).toEqual([
'bob','sam'
]);
});