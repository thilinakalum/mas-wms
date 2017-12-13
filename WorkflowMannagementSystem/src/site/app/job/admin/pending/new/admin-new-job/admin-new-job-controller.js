(function () {
    angular.module("AppModule")
            .controller("AdminNewJobController", function ($scope, $rootScope, Factory, AdminNewJobModel, Notification) {
                $scope.model = new AdminNewJobModel();
                $scope.ui = {};
                $scope.ui.mode = true;
                
                $scope.ui.clear = function () {
                    $scope.model.depatmentJobData = {};
                };

                $scope.ui.save = function () {
                    if ($scope.ui.mode) {
                        $scope.ui.mode = false;
                        if (!$scope.model.depatmentJobData.category) {
                            Notification.error("Select a category to save !!!");
                        } else {
                            $scope.model.saveNewJob()
                                    .then(function (data) {
                                        Notification.success(data.indexNo + " - " + "Job Send Successfully");
                                        $scope.ui.mode = true;
                                        $scope.ui.clear();
                                        $rootScope.model.map.NEW += 1;
                                    }, function () {
                                        $scope.ui.mode = true;
                                        Notification.error("Job Send Fail !!!");
                                    });
                        }
                    }
                };
                
                $scope.ui.jobTransactions = function (indexNo) {
                    $scope.model.jobTransactions(indexNo);
                };
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
                
                $scope.ui.departmentLable = function (indexNo){
                    var departmentName;
                    angular.forEach($scope.model.departmentList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            departmentName = value.name;
                            return ;
                        }
                    });
                    return departmentName;
                };

                $scope.ui.userLabel = function (userIndexNo) {
                    var userName;
                    angular.forEach($scope.model.userList, function (value) {
                        if (value.indexNo === parseInt(userIndexNo)) {
                            userName = value.userName;
                            return;
                        }
                    });
                    return userName;
                };

                $scope.ui.init = function () {
                    Factory.getCountList("/api/wms/count/get-all-department-count/"+$rootScope.globals.currentUser.indexNo, function (data) {
                        $rootScope.model.map = data;
                    });
                    console.log("dsd");
                };
                $scope.ui.init();
            });
}());
