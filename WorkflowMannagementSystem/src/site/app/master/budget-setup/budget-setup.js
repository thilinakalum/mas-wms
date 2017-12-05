(function () {
    angular.module("AppModule")
            .controller("BudgetSetupController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.budgetSetupList = [];
                $scope.model.budgetSetup={};

                var findAllCodeUrl = "/api/wms/master/budget-code/find-all-budget-code";
                var findAllUrl = "/api/wms/master/budget-setup/find-all-budget-setup";
                var saveUrl = "/api/wms/master/budget-setup/save-budget-setup";
                var deleteUrl = "/api/wms/master/budget-setup/delete-budget-setup/";

                $scope.ui.reset = function () {
                    $scope.model.budgetSetup = {};
                };
                $scope.ui.edit = function (budgetSetup, index) {
                    $scope.model.budgetSetupList.splice(index, 1);
                    $scope.model.budgetSetup = budgetSetup;
                };
                $scope.ui.delete = function (indexNo, index) {
                    Factory.delete(deleteUrl, indexNo,
                            function (data) {
                                Notification.success("BudgetCode Setup Delete Successfully");
                                $scope.model.budgetSetupList.splice(index, 1);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
                $scope.ui.save = function () {
                    if ($scope.validate()) {
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
                    }
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
                $scope.validate = function () {
                    if (!$scope.model.budgetSetup.budgetCode) {
                        Notification.error("Please select BudgetCode !!!");
                        return false;
                    } else if (!$scope.model.budgetSetup.year) {
                        Notification.error("Please Input Year !!!");
                        return false;
                    } else if (!$scope.model.budgetSetup.price) {
                        Notification.error("Please Input Price !!!");
                        return false;
                    } else if ($scope.model.budgetSetup.budgetCode && $scope.model.budgetSetup.year && $scope.model.budgetSetup.price) {
                        return true;
                    }
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