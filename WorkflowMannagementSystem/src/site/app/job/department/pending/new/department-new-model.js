(function () {
    var factory = function (DepartmentHomeJobService, DepartmentHomeJobModelFactory, $q, $filter) {
        
        function DepartmentModel() {
            this.constructor();
        };

        DepartmentModel.prototype = {
            depatmentJobData: {},
            pendingJobList: [],
            categoryList: [],
            transactionList: [],

            constructor: function () {
                var that = this;
                this.depatmentJobData = DepartmentHomeJobModelFactory.newJobData();

                DepartmentHomeJobService.getAllPendingJobsByDepartment(1)
                        .success(function (data) {
                            that.pendingJobList = data;
                        });
                DepartmentHomeJobService.getAllCategory()
                        .success(function (data) {
                            that.categoryList = data;
                        });
            },
            jobTransactions : function (indexNo){
                var that = this;
                DepartmentHomeJobService.findAllTransaction(indexNo)
                        .success(function (data) {
                           that.transactionList= data;
                        })
                        .error(function () {
                            
                        });
            },
            saveNewJob: function () {
                var that = this;
                var defer = $q.defer();
                that.depatmentJobData.user = 1;
                that.depatmentJobData.status = "NEW";
                that.depatmentJobData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                DepartmentHomeJobService.saveJobs(JSON.stringify(that.depatmentJobData))
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
            .factory("DepartmentHomeModel", factory);
}());

