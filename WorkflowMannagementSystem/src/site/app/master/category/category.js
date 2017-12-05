(function () {
    angular.module("AppModule")
            .controller("CategoryController", function ($scope, Factory, Notification) {
                $scope.model = {};
                $scope.ui = {};
                $scope.model.categoryList = [];
                $scope.model.category = {};

                var findAllUrl = "/api/wms/master/category/find-all-category";
                var saveUrl = "/api/wms/master/category/save-category";
                var deleteUrl = "/api/wms/master/category/delete-category/";

                $scope.ui.reset = function () {
                    $scope.model.category = {};
                };

                $scope.ui.edit = function (category, index) {
                    $scope.model.categoryList.splice(index, 1);
                    $scope.model.category = category;
                };
                $scope.ui.delete = function (indexNo, index) {
                    Factory.delete(deleteUrl, indexNo,
                            function (data) {
                                Notification.success("Category Delete Successfully");
                                $scope.model.categoryList.splice(index, 1);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };
                $scope.ui.save = function () {
                    if ($scope.validate()) {
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
                    }
                };

                $scope.validate = function () {
                    if (!$scope.model.category.name) {
                        Notification.error("Please Input Category Name !!!");
                        return false;
                    } else if (!$scope.model.category.description) {
                        Notification.error("Please Input Category Descripton !!!");
                        return false;
                    } else if ($scope.model.category.name && $scope.model.category.description) {
                        return true;
                    }
                };

                $scope.ui.init = function () {
                    Factory.findAll(findAllUrl, function (data) {
                        $scope.model.categoryList = data;
                    });

                };
                $scope.ui.init();
            });
}());