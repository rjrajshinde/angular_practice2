const app = angular.module('controller',['ngSanitize','ui.bootstrap','ui.bootstrap.modal']);

app.controller('bodyController', ['$scope', '$http', '$uibModal',($scope, $http, $uibModal)=>{
    //employees variable used to handle the data for controller
    $scope.employees = [];
    //init function to start the controller
    $scope.init = function(){
        $scope.display();
    }
    //function for display the data on index page in table
    $scope.display = ()=>{
        $http.get('/display').then((res)=>{
            $scope.employees = res.data;
        }).catch((err)=>{
            console.log(err);
        })
    };
    //function for delete the data from the index page and database alse
    $scope.delete = (userId, index)=>{
        $http.delete('/delete/'+userId).then((res)=>{
            $scope.employees.splice(index, 1);
        }).catch((err)=>{
            console.log(err);
        })
    };
    //function for open the modal for when we click on the create and edit button
    $scope.openModal = (mode, data, index)=>{
        let modalData = {};

        if(mode == 'edit'){
            modalData = data;
            modalData.index = index;
        }
        modalData.mode = mode;
        $scope.modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modal.html',
            controller : "modalController",
            scope : $scope, 
            backdrop : false,
            size : "lg",
            windowClass : "show",
            resolve : {
                record: function(){
                    return modalData;
                },
            },
        })
    }
}])

//Controller for the modal.ejs file(form)
app.controller('modalController',['$scope', '$http', "record",($scope, $http, record)=>{
    //this handles the data for modal
    $scope.newEmployee  = {};
    //defined function init to initialize the controller
    function init(){
        $scope.newEmployee = record;
    }
    //calling the init function
    init();
    //function to create the data of employees and save into database by accessing routes on the modal
    $scope.create = ()=>{
        $http.post('/create', $scope.newEmployee).then((res)=>{
            $scope.employees.push(res.data);
            $scope.close()
        }).catch((err)=>{
            console.log(err);
        })
    };
    //function to edit the data of employees and save into database by accessing routes on the modal
    $scope.edit = function(){
        $http.put('/edit/'+$scope.newEmployee._id, $scope.newEmployee).then((res)=>{
            $scope.employees[$scope.newEmployee.index] = res.data;
            $scope.close();
        }).catch((err)=>{
            console.log(err);
        })
    }

    $scope.close = ()=>{$scope.modalInstance.close()};
}])





















