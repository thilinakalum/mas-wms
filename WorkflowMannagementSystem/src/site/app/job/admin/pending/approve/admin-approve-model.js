(function () {
    var factory = function (AdminHomeJobService, AdminHomeModelFactory, $q, $filter) {

        function AdminModel() {
            this.constructor();
        };

        AdminModel.prototype = {
            adminJobDetailData: {},
            adminJobItemData: {},
            selectedJob: {},
            selectedJobIndex : null,
            newJobList: [],
            categoryList: [],
            employeeList: [],
            jobDetailList: [],
            jobItemList: [],
            itemList: [],
            totalItemPrice:null,
 
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
                        });
                AdminHomeJobService.getAllItems()
                        .success(function (data) {
                            that.itemList = data;
                        });
            },
            getSelectedJobDetailItem: function (indexNo) {
                var that = this;
                AdminHomeJobService.getSelectedJobDetailItem(indexNo)
                        .success(function (data) {
                            that.jobItemList = data;
                            that.totalItemPrice=that.setTotalItemPrice();
                        });
            },
            setTotalItemPrice: function () {
                var total =0;
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
                console.log(that.adminJobItemData);
                AdminHomeJobService.saveJobItems(JSON.stringify(that.adminJobItemData))
                        .success(function (data) {
                            that.jobItemList.push(data);
                            that.totalItemPrice += data.unitPrice;
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
                AdminHomeJobService.saveJobs(JSON.stringify(that.selectedJob))
                        .success(function (data) {
                            that.newJobList.splice(that.selectedJobIndex , 1);
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

