(function () {
    var service = function ($http, systemConfig) {
        this.saveJobs = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/wms/job/save-jobs" , data);
        };
        this.getAllPendingJobsByDepartment = function (logingUser) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job/get-all-jobs-by-department-and-new/" + logingUser);
        };
        this.getAllCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/category/find-all-category" );
        };
        this.findAllTransaction = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-transaction/get-all-job-transaction/" +indexNo);
        };
    };
    angular.module("AppModule")
            .service("DepartmentHomeJobService", service);
}());