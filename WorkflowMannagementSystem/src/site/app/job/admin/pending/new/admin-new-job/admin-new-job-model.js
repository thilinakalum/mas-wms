(function () {
    var factory = function (AdminNewJobService, AdminNewJobJobModelFactory, $q, $filter, $rootScope) {

        function DepartmentModel() {
            this.constructor();
        }
        ;

        DepartmentModel.prototype = {
            depatmentJobData: {},
            pendingJobList: [],
            categoryList: [],
            transactionList: [],
            userList: [],
            departmentList: [],

            constructor: function () {
                var that = this;
                this.depatmentJobData = AdminNewJobJobModelFactory.newJobData();

                AdminNewJobService.getAllPendingJobsByDepartmentAndStatus($rootScope.globals.currentUser.indexNo)
                        .success(function (data) {
                            that.pendingJobList = data;
                        });
                AdminNewJobService.getAllCategory()
                        .success(function (data) {
                            that.categoryList = data;
                        });
                AdminNewJobService.getAllUsers()
                        .success(function (data) {
                            that.userList = data;
                        });
                AdminNewJobService.getAllDepartments()
                        .success(function (data) {
                            that.departmentList = data;
                        });
            },
            jobTransactions: function (indexNo) {
                var that = this;
                AdminNewJobService.findAllTransaction(indexNo)
                        .success(function (data) {
                            that.transactionList = data;
                        })
                        .error(function () {

                        });
            },
            saveNewJob: function () {
                var that = this;
                var defer = $q.defer();
                that.depatmentJobData.status = "NEW";
                that.depatmentJobData.user = $rootScope.globals.currentUser.indexNo;
                that.depatmentJobData.branch = $rootScope.globals.currentUser.branch;
                that.depatmentJobData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                AdminNewJobService.saveJobs(JSON.stringify(that.depatmentJobData))
                        .success(function (data) {
                            that.pendingJobList.push(data);
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            categoryLable: function (indexNo) {
                var category;
                angular.forEach(this.categoryList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        category = value.name;
                        return;
                    }
                });
                return category;
            }
        };
        return DepartmentModel;
    };
    angular.module("AppModule")
            .factory("AdminNewJobModel", factory);
}());

