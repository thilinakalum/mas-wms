(function () {
    var service = function ($http, systemConfig) {
        this.saveJobs = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/wms/job/save-jobs", data);
        };
        this.getAllApproveJobs = function (logingUser) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job/get-all-jobs-by-admin-and-status/"+ 'APPROVE');
        };
        this.getAllNewJobs = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/job/get-all-new-jobs");
        };
        this.getAllCategory = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/category/find-all-category");
        };
        this.getAllEmployee = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/employee/find-all-employee-by-type");
        };
        this.getAllJobDetail = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-detail/find-all-job-details-by-job/" + indexNo);
        };
        this.saveJobDetail = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/wms/job-detail/save-job-detail" , data);
        };
        this.saveJobItems = function (data) {
            return $http.post(systemConfig.apiUrl + "/api/wms/job-items/save-job-items" , data);
        };
        this.getAllItems = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/item/find-all-item");
        };
        this.getSelectedJobDetailItem = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-items/get-all-item-by-job-detail/" + indexNo);
        };
        this.deleteJobDetail = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-detail/delete-job-detail/" + indexNo);
        };
        this.findAllTransaction = function (indexNo) {
            return $http.get(systemConfig.apiUrl + "/api/wms/job-transaction/get-all-job-transaction/" +indexNo);
        };
        this.getAllUsers = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/user/find-all-user");
        };
        this.getAllDepartments = function () {
            return $http.get(systemConfig.apiUrl + "/api/wms/master/department/find-all-department");
        };
    };
    angular.module("AppModule")
            .service("AdminHomeJobService", service);
}());