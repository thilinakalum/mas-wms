(function () {
    angular.module("AppModule")
            .controller("DepartmentPendingController", function ($scope, $rootScope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.budgetCodeList = [];
                $scope.model.jobDetailList = [];
                $scope.model.employeeList = [];
                $scope.listIndex = 0;
                $scope.ui.mode = true;

                var findAllUrl = "/api/wms/job/get-all-jobs-by-department-and-status/"+ $rootScope.globals.currentUser.indexNo + "/" + 'ASSIGN';
                var findAllJobDetailByJobNoUrl = "/api/wms/job-detail/find-all-job-details-by-job/";
                var saveUrl = "/api/wms/job/save-jobs";
                var FindAllEmployeeUrl = "/api/wms/master/employee/find-all-employee";
                var findAllTransactionUrl = "/api/wms/job-transaction/get-all-job-transaction/";
                var findAllJobDetailByJobNoUrl = "/api/wms/job-detail/find-all-job-details-by-job/";

                $scope.ui.reset = function () {
                    $scope.model.job = {};
                    $scope.ui.selectedJobIndex = null;
                    $scope.listIndex = 0;
                    $scope.model.employeeList = [];
                };
                $scope.model.getSelectedJobDetailItem = function (indexNo) {
                    Factory.findAll(findAllJobDetailByJobNoUrl + indexNo, function (data) {
                        $scope.model.jobDetailList = data;
                    });
                };

                $scope.ui.finish = function () {
                    if ($scope.ui.mode) {
                        $scope.ui.mode = false;
                        var detail = $scope.model.job;
                        detail.status = "FINISH";
                        var detailJSON = JSON.stringify(detail);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Job Finish Mannual success!!!");
                                    $scope.model.newJobList.splice($scope.listIndex, 1);
                                    $rootScope.model.map.FINISH += 1;
                                    $rootScope.model.map.ASSIGN -= 1;
                                    $scope.ui.reset();
                                    $scope.ui.mode = true;
                                    $scope.model.employeeList = [];
                                },
                                function (data) {
                                    Notification.error(data.message);
                                    $scope.ui.mode = true;
                                }
                        );
                    }
                };

                $scope.ui.setDescription = function (job, index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.getSelectedJobDetailItem(job.indexNo);
                    $scope.model.job.clientDescription = job.clientDescription;
                    $scope.model.job = job;
                    $scope.ui.jobTransactions(job.indexNo);
                    $scope.model.getSelectedJobDetailItem(job.indexNo);
                };

                $scope.ui.jobTransactions = function (indexNo) {
                    Factory.findAll(findAllTransactionUrl + indexNo, function (data) {
                        $scope.model.transactionList = data;
                    });
                };

                $scope.model.getSelectedJobDetailItem = function (indexNo) {
                    Factory.findAll(findAllJobDetailByJobNoUrl + indexNo, function (data) {
                        $scope.model.jobDetailList = data;
                    });
                };

                $scope.ui.employeeLable = function (indexNo) {
                    var employee;
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            employee = value.name;
                            return;
                        }
                    });
                    return employee;
                };

                $scope.styleColor = function (status) {
                    if (status === 'NEW') {
                        return {color: status.color};
                    } else if (status === 'NEW') {

                    }
                };

//                $scope.ui.changeColour = function (status){
//                    if (status ==='NEW') {
//                        document.getElementById("status").style.background = "green";
//                        document.getElementById("status").style.color = "white";
////                        statuss = status;
//                        return status;
//                    }else if (status ==='ONGOING') {
//                        document.getElementById("status").style.background = "blue";
//                        document.getElementById("status").style.color = "white";
////                        statuss = status;
//                        return status;
//                    }else if (status ==='FINISH') {
//                        document.getElementById("status").style.background = "green";
//                        document.getElementById("status").style.color = "white";
////                        statuss = status;
//                        return status;
//                    }
//                    return status;
//                };

                $scope.ui.init = function () {
                    Factory.getCountList("/api/wms/count/get-all-count", function (data) {
                        $rootScope.model.map = data;
                    });
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                    });
                    Factory.findAll(FindAllEmployeeUrl, function (data) {
                        $scope.model.employeeList = data;
                    });
                };
                $scope.ui.init();
            });
}());