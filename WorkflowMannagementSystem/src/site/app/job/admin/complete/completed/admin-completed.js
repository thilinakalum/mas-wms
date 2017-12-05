(function () {
    angular.module("AppModule")
            .controller("AdminCompletedController", function ($scope, $rootScope, Factory) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.job = {};
                $scope.model.newJobList = [];
                $scope.model.budgetCodeList = [];
                $scope.listIndex = 0;

                var findAllUrl = "/api/wms/job/get-all-jobs-by-department-and-completed";
                var saveUrl = "/api/wms/job/save-jobs";

                $scope.ui.reset = function () {
                    $scope.model.job = {};
                    $scope.ui.selectedJobIndex = null;
                };

                $scope.ui.setDescription = function (job, index) {
                    $scope.listIndex = index;
                    $scope.ui.selectedJobIndex = job.indexNo;
                    $scope.model.job = job;
//                    $scope.model.job.description = job.clientDescription;
                };

                $scope.ui.init = function () {
                    Factory.getCountList("/api/wms/count/get-all-count", function (data) {
                        $rootScope.model.map = data;
                    });
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.newJobList = data;
                    });
                };
                $scope.ui.init();
            });
}());