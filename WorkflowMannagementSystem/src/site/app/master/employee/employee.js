(function () {
    angular.module("AppModule")
            .controller("EmployeeController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.employeeList = [];
                $scope.model.employee = {};

                var findAllUrl = "/api/wms/master/employee/find-all-employee";
                var saveUrl = "/api/wms/master/employee/save-employee";
                var deleteUrl = "/api/wms/master/employee/delete-employee/";

                $scope.ui.reset = function () {
                    $scope.model.employee = {};
                };
                $scope.ui.edit = function (employee, index) {
                    $scope.model.employeeList.splice(index, 1);
                    $scope.model.employee = employee;
                };
                
                $scope.ui.delete = function (indexNo, index) {
                    Factory.delete(deleteUrl, indexNo,
                            function (data) {
                                Notification.success("Employee Delete Successfully");
                                $scope.model.employeeList.splice(index, 1);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.save = function () {
                    if ($scope.validate()) {
                        var detail = $scope.model.employee;
                        var detailJSON = JSON.stringify(detail);

                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Employee Save Successfully");
                                    $scope.model.employeeList.push(data);
                                    $scope.ui.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                }
                        );
                    }
                };

                $scope.validate = function () {
                    if (!$scope.model.employee.name) {
                        Notification.error("Please Input Employee Name !!!");
                        return false;
                    } else if (!$scope.model.employee.mobile) {
                        Notification.error("Please Input Employee Mobile !!!");
                        return false;
                    } else if (!$scope.model.employee.address) {
                        Notification.error("Please Input Employee Address !!!");
                        return false;
                    } else if (!$scope.model.employee.type) {
                        Notification.error("Please Input Employee Type !!!");
                        return false;
                    } else if (!$scope.model.employee.description) {
                        Notification.error("Please Input Employee Descripton !!!");
                        return false;
                    } else if ($scope.model.employee.name && $scope.model.employee.mobile && $scope.model.employee.address && $scope.model.employee.type && $scope.model.employee.description) {
                        return true;
                    }
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.employeeList = data;
                    });

                };
                $scope.ui.init();
            });
}());