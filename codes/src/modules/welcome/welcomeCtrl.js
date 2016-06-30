(function(app) {
    app.controller("welcomeCtrl", ["$scope", function($scope) {
        $scope.eg = "miao";

        $scope.testss = function() {
            alert("welcom");
        };

        $scope.haha = "";

        $scope.$watch("haha", function(newVal, oldVal) {
            alert(newVal);
        });


        $scope.player = function(){
            var audio = document.getElementById("audio");

            return{
                play: function(){
                    audio.play();
                },
                pause: function(){
                    audio.pause();
                },
                louder: function(){
                    audio.volume += 0.1;
                },
                lower: function(){
                    audio.volume -= 0.1;
                },
                endTime: audio.seekable.end()
            };
        };
    }]);
})(chan);
