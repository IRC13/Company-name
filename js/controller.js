angular.module('CompanyApp', ['ui.bootstrap'])
    .controller('CompanyController', ['$scope', '$uibModal',
        function($scope, $uibModal) {
            $scope.companies = [];
            $scope.addCompany = addCompany;
            $scope.editCompany = editCompany;
            $scope.removeCompany = removeCompany;
            $scope.addSubcompany = addSubcompany;
            var modalInstance;

            for (var i = 0; i < 10; i++){
                $scope.companies.push(new Company('Company_'+i, Math.random()*(i+1)*1000, new Company('Subcompany_'+1, Math.random()*i*1000)))
            }
            function Company (name, earnings, subcompany) {
                this.name = name;
                this.earnings = earnings;
                if(subcompany){
                    this.subcompanies = [];
                    this.subcompanies.push(subcompany)
                }
                return this;
            }

            function addCompany() {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/companyModal/companyModal.html',
                    controller: 'CompanyModalCtrl',
                    resolve: {
                        company: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function (newCompany) {
                    $scope.companies.push(newCompany);
                });
            }

            function editCompany(company) {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/companyModal/companyModal.html',
                    controller: 'CompanyModalCtrl',
                    resolve: {
                        company: function () {
                            return company;
                        }
                    }
                });

                modalInstance.result.then(function (editedCompany) {
                    angular.extend(company, editedCompany);
                }, function () {

                });
            }

            function removeCompany(index, list){
                if(angular.isDefined(list)){
                    list.splice(index, 1)
                } else {
                    $scope.companies.splice(index, 1)
                }
            }

            function addSubcompany(company) {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/subcompanyModal/subcompanyModal.html',
                    controller: 'SubcompanyModalCtrl',
                    resolve: {
                        company: function () {
                            return company;
                        }
                    }
                });

                modalInstance.result.then(function (newSubcompany) {
                    if(angular.isUndefined(company.subcompanies)) {
                        company.subcompanies = [];
                    }
                    company.subcompanies.push(newSubcompany);
                });
            }



    }])
    .controller('CompanyModalCtrl', ['$scope', '$uibModalInstance', 'company',
        function ($scope, $uibModalInstance, company) {
            if(company){
                //edit company
                $scope.originCompany = company;
                $scope.company = angular.copy(company);
            } else {
                $scope.company = {};
            }
            $scope.originCompany = company;
            $scope.company = angular.copy(company);

            $scope.ok = function () {
                $uibModalInstance.close($scope.company);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ])
    .controller('SubcompanyModalCtrl', ['$scope', '$uibModalInstance', 'company',
        function ($scope, $uibModalInstance, company) {

            $scope.company = angular.copy(company);
            $scope.newCompany = {};

            $scope.ok = function () {
                $uibModalInstance.close($scope.newCompany);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);