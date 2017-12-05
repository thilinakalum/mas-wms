(function () {
    angular.module("AppModule")
            .controller("DepartmentController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.departmentList = [];
                $scope.model.department ={};
                
                var findAllUrl = "/api/wms/master/department/find-all-department";
                var saveUrl = "/api/wms/master/department/save-department";
                var deleteUrl = "/api/wms/master/department/delete-department/";

                $scope.ui.reset = function () {
                    $scope.model.department = {};
                };
                
                $scope.ui.edit = function (department, index) {
                    $scope.model.departmentList.splice(index, 1);
                    $scope.model.department = department;
                };
                
                $scope.ui.delete = function (indexNo, index) {
                    Factory.delete(deleteUrl, indexNo,
                            function (data) {
                                Notification.success("Department Delete Successfully");
                                $scope.model.departmentList.splice(index, 1);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.save = function () {
                    if ($scope.validate()) {
                        var detail = $scope.model.department;
                        var detailJSON = JSON.stringify(detail);

                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Department Save Successfully");
                                    $scope.model.departmentList.push(data);
                                    $scope.ui.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                }
                        );
                    }
                };

                $scope.validate = function () {
                    if (!$scope.model.department.name) {
                        Notification.error("Please Input Department Name !!!");
                        return false;
                    } else if (!$scope.model.department.description) {
                        Notification.error("Please Input Department Descripton !!!");
                        return false;
                    } else if ($scope.model.department.name && $scope.model.department.description) {
                        return true;
                    }
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.departmentList = data;
                    });

                };
                $scope.ui.init();
            });
}());