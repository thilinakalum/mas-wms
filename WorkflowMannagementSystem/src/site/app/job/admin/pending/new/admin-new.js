(function () {
    angular.module("AppModule")
            .controller("AdminNewController", function ($scope, $location, $rootScope, Notification, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.budgetCodeList = [];
                $scope.model.transactionList = [];
                $scope.model.departmentList = [];
                $scope.model.userList = [];
                $scope.listIndex = 0;

                var findAllUrl = "/api/wms/job/get-all-jobs-by-admin-and-status/"+ 'NEW';
                var findAllUserUrl = "/api/wms/master/user/find-all-user";
                var findAllDepartmentUrl = "/api/wms/master/department/find-all-department";
                var findAllCodeUrl = "/api/wms/master/budget-code/find-all-budget-code";
                var saveUrl = "/api/wms/job/save-jobs";
                var findAllTransactionUrl = "/api/wms/job-transaction/get-all-job-transaction/";

                $scope.ui.reset = function () {
                    $scope.model.job = {};
                    $scope.ui.mode = 'unselect';
                    $scope.ui.selectedJobIndex = null;
                };

                $scope.ui.save = function () {
                    $scope.ui.mode = 'unselect';
                    var detail = $scope.model.job;
                    detail.status = "UNAPPROVE";
                    detail.user = $rootScope.globals.currentUser.indexNo;
                    detail.branch = $rootScope.globals.currentUser.branch;
                    var detailJSON = JSON.stringify(detail);
                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Job Send To Approval");
                                $scope.model.newJobList.splice($scope.listIndex, 1);
                                $rootScope.model.map.NEW -= 1;
                                $rootScope.model.map.UNAPPROVE += 1;
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.setDescription = function (job, index) {
                    $scope.ui.mode = "select";
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.job = job;
                    $scope.ui.jobTransactions(job.indexNo);
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
                
                $scope.ui.userLabel = function (userIndexNo){
                    var userName;
                    angular.forEach($scope.model.userList, function (value){
                       if(value.indexNo === parseInt(userIndexNo)){
                           userName = value.userName ;
                           return ;
                       }
                    });
                    return userName;
                };

                $scope.ui.jobTransactions = function (indexNo) {
                    Factory.findAll(findAllTransactionUrl + indexNo, function (data) {
                        $scope.model.transactionList = data;
                    });
                };

                $scope.ui.init = function () {
                    $scope.ui.mode = 'unselect';
                    if ($rootScope.globals.currentUser.type === 'ADMIN') {
                        $location.path('/admin-new');
                    } else {
                        $location.path('/');
                    }
                    Factory.getCountList("/api/wms/count/get-all-admin-count", function (data) {
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