(function () {
    angular.module("AppModule")
            .factory("AdminNewJobJobModelFactory", function () {
                var factory = {};
                factory.newJobData = function () {
                    var data = {
                        "indexNo": null,
                        "category": null,
                        "date": null,
                        "requiredDate": null,
                        "requiredTime": null,
                        "clientDescription": null,
                        "status": null,
                        "jobDetailList": null,
                        "user": null
                    };
                    return data;
                };

                return factory;
            });
}());