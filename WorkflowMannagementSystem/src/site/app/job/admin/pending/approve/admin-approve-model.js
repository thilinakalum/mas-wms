(function () {
    var factory = function (AdminHomeJobService, AdminHomeModelFactory, $q, $filter,$rootScope) {

        function AdminModel() {
            this.constructor();
        }
        ;

        AdminModel.prototype = {
            adminJobDetailData: {},
            adminJobItemData: {},
            selectedJob: {},
            selectedJobIndex: null,
            newJobList: [],
            categoryList: [],
            employeeList: [],
            userList: [],
            departmentList: [],
            jobDetailList: [],
            jobItemList: [],
            itemList: [],
            transactionList: [],
            totalItemPrice: null,

            constructor: function () {
                var that = this;
                this.adminJobDetailData = AdminHomeModelFactory.newJobDetailData();
                this.adminJobItemData = AdminHomeModelFactory.newJobItemData();

                AdminHomeJobService.getAllApproveJobs(1)
                        .success(function (data) {
                            that.newJobList = data;
                        });
                AdminHomeJobService.getAllCategory()
                        .success(function (data) {
                            that.categoryList = data;
                        });
                AdminHomeJobService.getAllEmployee()
                        .success(function (data) {
                            that.employeeList = data;
                    console.log(data);
                        });
                AdminHomeJobService.getAllItems()
                        .success(function (data) {
                            that.itemList = data;
                        });
                AdminHomeJobService.getAllUsers()
                        .success(function (data) {
                            that.userList = data;
                        });
                AdminHomeJobService.getAllDepartments()
                        .success(function (data) {
                            that.departmentList = data;
                        });
            },
            jobTransactions: function (indexNo) {
                var that = this;
                AdminHomeJobService.findAllTransaction(indexNo)
                        .success(function (data) {
                            that.transactionList = data;
                        })
                        .error(function () {

                        });
            },
            getSelectedJobDetailItem: function (indexNo) {
                var that = this;
                AdminHomeJobService.getSelectedJobDetailItem(indexNo)
                        .success(function (data) {
                            that.jobItemList = data;
                            that.totalItemPrice = that.setTotalItemPrice();
                        });
            },
            setTotalItemPrice: function () {
                var total = 0;
                angular.forEach(this.jobItemList, function (value) {
                    total += value.totalPrice;
                    return;
                });
                return total;
            },
            addJobItems: function () {
                var that = this;
                that.jobItemList.push(that.adminJobItemData);
            },
            saveJobItems: function () {
                var that = this;
                var defer = $q.defer();
                that.adminJobItemData.jobDetail = that.adminJobDetailData.indexNo;
                that.adminJobItemData.user = $rootScope.globals.currentUser.indexNo;
                AdminHomeJobService.saveJobItems(JSON.stringify(that.adminJobItemData))
                        .success(function (data) {
                            that.jobItemList.push(data);
                            that.totalItemPrice += data.totalPrice;
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            finishAssign: function () {
                var that = this;
                var defer = $q.defer();
                that.selectedJob.status = 'ASSIGN';
                that.selectedJob.user = $rootScope.globals.currentUser.indexNo;
                that.selectedJob.branch = $rootScope.globals.currentUser.branch;
                AdminHomeJobService.saveJobs(JSON.stringify(that.selectedJob))
                        .success(function (data) {
                            that.newJobList.splice(that.selectedJobIndex, 1);
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            getAllJobDetail: function (jobNo) {
                var that = this;
                AdminHomeJobService.getAllJobDetail(jobNo)
                        .success(function (data) {
                            that.jobDetailList = data;
                        });
            },
            deleteJobDetail: function (indexNo) {
                var defer = $q.defer();
                AdminHomeJobService.deleteJobDetail(indexNo)
                        .success(function (data) {
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            employeeLable: function (indexNo) {
                var employee;
                angular.forEach(this.employeeList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        employee = value.name;
                        return;
                    }
                });
                return employee;
            },
            itemLable: function (indexNo) {
                var item;
                angular.forEach(this.itemList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.name;
                        return;
                    }
                });
                return item;
            },
            onSelect: function (indexNo) {
                var that = this;
                angular.forEach(this.itemList, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        that.adminJobItemData.unitPrice = value.unitPrice;
                        return;
                    }
                });
            },
            saveJobDetail: function () {
                var that = this;
                var defer = $q.defer();
                that.adminJobDetailData.status = "NEW";
                that.adminJobDetailData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                that.adminJobDetailData.user = $rootScope.globals.currentUser.indexNo;
                console.log(that.adminJobDetailData);
                AdminHomeJobService.saveJobDetail(JSON.stringify(that.adminJobDetailData))
                        .success(function (data) {
                            that.jobDetailList.push(data);
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            }
        };
        return AdminModel;
    };
    angular.module("AppModule")
            .factory("AdminHomeModel", factory);
}());

