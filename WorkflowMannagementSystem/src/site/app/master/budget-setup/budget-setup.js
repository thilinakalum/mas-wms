(function () {
    angular.module("AppModule")
            .controller("BudgetSetupController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};

                var findAllCodeUrl = "/api/wms/master/budget-code/find-all-budget-code";
                var findAllUrl = "/api/wms/master/budget-setup/find-all-budget-setup";
                var saveUrl = "/api/wms/master/budget-setup/save-budget-setup";

                $scope.ui.reset = function () {
                    $scope.model.budgetSetup = {};
                };

                $scope.ui.save = function () {
                    var detail = $scope.model.budgetSetup;
                    var detailJSON = JSON.stringify(detail);

                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Budget-Setup Save Successfully");
                                $scope.model.budgetSetupList.push(data);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
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

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.budgetSetupList = data;
                    });
                    Factory.findAll(findAllCodeUrl, function (data) {
                        $scope.model.budgetCodeList = data;
                    });

                };
                $scope.ui.init();
            });
}());