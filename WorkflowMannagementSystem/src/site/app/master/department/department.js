(function () {
    angular.module("AppModule")
            .controller("DepartmentController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.departmentList = [];

                var findAllUrl = "/api/wms/master/department/find-all-department";
                var saveUrl = "/api/wms/master/department/save-department";

                $scope.ui.reset = function () {
                    $scope.model.department = {};
                };

                $scope.ui.save = function () {
                    var detail = $scope.model.department;
                    var detailJSON = JSON.stringify(detail);

                    Factory.save( saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Department Save Successfully");
                                $scope.model.departmentList.push(data);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.departmentList = data;
                    });

                };
                $scope.ui.init();
            });
}());