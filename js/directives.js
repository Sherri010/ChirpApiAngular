app.directive("chirpBird", function() {
    return {
        template: function() {
            var randomInt = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

            return "<img class='img-responsive' src='img/birds/bird" + randomInt + ".png' />";
        }
    }
});
