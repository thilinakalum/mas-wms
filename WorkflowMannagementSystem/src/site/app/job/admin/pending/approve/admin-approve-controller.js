(function () {
    angular.module("AppModule")
            .controller("AdminHomeController", function ($scope, $rootScope, AdminHomeModel, Notification,Factory, $filter, $timeout) {
                $scope.model = new AdminHomeModel();
                $scope.ui = {};

                $scope.ui.clear = function () {
                    $scope.model.adminJobDetailData.deadlineTime = null;
                    $scope.model.adminJobDetailData.deadlineDate = null;
                    $scope.model.adminJobDetailData.employee = null;
                    $scope.model.adminJobDetailData.adminDescription = null;
                };
                $scope.ui.focus = function (element) {
                    $timeout(function () {
                        document.querySelectorAll(element)[0].focus();
                    }, 10);
                };

                $scope.ui.setDescription = function (job, indexList) {
                    $scope.ui.focus("#employeeText");
                    $scope.ui.mode = 'select';
                    $scope.model.adminJobItemData = {};
                    $scope.model.jobItemList = [];
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.selectedJob = job;
                    $scope.model.selectedJobIndex = indexList;
                    $scope.model.getAllJobDetail(job.indexNo);
                    $scope.model.adminJobDetailData.job = job.indexNo;
                    $scope.model.adminJobDetailData.description = job.clientDescription;
                    $scope.model.adminJobDetailData.requiredDate = job.requiredDate;
                    $scope.model.adminJobDetailData.requiredTime = job.requiredTime;
                    $scope.ui.jobTransactions(job.indexNo);
                };
                $scope.ui.jobTransactions = function (indexNo) {
                    $scope.model.jobTransactions(indexNo);
                };

                $scope.ui.saveJobDetail = function () {
                    $scope.ui.mode = 'unselect';
                    $scope.model.saveJobDetail()
                            .then(function () {
                                Notification.success("Job Assign Successfully");
                                $scope.ui.clear();
                                $scope.ui.mode = 'select';
                            }, function () {
                                $scope.ui.mode = 'select';
                                Notification.error("Job Send Fail !!!");
                            });
                };
                $scope.ui.selectedJobDetails = function (jobDetail) {
                    $scope.ui.mode1 = 'select';
                    $scope.ui.focus("#itemText");
                    $scope.ui.selectedDetailIndex = jobDetail.indexNo;
                    $scope.model.adminJobItemData = {};
                    $scope.model.adminJobDetailData = jobDetail;
                    $scope.model.getSelectedJobDetailItem(jobDetail.indexNo);

                };

                $scope.ui.editJobDetail = function (jobDetails, index) {
                    $scope.model.adminJobDetailData = jobDetails;
                    $scope.model.adminJobDetailData.deadlineDate = new Date(jobDetails.deadlineDate);
                    $scope.model.adminJobDetailData.deadlineTime = new Date(jobDetails.deadlineDate);
                    $scope.model.jobDetailList.splice(index, 1);
                };

                $scope.ui.deleteJobDetail = function (jobDetails, index) {
                    $scope.model.deleteJobDetail(jobDetails.indexNo)
                            .then(function () {
                                Notification.success("Job Item Delete Success");
                                $scope.model.jobDetailList.splice(index, 1);
                            }, function () {
                                Notification.error("Job Item Delete Fail !!!");
                            });
                };
                $scope.ui.saveJobItems = function () {
                    $scope.model.saveJobItems()
                            .then(function () {
                                Notification.success("Job Item added Success");
                                $scope.model.adminJobItemData = {};
                                $scope.model.adminJobItemData.unitPrice = 0;
//                                $scope.ui.clear();
                            }, function () {
                                Notification.error("Job Item added Fail !!!");
                            });
                };
                $scope.ui.finishAssign = function () {
                    $scope.model.finishAssign()
                            .then(function () {
                                Notification.success("Job Assign finish success");
                                $scope.model.adminJobItemData = {};
                                $rootScope.model.map.APPROVE -= 1;
                                $rootScope.model.map.ASSIGN += 1;
                            }, function () {
                                Notification.error("Job Assign finish Fail !!!");
                            });
                };

                $scope.ui.init = function () {
                    Factory.getCountList("/api/wms/count/get-all-count", function (data) {
                        $rootScope.model.map = data;
                    });
                    $scope.ui.mode = "unselect";
                    $scope.ui.mode1 = "unselect";
                };
                $scope.ui.init();
            });
}());


