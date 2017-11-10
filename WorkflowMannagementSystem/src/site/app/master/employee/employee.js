(function () {
    angular.module("AppModule")
            .controller("EmployeeController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.employeeList = [];
                
                var findAllUrl = "/api/wms/master/employee/find-all-employee";
                var saveUrl = "/api/wms/master/employee/save-employee";

                $scope.ui.reset = function () {
                    $scope.model.employee = {};
                };

                $scope.ui.save = function () {
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
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.employeeList = data;
                    });

                };
                $scope.ui.init();
            });
}());