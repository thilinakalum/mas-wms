(function () {
    'use strict';

    //-----------http controller---------
    angular.module("AppModule")
            .controller("LoginController", function ($http, systemConfig, $scope, $rootScope, $location, AuthenticationService) {
                //ui models
                $scope.ui = {};

                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    AuthenticationService.Login($scope.username, $scope.password, function (response) {
                        if (response) {
                            AuthenticationService.SetCredentials($scope.username, $scope.password);
                            $rootScope.user = response;
                            $location.path('/category');

                        } else {
//                            $rootScope.error = 'Username or password is incorrect';
                        }
                    });
                };

            });
}());
