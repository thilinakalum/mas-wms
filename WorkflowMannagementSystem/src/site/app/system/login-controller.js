(function () {
    'use strict';

    //-----------http controller---------
    angular.module("AppModule")
            .controller("LoginController", function ($http, systemConfig, Factory, $scope, $rootScope, $location, AuthenticationService, $cookieStore) {
                //ui models
                $scope.ui = {};
                var adminCountUrl = "/api/wms/count/get-all-admin-count";
                var departmentCountUrl = "/api/wms/count/get-all-department-count/";
                var employeeCountUrl = "/api/wms/count/get-all-workers-count/";

                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    AuthenticationService.Login($scope.username, $scope.password, function (response) {
                        if (response) {
                            AuthenticationService.SetCredentials($scope.username, $scope.password, response.type, response.indexNo, response.branch);
                            $rootScope.user = response;
                            $cookieStore.put('globals', $rootScope.globals);
                            if ($rootScope.globals.currentUser.type === 'ADMIN') {
                                Factory.getCountList(adminCountUrl, function (data) {
                                    $rootScope.model.map = data;
                                });
                                $location.path('/admin-new');
                            } else if ($rootScope.globals.currentUser.type === 'USER') {
                                Factory.getCountList(departmentCountUrl+$rootScope.globals.currentUser.indexNo, function (data) {
                                    $rootScope.model.map = data;
                                });
                                $location.path('/department-new');
                            } else if ($rootScope.globals.currentUser.type === 'EMPLOYEE') {
                                Factory.getCountList(employeeCountUrl+$rootScope.globals.currentUser.indexNo, function (data) {
                                    $rootScope.model.map = data;
                                });
                                $location.path('/employee-new');
                            }
                        } else {
//                            $rootScope.error = 'Username or password is incorrect';
                        }
                    });
                };

            });
}());
