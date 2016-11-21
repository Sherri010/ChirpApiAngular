var app = angular.module("Chirp", ["ngRoute"]);

var baseUrl = "http://localhost:3000";

app.config(function($routeProvider) {
    $routeProvider
        .when("/signup", {
            templateUrl: "templates/signup.html",
            controller: "SignupController",
            controllerAs: "signupCtrl"
        })
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "LoginController",
            controllerAs: "loginCtrl"
        })
        .when("/chirps", {
            templateUrl: "templates/chirps.html",
            controller: "ChirpsController",
            controllerAs: "chirpsCtrl"
        })
        .when("/chirps/:id", {
            templateUrl: "templates/chirp-edit.html",
            controller: "ChirpsEditController",
            controllerAs: "chirpsEditCtrl"
        })
        .otherwise({
            redirectTo: "/chirps"
        });
});
