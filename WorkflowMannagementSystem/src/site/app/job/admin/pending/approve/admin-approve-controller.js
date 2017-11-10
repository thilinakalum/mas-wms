(function () {
    angular.module("AppModule")
            .controller("AdminHomeController", function ($scope, AdminHomeModel, Notification) {
                $scope.model = new AdminHomeModel();
                $scope.ui = {};

                $scope.ui.clear = function () {
                    $scope.model.adminJobDetailData.deadlineTime = null;
                    $scope.model.adminJobDetailData.deadlineDate = null;
                    $scope.model.adminJobDetailData.employee = null;
                    $scope.model.adminJobDetailData.adminDescription = null;
                };

                $scope.ui.setDescription = function (job , indexList) {
                    $scope.model.adminJobItemData ={};
                    $scope.model.jobItemList =[];
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.selectedJob = job;
                    $scope.model.selectedJobIndex = indexList;
                    $scope.model.getAllJobDetail(job.indexNo);
                    $scope.model.adminJobDetailData.job = job.indexNo;
                    $scope.model.adminJobDetailData.description = job.clientDescription;
                    $scope.model.adminJobDetailData.requiredDate = job.requiredDate;
                    $scope.model.adminJobDetailData.requiredTime = job.requiredTime;
                };

                $scope.ui.saveJobDetail = function () {
                    $scope.model.saveJobDetail()
                            .then(function () {
                                Notification.success("Job Assign Successfully");
                                $scope.ui.clear();
                            }, function () {
                                Notification.error("Job Send Fail !!!");
                            });
                };
                $scope.ui.selectedJobDetails = function (jobDetail) {
                    $scope.ui.selectedDetailIndex = jobDetail.indexNo;
                    $scope.model.adminJobItemData ={};
                    $scope.model.adminJobDetailData = jobDetail;
                    $scope.model.getSelectedJobDetailItem (jobDetail.indexNo);
                    
                };

                $scope.ui.saveJobItems = function () {
                    $scope.model.saveJobItems()
                            .then(function () {
                                Notification.success("Job Item added Successfully");
                                $scope.model.adminJobItemData = {};
                                $scope.model.adminJobItemData.unitPrice = 0;
//                                $scope.ui.clear();
                            }, function () {
                                Notification.error("Job Item added Fail !!!");
                            });
                };
                $scope.ui.finishAssign = function (){
                    $scope.model.finishAssign()
                            .then(function () {
                                Notification.success("Job Assign finish success");
                                $scope.model.adminJobItemData = {};
                            }, function () {
                                Notification.error("Job Assign finish Fail !!!");
                            });
                };

                $scope.ui.init = function () {

                };
                $scope.ui.init();
            });
}());


