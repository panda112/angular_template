/** 
 * 添加项目依赖（每个页面都会加载下列模块）
 */
"use strict";
var chan = angular.module("chan", [
    "ui.router",
    "oc.lazyLoad"
    // 'ngStorage',
    // 'ngSanitize',
    // 'ngTouch',
    // 'ui.router',
    // 'ui.bootstrap',
    // 'cfp.loadingBar',
    // 'ncy-angular-breadcrumb',
    // 'duScroll',
    // 'pascalprecht.translate',
]);

