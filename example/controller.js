(function () {
    var app = angular.module('ngPopupModule');

    app.controller('example', function ($scope) {
       $scope.ngPopupCallback = function () {
           alert("I've been fired!");
       };
    });
}());