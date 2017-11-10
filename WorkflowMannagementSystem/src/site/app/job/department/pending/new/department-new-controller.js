(function () {
    angular.module("AppModule")
            .controller("DepartmentNewController", function ($scope, DepartmentHomeModel, Notification) {
                $scope.model = new DepartmentHomeModel();
                $scope.ui = {};

                $scope.ui.setDescription = function (){
                    
                };
                $scope.ui.clear = function (){
                    $scope.model.depatmentJobData = {};
                };
                
                $scope.ui.save = function () {
                    $scope.model.saveNewJob()
                            .then(function (data) {
                                Notification.success(data.indexNo + " - " + "Job Send Successfully");
                                $scope.ui.clear();
                            }, function () {
                                Notification.error("Job Send Fail !!!");
                            });
                };

                $scope.ui.init = function () {

                };
                $scope.ui.init();
            });
}());
