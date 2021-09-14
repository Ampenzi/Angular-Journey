var app = angular.module('app',['ngRoute', 'ngAnimate'])

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'NinjaController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'contactController'
        })
        .when('/ninja', {
            templateUrl: 'views/ninjas.html',
            controller: 'NinjaController',
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);

app.directive('randomNinja', [function(){
    return {
        restrict: 'E',
        scope:{
           ninjas: '=',
           title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 6)
        }
    }
}]);
app.controller('NinjaController', ['$scope','$http', function($scope, $http){
    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja)
        $scope.ninjas.splice(removedNinja, 1)
    };
    $scope.addNinja = function(){
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available: true,
        });
        $scope.newninja.name=""
        $scope.newninja.belt=""
        $scope.newninja.rate=""
    };
    $http.get('data/ninjas.json').then(function(data){
        $scope.ninjas = data.data
    })
    $scope.removeAll = function(){
        $scope.ninjas = []
    }
}]);

app.controller('contactController', ['$scope', '$location', function($scope, $location){
    
    $scope.sendMessage = function(){
        $location.path('/contact-success');
    };
}]);