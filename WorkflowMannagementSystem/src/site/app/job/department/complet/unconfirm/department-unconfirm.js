(function () {
    angular.module("AppModule")
            .controller("DepatmentUnconfirmController", function ($scope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.jobItemList = [];
                $scope.model.employeeList = [];
                $scope.model.jobItemList = [];
                $scope.model.ItemList = [];
                $scope.listIndex = 0;
                $scope.ui.rejectReasonText = false;

                var findAllUrl = "/api/wms/job/get-all-jobs-department-send";
                var findAllSelectedJobDetailItemUrl = "/api/wms/job-items/get-all-item-by-job-detail/";
                var findAllJobDetailUrl = "/api/wms/job-detail/find-all-job-details-by-job/";
                var findAllEmployee = "/api/wms/master/employee/find-all-employee";
                var findAllItem = "/api/wms/master/item/find-all-item";
                var saveUrl = "/api/wms/job/save-jobs";

//                $scope.ui.reset = function () {
//                    $scope.model.job = {};
//                    $scope.ui.selectedJobIndex = null;
//                };

                $scope.ui.reject = function () {
                    console.log("sasasa"); 
                    $scope.ui.rejectReasonText = !$scope.ui.rejectReasonText;
                };

                $scope.ui.approve = function () {
                    var detail = $scope.model.job;
                    detail.status = "COMPLETED";
                    var detailJSON = JSON.stringify(detail);
                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Job Completed Success");
                                $scope.model.newJobList.splice($scope.listIndex, 1);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.setDescription = function (job, index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.job = job;
                    $scope.model.getAllJobDetail(job.indexNo);
                    $scope.description = job.clientDescription;
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
                $scope.ui.init = function () {
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