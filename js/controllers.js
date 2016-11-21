app.controller("ChirpsController", ChirpsController);
app.controller("ChirpsEditController", ChirpsEditController);
app.controller("SignupController", SignupController);
app.controller("LoginController", LoginController);

function ChirpsController($http, AuthService) {
    AuthService.isAuthenticated();

    var vm = this;

    function getChirps() {
        $http({
            method: "GET",
            url: baseUrl + "/chirps",
            headers: {
                "Authorization": "Token token=" + AuthService.getToken()
            }
        }).success(function(chirps) {
            vm.chirps = chirps;
        }).error(function() {
            alert("Error getting chirps!");
        });
    }

    getChirps();

    vm.submitChirp = function(event) {
        event.preventDefault();

        $http({
            method: "POST",
            url: baseUrl + "/chirps",
            data: {
                chirp: vm.chirp
            },
            headers: {
                "Authorization": "Token token=" + AuthService.getToken()
            }
        }).success(function() {
            getChirps();

            vm.chirp = {};

            $("#chirp-wrapper").slideUp();
        }).error(function() {
            alert("Error saving chirp!");
        });
    }
}

function ChirpsEditController($http, $routeParams, $location, AuthService) {
    AuthService.isAuthenticated();
    
    var vm = this;

    $http({
        method: "GET",
        url: baseUrl + "/chirps/" + $routeParams.id,
        headers: {
            "Authorization": "Token token=" + AuthService.getToken()
        }
    }).success(function(chirp) {
        vm.chirp = chirp;
    }).error(function(res, status) {
        alert("Error getting chirp!");
    });

    vm.deleteChirp = function() {
        $http({
            method: "DELETE",
            url: baseUrl + "/chirps/" + $routeParams.id,
            headers: {
                "Authorization": "Token token=" + AuthService.getToken()
            }
        }).success(function() {
            $location.path("/chirps");
        }).error(function() {
            alert("Error deleting chirp!");
        });
    }

    vm.submitUpdates = function() {
        $http({
            method: "PUT",
            url: baseUrl + "/chirps/" + $routeParams.id,
            headers: {
                "Authorization": "Token token=" + AuthService.getToken()
            },
            data: {
                chirp: vm.chirp
            }
        }).success(function() {
            $location.path("/chirps");
        }).error(function() {
            alert("Error deleting chirp!");
        });
    }
}

function SignupController($http, $location) {
    var vm = this;

    vm.signupUser = function(event) {
        event.preventDefault();

        $http({
            method: "POST",
            url: baseUrl + "/users.json",
            data: {
                user: vm.user
            }
        }).success(function() {
            $location.path("/login");
        }).error(function() {
            alert("There was an error during signup");
        });
    }
}

function LoginController($http, $location) {
    var vm = this;

    vm.loginUser = function(event) {
        event.preventDefault();

        $http({
            method: "POST",
            url: baseUrl + "/users/sign_in.json",
            data: {
                user: vm.user
            }
        }).success(function(user) {
            sessionStorage.setItem("user", JSON.stringify(user));

            $location.path("/chirps");
        }).error(function(response, status) {
            alert("Error logging in!");
        });
    }
}
