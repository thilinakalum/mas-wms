(function () {
    //index module
    angular.module("AppModule", [
        "ngRoute",
        "ngAnimate",
        "ngCookies",
        "ui.bootstrap",
        "ui-notification"
    ]);

    //constants
    angular.module("AppModule")
            .constant("systemConfig", {
                apiUrl:
                        location.hostname === 'localhost'
                        ? "http://localhost:8080"
                        : location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '')
            });

    //route config
    angular.module("AppModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //system
                        .when("/", {
                            templateUrl: "app/system/login.html",
                            controller: "LoginController"
                        })
                        .when("/category", {
                            templateUrl: "app/master/category/category.html",
                            controller: "CategoryController"
                        })
                        .when("/department", {
                            templateUrl: "app/master/department/department.html",
                            controller: "DepartmentController"
                        })
                        .when("/user", {
                            templateUrl: "app/master/user/user.html",
                            controller: "UserController"
                        })
                        .when("/employee", {
                            templateUrl: "app/master/employee/employee.html",
                            controller: "EmployeeController"
                        })
                        .when("/item", {
                            templateUrl: "app/master/item/item.html",
                            controller: "ItemController"
                        })
                        .when("/budget-code", {
                            templateUrl: "app/master/budget-code/budget-code.html",
                            controller: "BudgetCodeController"
                        })
                        .when("/budget-setup", {
                            templateUrl: "app/master/budget-setup/budget-setup.html",
                            controller: "BudgetSetupController"
                        })

                        .when("/admin-new", {
                            templateUrl: "app/job/admin/pending/new/admin-new.html",
//                            controller: "AdminHomeController"
                            controller: "AdminNewController"
                        })
                        .when("/admin-reject", {
                            templateUrl: "app/job/admin/pending/reject/admin-reject.html",
                            controller: "AdminRejectController"
                        })
                        .when("/admin-approve", {
                            templateUrl: "app/job/admin/pending/approve/admin-approve.html",
                            controller: "AdminHomeController"
                        })
                        .when("/admin-unapprove", {
                            templateUrl: "app/job/admin/pending/unapprove/admin-unapprove.html",
                            controller: "AdminUnapproveController"
                        })
                        .when("/admin-assign", {
                            templateUrl: "app/job/admin/ongoing/assign/admin-assign.html",
                            controller: "AdminAssignController"
                        })
                        .when("/admin-finish", {
                            templateUrl: "app/job/admin/ongoing/finish/admin-finish.html",
                            controller: "AdminFinishController"
                        })
                        .when("/admin-department-send", {
                            templateUrl: "app/job/admin/complete/departmentSend/admin-department-send.html",
                            controller: "AdminDepatmentSendController"
                        })
                        .when("/admin-completed", {
                            templateUrl: "app/job/admin/complete/completed/admin-completed.html",
                            controller: "AdminCompletedController"
                        })

                        .when("/department-new", {
                            templateUrl: "app/job/department/pending/new/department-new.html",
                            controller: "DepartmentNewController"
                        })
                        .when("/department-unapprove", {
                            templateUrl: "app/job/department/pending/unapprove/department-unapprove.html",
                            controller: "DepartmentUnapproveController"
                        })
                        .when("/department-approve", {
                            templateUrl: "app/job/department/pending/approve/department-approve.html",
                            controller: "DepartmentApproveController"
                        })
                        .when("/department-reject", {
                            templateUrl: "app/job/department/pending/reject/department-reject.html",
                            controller: "DepartmentRejectController"
                        })
                        .when("/department-unconfirm", {
                            templateUrl: "app/job/department/complet/unconfirm/department-unconfirm.html",
                            controller: "DepatmentUnconfirmController"
                        })
                        .when("/department-unconfirm", {
                            templateUrl: "app/job/department/complet/unconfirm/department-unconfirm.html",
                            controller: "DepatmentUnconfirmController"
                        })
                        .when("/department-confirm", {
                            templateUrl: "app/job/department/complet/completed/department-completed.html",
                            controller: "DepatmentCompletedController"
                        })
                        .when("/employee-new", {
                            templateUrl: "app/job/employee/pending/new/employee-new.html",
                            controller: "EmployeeNewController"
                        })
                        .when("/employee-running", {
                            templateUrl: "app/job/employee/ongoing/running/employee-running.html",
                            controller: "EmployeeRunningController"
                        })
                        .when("/employee-finish", {
                            templateUrl: "app/job/employee/complete/finish/employee-finish.html",
                            controller: "EmployeeFinishController"
                        })
                        .when("/admin-new-job", {
                            templateUrl: "app/job/admin/pending/new/admin-new-job/admin-new-job.html",
                            controller: "AdminNewJobController"
                        })
                        .otherwise({
                            redirectTo: "/"
                        });
            });
    angular.module("AppModule")
            .run(function ($rootScope, $location, $cookieStore, $http) {
                // keep user logged in after page refresh
                $rootScope.globals = $cookieStore.get('globals') || {};
                if ($rootScope.globals.currentUser) {
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    // redirect to login page if not logged in
                    if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
                        $location.path('/');
                    }
                });
            });

    angular.module("AppModule")
            .controller("IndexController", function ($scope, $rootScope, $timeout, Factory, $location) {
                $rootScope.model = {};
                $scope.ui = {};
                $scope.model.user = {};
                $rootScope.model.map = [];
                var adminCountUrl = "/api/wms/count/get-all-admin-count";
                var departmentCountUrl = "/api/wms/count/get-all-department-count/";
                var employeeCountUrl = "/api/wms/count/get-all-workers-count/";
//                var DepartmentCountUrl = "/api/wms/count/get-all-department-count/" + $rootScope.globals.currentUser.indexNo;
                var findAllUserUrl = "/api/wms/master/user/find-all-user";
                var findAllDepartmentUrl = "/api/wms/master/department/find-all-department";

                $scope.ui.logout = function () {
                    $rootScope.value = null;
                    $location.path("/");
                };

//                window.onbeforeunload = function (){
//                    return "do you want to refresh ?";
//                };

                $scope.ui.setDepartmentLabel = function (userIndexNo) {
                    var departmentName;
                    angular.forEach($scope.model.userList, function (value) {
                        var department;
                        if (value.indexNo === parseInt(userIndexNo)) {
                            department = value.department;
                            angular.forEach($scope.model.departmentList, function (value) {
                                if (value.indexNo === parseInt(department)) {
                                    departmentName = value.name;
                                    return;
                                }
                            });
                        }
                    });
                    return departmentName;
                };

                $scope.ui.init = function () {
                    if (angular.isUndefined($rootScope.globals.currentUser)) {
                        console.log("Console undifind");
                    } else {
                        $scope.ui.setDepartmentLabel($rootScope.globals.currentUser);
                    }
                    Factory.findAll(findAllUserUrl, function (data) {
                        $scope.model.userList = data;
                    });
                    Factory.findAll(findAllDepartmentUrl, function (data) {
                        $scope.model.departmentList = data;
                    });

                    //on load get count
                    if (angular.isUndefined($rootScope.globals.currentUser)) {
                        console.log("Console undifind");
                    } else {
                        if ($rootScope.globals.currentUser.type === "ADMIN") {
                            Factory.getCountList(adminCountUrl, function (data) {
                                $rootScope.model.map = data;
                            });
                        } else if ($rootScope.globals.currentUser.type === "USER") {
                            Factory.getCountList(departmentCountUrl + $rootScope.globals.currentUser.indexNo, function (data) {
                                $rootScope.model.map = data;
                            });
                        } else {
                            Factory.getCountList(employeeCountUrl + $rootScope.globals.currentUser.indexNo, function (data) {
                                $rootScope.model.map = data;
                            });
                        }
                    }

//                    counter function 
                    $scope.time = 0;
                    var timer = function () {
                        if ($scope.time === 60) {
                            if (angular.isUndefined($rootScope.globals.currentUser)) {
                                console.log("Console undifind");
                            } else {
                                if ($rootScope.globals.currentUser.type === "ADMIN") {
                                    Factory.getCountList(adminCountUrl, function (data) {
                                        $rootScope.model.map = data;
                                    });
                                } else if ($rootScope.globals.currentUser.type === "USER") {
                                    Factory.getCountList(departmentCountUrl + $rootScope.globals.currentUser.indexNo, function (data) {
                                        $rootScope.model.map = data;
                                    });
                                } else {
                                    Factory.getCountList(employeeCountUrl + $rootScope.globals.currentUser.indexNo, function (data) {
                                        $rootScope.model.map = data;
                                    });
                                }
                            }
                            $scope.time = 0;
                        }
                        if ($scope.time < 60) {
                            $scope.time += 1;
                            $timeout(timer, 1000);
                        }
                    };

                    //call time
                    $timeout(timer, 1000);
                };
                $scope.ui.init();
            });
}());