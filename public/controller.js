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

myApp.controller('loginController', function($scope, $http, $route, $routeParams){
    $scope.locRange = 1;

    $scope.checkCat = function() {
        $http.get('/api/getCats').then(res => {
            const catData = res.data;

            let mappedData = catData.map((cat) => {
                return cat.category
            });
            
            let filteredData = mappedData.filter((v, i) => mappedData.indexOf(v) === i);

            $scope.filteredCatData = filteredData;
        });
    }

    $scope.catSelected = function(){
        const cat = $routeParams.cat;
        const range = $routeParams.range;

        $http.get('/api/getSelectedCat/' + cat).then(res => {
            $scope.catSelect = res.data;
        });
    }

    $scope.submitOrder = function(menu, name){
        const data = {
            menu: menu,
            name: name
        }
        // console.log(menu, name);
        $http.post('/api/user/ordered/', data).then(res => {
            window.location.href = "#/user/orderHistory"
        });
    }

    $scope.getOrders = function(){
        $http.get('/api/getOrder').then(res => {
            $scope.gotOrderData = res.data;
        })
    }
});