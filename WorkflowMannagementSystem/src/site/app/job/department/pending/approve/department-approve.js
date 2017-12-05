(function () {
    angular.module("AppModule")
            .controller("DepartmentApproveController", function ($scope, $rootScope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.budgetCodeList = [];
                $scope.listIndex = 0;
                $scope.ui.reasonText = false;
                $scope.ui.mode = true;

                var findAllUrl = "/api/wms/job/get-all-jobs-by-department-and-approve/" + 1;
                var findAllCodeUrl = "/api/wms/master/budget-code/find-all-budget-code";
                var saveUrl = "/api/wms/job/save-jobs";
                var findAllTransactionUrl = "/api/wms/job-transaction/get-all-job-transaction/";
                
                $scope.ui.reset = function () {
                    $scope.model.job = {};
                    $scope.ui.selectedJobIndex = null;
                };

                $scope.ui.save = function () {
                    if ($scope.ui.mode) {
                        $scope.ui.mode = false;
                        var detail = $scope.model.job;
                        detail.status = "APPROVE";
                        var detailJSON = JSON.stringify(detail);
                        console.log(detailJSON);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Job Approval Success");
                                    $scope.model.newJobList.splice($scope.listIndex, 1);
                                    $rootScope.model.map.APPROVE += 1;
                                    $rootScope.model.map.UNAPPROVE -= 1;
                                    $scope.ui.reset();
                                    $scope.ui.mode = true;
                                },
                                function (data) {
                                    Notification.error(data.message);
                                    $scope.ui.mode = true;
                                }
                        );
                    }
                };

                $scope.ui.cansel = function () {
                    $scope.ui.reasonText = !$scope.ui.reasonText;
                };
                $scope.ui.reject = function () {
                    $scope.ui.reasonText = !$scope.ui.reasonText;
                };

                $scope.ui.setDescription = function (job, index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.job = job;
                    $scope.ui.jobTransactions(job.indexNo);
//                    $scope.model.job.description = job.clientDescription;
                };
                $scope.ui.jobTransactions = function (indexNo) {
                    Factory.findAll(findAllTransactionUrl + indexNo, function (data) {
                        $scope.model.transactionList = data;
                    });
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
                    Factory.getCountList("/api/wms/count/get-all-count", function (data) {
                        $rootScope.model.map = data;
                    });
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                    });
                    Factory.findAll(findAllCodeUrl, function (data) {
                        $scope.model.budgetCodeList = data;
                    });
                };
                $scope.ui.init();
            });
}());