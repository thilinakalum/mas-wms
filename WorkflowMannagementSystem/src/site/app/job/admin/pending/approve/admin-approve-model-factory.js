(function () {
    angular.module("AppModule")
            .factory("AdminHomeModelFactory", function () {
                var factory = {};
                factory.newJobDetailData = function () {
                    var data = {
                        "indexNo": null,
                        "requiredDate": null,
                        "requiredTime": null,
                        "deadlineDate": null,
                        "deadlineTime": null,
                        "adminDescription": null,
                        "status": null,
                        "date": null,
                        "job": null,
                        "employee": null,
                        "jobItemsList": []

                    };
                    return data;
                };
                factory.newJobItemData = function () {
                    var data = {
                        "indexNo": null,
                        "itemName": null,
                        "qty": null,
                        "unitPrice": null,
                        "totalPrice": null
                    };
                    return data;
                };
                return factory;
            });
}());