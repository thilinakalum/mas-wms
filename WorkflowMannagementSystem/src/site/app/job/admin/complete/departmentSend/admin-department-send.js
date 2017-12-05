(function () {
    angular.module("AppModule")
            .controller("AdminDepatmentSendController", function ($scope, $rootScope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.jobItemList = [];
                $scope.model.employeeList = [];
                $scope.model.jobItemList = [];
                $scope.model.ItemList = [];
                $scope.listIndex = 0;
                $scope.ui.mode = true;

                var findAllUrl = "/api/wms/job/get-all-jobs-department-send";
                var findAllSelectedJobDetailItemUrl = "/api/wms/job-items/get-all-item-by-job-detail/";
                var findAllJobDetailUrl = "/api/wms/job-detail/find-all-job-details-by-job/";
                var findAllEmployee = "/api/wms/master/employee/find-all-employee";
                var findAllItem = "/api/wms/master/item/find-all-item";
                var saveUrl = "/api/wms/job/save-jobs";
                var findAllTransactionUrl = "/api/wms/job-transaction/get-all-job-transaction/";
                
//                $scope.ui.reset = function () {
//                    $scope.model.job = {};
//                    $scope.ui.selectedJobIndex = null;
//                };

                $scope.ui.sendDepartment = function () {
                    if ($scope.ui.mode) {
                        $scope.ui.mode = false;
                        var detail = $scope.model.job;
                        detail.status = "UNCOMFIRM";
                        var detailJSON = JSON.stringify(detail);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Job Send To Depatment Success");
                                    $scope.model.newJobList.splice($scope.listIndex, 1);
                                    $rootScope.model.map.UNCOMFIRM += 1;
                                    $rootScope.model.map.FINISH -= 1;
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

                $scope.ui.setDescription = function (job, index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.job = job;
                    $scope.model.getAllJobDetail(job.indexNo);
                    $scope.description = job.clientDescription;
                    $scope.ui.jobTransactions(job.indexNo);
                };
                $scope.ui.selectedJobDetails = function (jobDetail) {
                    $scope.ui.selectedDetailIndex = jobDetail.indexNo;
                    $scope.model.adminJobItemData = {};
                    $scope.model.adminJobDetailData = jobDetail;
                    $scope.model.getSelectedJobDetailItem(jobDetail.indexNo);

                };
                $scope.model.getAllJobDetail = function (indexNo) {
                    Factory.findAll(findAllJobDetailUrl + indexNo,
                            function (data) {
                                $scope.model.jobDetailList = data;
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
                $scope.model.getSelectedJobDetailItem = function (indexNo) {
                    Factory.findAll(findAllSelectedJobDetailItemUrl + indexNo,
                            function (data) {
                                $scope.model.jobItemList = data;
                                $scope.model.totalItemPrice = $scope.model.setTotalItemPrice();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
                $scope.model.setTotalItemPrice = function () {
                    var total = 0;
                    angular.forEach($scope.model.jobItemList, function (value) {
                        total += value.totalPrice;
                        return;
                    });
                    return total;
                };
                $scope.model.employeeLable = function (indexNo) {
                    var employee;
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            employee = value.name;
                            return;
                        }
                    });
                    return employee;
                };
                $scope.model.itemLable = function (indexNo) {
                    var item;
                    angular.forEach($scope.model.itemList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            item = value.name;
                            return;
                        }
                    });
                    return item;
                };
                
                $scope.ui.jobTransactions = function (indexNo) {
                    Factory.findAll(findAllTransactionUrl+indexNo, function (data) {
                        $scope.model.transactionList = data;
                    });
                };
                
                $scope.ui.init = function () {
                
                    Factory.getCountList("/api/wms/count/get-all-count", function (data) {
                        $rootScope.model.map = data;
                    });
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                    });
                    Factory.findAll(findAllEmployee, function (data) {
                        $scope.model.employeeList = data;
                    });
                    Factory.findAll(findAllItem, function (data) {
                        $scope.model.itemList = data;
                    });
                };
                $scope.ui.init();
            });
}());