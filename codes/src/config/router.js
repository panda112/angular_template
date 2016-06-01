/**
 * Created by Chan on 2016/05/19
 */

/**
 * 路由配置
 */
chan.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "$ocLazyLoadProvider", "JS_REQUIRES",
    function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {
        chan.controller = $controllerProvider.register;
        chan.directive = $compileProvider.directive;
        chan.filter = $filterProvider.register;
        chan.factory = $provide.factory;
        chan.service = $provide.service;
        chan.constant = $provide.constant;
        chan.value = $provide.value;

        // LAZY MODULES
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

        //设置url对应的页面及页面对应的状态名称
        $stateProvider
            .state("welcome", { //跳转时，ui-sref的属性值，ui-sref作用如同href，如：ui-sref="state1.list"
                url: "/welcome", //url值
                templateUrl: getTemplateUrl("welcome"), //模板路径
                resolve: loadSequence("welcomeCtrl")
            })
            .state("form_validation", {
                url: "/form_validation",
                templateUrl: getTemplateUrl("form_validation"),
                resolve: loadSequence("formValidationCtrl")
            })
            .state('state1', { //跳转时，ui-sref的属性值，ui-sref作用如同href，如：ui-sref="state1.list"
                url: "/state1", //url值
                templateUrl: "partials/state1.html" //模板路径
            })
            .state('state1.list', {
                url: "/list",
                templateUrl: "partials/state1.list.html",
                controller: function($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })
            .state('state4', {
                url: "/state3",
                templateUrl: "partials/state2.html"
            })
            .state('state2.list', {
                url: "/list",
                templateUrl: "partials/state2.list.html",
                controller: function($scope) {
                    $scope.things = ["A", "Set", "Of", "Things"];
                }
            });

        //当url不存在时，跳转到welcome
        $urlRouterProvider.otherwise("/welcome");

        function getTemplateUrl(fileName){
            var templateUrl = "/modules/" + fileName + "/views/" + fileName + ".html";
            return templateUrl;
        }

        // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ["$ocLazyLoad", "$q",
                    function($ocLL, $q) {
                        var promise = $q.when(1);

                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }

                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == "function") {
                                return promise.then(_arg);
                            } else {
                                return promise.then(function() {
                                    var nowLoad = requiredData(_arg);

                                    if (!nowLoad) {
                                        return $.error("Route resolve: Bad resource name [" + _arg + "]");
                                    }

                                    return $ocLL.load(nowLoad);
                                });
                            }
                        }

                        function requiredData(name) {
                            if (jsRequires.modules) {
                                for (var m in jsRequires.modules) {
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name) {
                                        return jsRequires.modules[m];
                                    }
                                }
                            }

                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }
                ]
            };
        }
    }
]);
