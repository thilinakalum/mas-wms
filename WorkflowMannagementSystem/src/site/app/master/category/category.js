(function () {
    angular.module("AppModule")
            .controller("CategoryController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.categoryList = [];

                var findAllUrl = "/api/wms/master/category/find-all-category";
                var saveUrl = "/api/wms/master/category/save-category";

                $scope.ui.reset = function () {
                    $scope.model.category = {};
                };

                $scope.ui.save = function () {
                    var detail = $scope.model.category;
                    var detailJSON = JSON.stringify(detail);

                    Factory.save(saveUrl, detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Category Save Successfully");
                                $scope.model.categoryList.push(data);
                                $scope.ui.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.categoryList = data;
                    });

                };
                $scope.ui.init();
            });
}());