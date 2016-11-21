app.service("AuthService", function() {
    this.getToken = function() {
        return JSON.parse(sessionStorage.getItem("user"))["auth_token"];
    }

    this.getUser = function() {
        return JSON.parse(sessionStorage.getItem("user"));
    }
});
