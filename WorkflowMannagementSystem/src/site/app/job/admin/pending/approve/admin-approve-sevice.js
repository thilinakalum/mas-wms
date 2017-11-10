(function () {
    var service = function ($http, systemConfig) {
        this.saveJobs = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/wms/job/save-jobs", data);
        };
        this.getAllApproveJobs = function (logingUser) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job/get-all-jobs-by-department-and-approve/" + logingUser);
        };
        this.getAllNewJobs = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/job/get-all-new-jobs");
        };
        this.getAllCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/category/find-all-category");
        };
        this.getAllEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/employee/find-all-employee");
        };
        this.getAllJobDetail = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-detail/find-all-job-details-by-job/" + indexNo);
        };
        this.saveJobDetail = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/wms/job-detail/save-job-detail" , data);
        };
        this.saveJobItems = function (data) {
            console.log(data);
            return $http.post(systemConfig.apiUrl + "/api/wms/job-items/save-job-items" , data);
        };
        this.getAllItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/item/find-all-item");
        };
        this.getSelectedJobDetailItem = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-items/get-all-item-by-job-detail/" + indexNo);
        };
    };
    angular.module("AppModule")
            .service("AdminHomeJobService", service);
}());