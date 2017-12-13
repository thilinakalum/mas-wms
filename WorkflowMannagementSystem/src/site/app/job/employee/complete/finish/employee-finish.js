(function () {
    angular.module("AppModule")
            .controller("EmployeeFinishController", function ($scope, Notification,$rootScope, Factory, $filter) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.jobDetailData = {};
                $scope.model.adminJobItemData = {};
                $scope.model.newJobList = [];
                $scope.model.employeeList = [];
                $scope.model.itemList = [];
                $scope.listIndex = 0;
                
                var findAllUrl = "/api/wms/job-detail/get-all-job-detail-by-user-and-status/"  + $rootScope.globals.currentUser.indexNo + "/" + "FINISH";
                var findAllEmployeeUrl = "/api/wms/master/employee/find-all-employee";
                var findAllJobItemsUrl = "/api/wms/job-items/get-all-item-by-job-detail/";
                var findAllItemUrl = "/api/wms/master/item/find-all-item";
               
                $scope.ui.setDescription = function (job, index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.jobDetailData = job;
                    $scope.model.jobDetailData.deadlineDate = $filter('date')(job.deadlineDate, 'yyyy-MM-dd');
                    $scope.model.jobDetailData.description = job.adminDescription;
                    $scope.ui.loadJobItems(job.indexNo);
                };
                
                $scope.ui.loadJobItems = function (indexNo) {
                    Factory.findAll(findAllJobItemsUrl + indexNo, function (data) {
                        $scope.model.jobItemList = data;
                    });
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
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                    });
                    Factory.findAll(findAllEmployeeUrl, function (data) {
                        $scope.model.employeeList = data;
                    });
                    Factory.findAll(findAllItemUrl, function (data) {
                        $scope.model.itemList = data;
                    });
                };
                $scope.ui.init();
            });
}());