(function () {
    angular.module("AppModule")
            .controller("AdminAssignController", function ($scope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.budgetCodeList = [];
                $scope.listIndex = 0;
                
                var findAllUrl = "/api/wms/job/get-all-jobs-by-department-and-assing/" + 1;
                var saveUrl = "/api/wms/job/save-jobs";

                $scope.ui.reset = function () {
                    $scope.model.job = {};
                    $scope.ui.selectedJobIndex = null;
                };

                $scope.ui.save = function () {
                    var detail = $scope.model.job;
                    detail.status = "UNAPPROVE";
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Job Send To Approval");
                                $scope.model.newJobList.splice($scope.listIndex , 1);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
                
                $scope.ui.setDescription = function (job , index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.job = job;
//                    $scope.model.job.description = job.clientDescription;
                };

                $scope.ui.budgetCodeLabel = function (indexNo) {
                    var budgetCode;
                    angular.forEach($scope.model.budgetCodeList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            budgetCode = value.code;
                            return;
                        }
                    });
                    return budgetCode;
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                    });
                };
                $scope.ui.init();
            });
}());