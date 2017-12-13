(function () {
    angular.module("AppModule")
            .controller("DepartmentUnapproveController", function ($scope, $rootScope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.budgetCodeList = [];
                $scope.listIndex = 0;
                $scope.ui.rejectReasonText = false;
                $scope.ui.canselReasonText = false;
                $scope.ui.mode = true;

                var findAllUrl = "/api/wms/job/get-all-jobs-by-department-and-status/" + $rootScope.globals.currentUser.indexNo + "/" + "UNAPPROVE";
                var findAllUserUrl = "/api/wms/master/user/find-all-user";
                var findAllDepartmentUrl = "/api/wms/master/department/find-all-department";
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
                        detail.user = $rootScope.globals.currentUser.indexNo;
                        detail.branch = $rootScope.globals.currentUser.branch;
                        var detailJSON = JSON.stringify(detail);
                        console.log(detailJSON);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    $scope.ui.mode = true;
                                    Notification.success(data.indexNo + " - " + "Job Approval Success");
                                    $scope.model.newJobList.splice($scope.listIndex, 1);
                                    $rootScope.model.map.APPROVE += 1;
                                    $rootScope.model.map.UNAPPROVE -= 1;
                                    $scope.ui.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                    $scope.ui.mode = true;
                                }
                        );
                    }
                };
                $scope.ui.saveCanselReason = function () {
                    if ($scope.ui.mode) {
                        $scope.ui.mode = false;
                        var detail = $scope.model.job;
                        detail.status = "CANSEL";
                        var detailJSON = JSON.stringify(detail);
                        console.log(detailJSON);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Job Cansel Success");
                                    $scope.model.newJobList.splice($scope.listIndex, 1);
                                    $rootScope.model.map.CANSEL += 1;
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
                $scope.ui.saveRejectReason = function () {
                    if ($scope.ui.mode) {
                        $scope.ui.mode = false;
                        var detail = $scope.model.job;
                        detail.status = "REJECT";
                        var detailJSON = JSON.stringify(detail);
                        console.log(detailJSON);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Job Reject Success");
                                    $scope.model.newJobList.splice($scope.listIndex, 1);
                                    $rootScope.model.map.REJECT += 1;
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
                    $scope.ui.canselReasonText = !$scope.ui.canselReasonText;
                };
                $scope.ui.reject = function () {
                    $scope.ui.rejectReasonText = !$scope.ui.rejectReasonText;
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
                    Factory.findAll(findAllUserUrl, function (data) {
                        $scope.model.userList = data;
                    });
                    Factory.findAll(findAllDepartmentUrl, function (data) {
                        $scope.model.departmentList = data;
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