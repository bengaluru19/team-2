myApp.controller('appController', function($scope, $http, $route){
    

    $scope.errMatch = false;

    $scope.register = function(){
        $scope.registerData = {
            fname: $scope.fname,
            lname: $scope.lname,
            dob: $scope.dob,
            location: $scope.location,
            phno: $scope.phno,
            email: $scope.email,
            pass1: $scope.pass1,
            pass2: $scope.pass2,
            gender: $scope.gender,
        };

        $http.post('/api/register', $scope.registerData).then(res => {
            if(res.data === "pass"){
                $scope.errMatch = true;
            }
            else{
                window.location.href = "/#/";
            }
        });
    }
});
