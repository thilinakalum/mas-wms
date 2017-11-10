(function () {
    angular.module("AppModule")
            .controller("BudgetCodeController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.budgetCodeList = [];

                var findAllUrl = "/api/wms/master/budget-code/find-all-budget-code";
                var saveUrl = "/api/wms/master/budget-code/save-budget-code";

                $scope.ui.reset = function () {
                    $scope.model.budgetCode = {};
                };

                $scope.ui.save = function () {
                    var detail = $scope.model.budgetCode;
                    var detailJSON = JSON.stringify(detail);

                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Budget-code Save Successfully");
                                $scope.model.budgetCodeList.push(data);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.budgetCodeList = data;
                    });

                };
                $scope.ui.init();
            });
}());