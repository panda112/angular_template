(function(app) {
    app.controller("welcomeCtrl", ["$scope", function($scope) {
        $scope.eg = "miao";

        $scope.testss = function() {
            alert("welcom");
        };

        $scope.haha = "";

        $scope.$watch("haha", function(newVal, oldVal){
        	alert(newVal);
        });
    }]);
})(Chan);
