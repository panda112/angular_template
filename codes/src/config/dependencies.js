/** 
  * 添加项目依赖（每个页面都会加载下列模块）
*/
"use strict";
var Chan = angular.module("Chan", [
	"ui.router",
	"oc.lazyLoad"
	// 'ngStorage',
	// 'ngSanitize',
	// 'ngTouch',
	// 'ui.router',
	// 'ui.bootstrap',
	// 'oc.lazyLoad',
	// 'cfp.loadingBar',
	// 'ncy-angular-breadcrumb',
	// 'duScroll',
	// 'pascalprecht.translate',
]);