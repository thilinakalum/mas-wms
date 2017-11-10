(function () {
    angular.module("AppModule")
            .controller("UserController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.userList = [];
                $scope.model.departmentList = [];
                $scope.model.employeeList = [];

                var findAllDepartmentUrl = "/api/wms/master/department/find-all-department";
                var findAllEmployeeUrl = "/api/wms/master/employee/find-all-employee";
                var findAllUrl = "/api/wms/master/user/find-all-user";
                var saveUrl = "/api/wms/master/user/save-user";

                $scope.ui.reset = function () {
                    $scope.model.user = {};
                };

                $scope.ui.save = function () {
                    var detail = $scope.model.user;
                    var detailJSON = JSON.stringify(detail);

                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "User Save Successfully");
                                $scope.model.userList.push(data);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
                $scope.ui.employeeLable = function (indexNo) {
                    var employee;
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            employee = value.name;
                            return;
                        }
                    });
                    return employee;
                };
                $scope.ui.departmentLable = function (indexNo) {
                    var department;
                    angular.forEach($scope.model.departmentList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            department = value.name;
                            return;
                        }
                    });
                    return department;
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.userList = data;
                    });
                    Factory.findAll(findAllDepartmentUrl, function (data) {
                        $scope.model.departmentList = data;
                    });
                    Factory.findAll(findAllEmployeeUrl, function (data) {
                        $scope.model.employeeList = data;
                    });

                };
                $scope.ui.init();
            });
}());