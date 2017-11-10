(function () {
    angular.module("AppModule")
            .controller("ItemController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.itemList = [];

                var findAllUrl = "/api/wms/master/item/find-all-item";
                var saveUrl = "/api/wms/master/item/save-item";

                $scope.ui.reset = function () {
                    $scope.model.item = {};
                };

                $scope.ui.save = function () {
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
                };
                

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.itemList = data;
                    });
                    

                };
                $scope.ui.init();
            });
}());