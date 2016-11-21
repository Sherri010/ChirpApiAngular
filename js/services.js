app.service("AuthService", function($location) {
    this.getToken = function() {
        return JSON.parse(sessionStorage.getItem("user"))["auth_token"];
    }

    this.getUser = function() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    this.isAuthenticated = function() {
        if (this.getUser()) {
            return;
        } else {
            $location.path("/login");
        }
    }
});
