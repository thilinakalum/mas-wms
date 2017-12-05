(function () {
    angular.module("AppModule")
            .controller("BudgetCodeController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.budgetCode = {};
                $scope.model.budgetCodeList = [];

                var findAllUrl = "/api/wms/master/budget-code/find-all-budget-code";
                var saveUrl = "/api/wms/master/budget-code/save-budget-code";
                var deleteUrl = "/api/wms/master/budget-code/delete-budget-code/";

                $scope.ui.reset = function () {
                    $scope.model.budgetCode = {};
                };
                $scope.ui.edit = function (budgetCode, index) {
                    $scope.model.budgetCodeList.splice(index, 1);
                    $scope.model.budgetCode = budgetCode;
                };
                $scope.ui.delete = function (indexNo, index) {
                    Factory.delete(deleteUrl, indexNo,
                            function (data) {
                                Notification.success("BudgetCode Delete Successfully");
                                $scope.model.budgetCodeList.splice(index, 1);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.save = function () {
                    if ($scope.validate()) {
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
                    }
                };
                $scope.validate = function () {
                    if (!$scope.model.budgetCode.code) {
                        Notification.error("Please Input Budget Code !!!");
                        return false;
                    } else if (!$scope.model.budgetCode.description) {
                        Notification.error("Please Input BudgetCode Descripton !!!");
                        return false;
                    } else if ($scope.model.budgetCode.code && $scope.model.budgetCode.description) {
                        return true;
                    }
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.budgetCodeList = data;
                    });

                };
                $scope.ui.init();
            });
}());