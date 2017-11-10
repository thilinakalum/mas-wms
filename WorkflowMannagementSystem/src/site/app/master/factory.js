(function () {
    angular.module("AppModule")
            .factory("Factory", function ($http, systemConfig) {
                var factory = {};
                factory.findAll = function (findAllUrl, callback) {
                    var url = systemConfig.apiUrl + findAllUrl;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                factory.save = function (saveUrl, data, callback) {
                    var url = systemConfig.apiUrl + saveUrl;
                    $http.post(url, data)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                factory.findOne = function (findAllUrl, callback) {
                    var url = systemConfig.apiUrl + findAllUrl;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory;
            });
}());