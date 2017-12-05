(function () {
    angular.module("AppModule")
            .controller("DepartmentNewController", function ($scope, $rootScope, Factory, DepartmentHomeModel, Notification) {
                $scope.model = new DepartmentHomeModel();
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

                $scope.ui.init = function () {
                    Factory.getCountList("/api/wms/count/get-all-count", function (data) {
                        $rootScope.model.map = data;
                    });
                    console.log("dsd");
                };
                $scope.ui.init();
            });
}());
