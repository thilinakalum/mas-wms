(function () {
    angular.module("AppModule")
            .controller("ItemController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.itemList = [];
                $scope.model.item = {};

                var findAllUrl = "/api/wms/master/item/find-all-item";
                var saveUrl = "/api/wms/master/item/save-item";
                var deleteUrl = "/api/wms/master/item/delete-item/";

                $scope.ui.reset = function () {
                    $scope.model.item = {};
                };

                $scope.ui.edit = function (item, index) {
                    $scope.model.itemList.splice(index, 1);
                    $scope.model.item = item;
                };

                $scope.ui.delete = function (indexNo, index) {
                    Factory.delete(deleteUrl, indexNo,
                            function (data) {
                                Notification.success("Item Delete Successfully");
                                $scope.model.itemList.splice(index, 1);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.save = function () {
                    if ($scope.validate()) {
                        var detail = $scope.model.item;
                        var detailJSON = JSON.stringify(detail);
                        Factory.save(saveUrl, detailJSON,
                                function (data) {
                                    Notification.success(data.indexNo + " - " + "Item Save Successfully");
                                    $scope.model.itemList.push(data);
                                    $scope.ui.reset();
                                },
                                function (data) {
                                    Notification.error(data.message);
                                }
                        );
                    }
                };
                
                $scope.validate = function () {
                    if (!$scope.model.item.name) {
                        Notification.error("Please Input Item Name !!!");
                        return false;
                    } else if (!$scope.model.item.unitPrice) {
                        Notification.error("Please Input Item Unite Price!!!");
                        return false;
                    } else if (!$scope.model.item.description) {
                        Notification.error("Please Input Item Descripton !!!");
                        return false;
                    } else if ($scope.model.item.name && $scope.model.item.unitPrice && $scope.model.item.description) {
                        return true;
                    }
                };


                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.itemList = data;
                    });


                };
                $scope.ui.init();
            });
}());