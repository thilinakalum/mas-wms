(function () {
    angular.module("AppModule")
            .controller("EmployeeRunningController", function ($scope, Notification, Factory, $filter) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.jobDetailData = {};
                $scope.model.adminJobItemData = {};
                $scope.model.newJobList = [];
                $scope.model.employeeList = [];
                $scope.model.itemList = [];
                $scope.listIndex = 0;
                
                var findAllUrl = "/api/wms/job-detail/get-all-job-detail-by-employee-and-running/" + 1;
                var findAllEmployeeUrl = "/api/wms/master/employee/find-all-employee";
                var findAllJobItemsUrl = "/api/wms/job-items/get-all-item-by-job-detail/";
                var findAllItemUrl = "/api/wms/master/item/find-all-item";
                var saveUrl = "/api/wms/job-detail/save-job-detail";
                var saveJobItemUrl = "/api/wms/job-items/save-job-items";
                
                $scope.ui.reset = function () {
                    $scope.model.jobDetailData = {};
                    $scope.model.adminJobItemData = {};
                    $scope.ui.selectedJobIndex = null;
                    $scope.model.jobItemList =[];
                };
                $scope.ui.finishJob = function () {
                    var detail = $scope.model.jobDetailData;
                    detail.status = "FINISH";
                    var detailJSON = JSON.stringify(detail);
                    console.log(detailJSON);
                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Job Finish Success");
                                $scope.model.newJobList.splice($scope.listIndex , 1);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.setDescription = function (job, index) {
                    $scope.ui.mode ='select';
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.jobDetailData = job;
                    $scope.model.jobDetailData.deadlineDate = $filter('date')(job.deadlineDate, 'yyyy-MM-dd');
//                    $scope.model.jobDetailData.deadlineTime = $filter('time')(job.deadlineTime, 'HH:mm:ss');
                    $scope.model.jobDetailData.description = job.adminDescription;
                    $scope.ui.loadJobItems(job.indexNo);
                };
                
                $scope.ui.loadJobItems = function (indexNo) {
                    Factory.findAll(findAllJobItemsUrl + indexNo, function (data) {
                        $scope.model.jobItemList = data;
                    });
                };
                
                $scope.ui.addItems = function () {
                    $scope.ui.addItem = !$scope.ui.addItem;
                };
                
                $scope.ui.saveJobItems = function () {
                    var detail = $scope.model.adminJobItemData;
                    detail.jobDetail = $scope.model.jobDetailData.indexNo;  
                    var detailJSON = JSON.stringify(detail);
                    Factory.save(saveJobItemUrl, detailJSON,
                            function (data) {
                                Notification.success("Job Item added Successfully");
                                $scope.model.jobItemList.push(data);
                                $scope.model.adminJobItemData = {};
                                $scope.model.adminJobItemData.unitPrice = 0;
                            },
                            function (data) {
                                Notification.error("Job Item added Fail !!!");
                            }
                    );
                };
                
                $scope.ui.employeeLabel = function (indexNo) {
                    var employee;
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            employee = value.name;
                            return;
                        }
                    });
                    return employee;
                };
                $scope.ui.itemLable = function (indexNo) {
                    var item;
                    angular.forEach($scope.model.itemList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            item = value.name;
                            return;
                        }
                    });
                    return item;
                };
                $scope.ui.onSelect = function (indexNo) {
                    var that = this;
                    angular.forEach($scope.model.itemList, function (value) {
                        if (value.indexNo === parseInt(indexNo)) {
                            $scope.model.adminJobItemData.unitPrice = value.unitPrice;
                            return;
                        }
                    });
                };
                $scope.ui.init = function () {
                    $scope.ui.mode ='unselect';
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                        console.log(data);
                    });
                    Factory.findAll(findAllEmployeeUrl, function (data) {
                        $scope.model.employeeList = data;
                        console.log(data);
                    });
                    Factory.findAll(findAllItemUrl, function (data) {
                        $scope.model.itemList = data;
                        console.log(data);
                    });
                };
                $scope.ui.init();
            });
}());