(function(angular) {
	var myRouteModule = angular.module('myRoute', []).provider('myRoute', RouteProvider);
	
	function RouteProvider() {
		var routes = {}, histories = [];
		
		this.when = function(path, opt) {
			routes[path] = angular.extend(angular.copy(opt || {}), {redirectTo: path});
			if (path) {
				var redirectPath = (path[path.length - 1] == '/') ? path.substr(0, path.length - 1) : path + '/';
				routes[redirectPath] = {redirectTo: redirectPath};
			}
			return this;
		};
		this.otherwise = function(opt) {
			if (typeof opt === 'string')
				opt = {redirectTo: opt};
			this.when(null, opt);
			return this;
		};
		this.$get = [
			'$rootScope',
			'$q',
			'$injector',
			'$templateRequest',
			'$sce',
			function($rootScope, $q, $injector, $templateRequest, $sce) {
				var route = {
					path: function(p) {
						if (p) {
							var opt = routes[p], k = opt ? opt.redirectTo : null;
							opt = routes[k];
							histories.push(opt.redirectTo);
							commit(opt);
						} else if(histories.length > 0)
							return histories[histories.length - 1];
					},
					back: function() {
						if (histories.length > 1) {
							histories.pop();
							commit(routes[histories[histories.length - 1]]);
						}
					},
					$$clear: function() {
						histories = [];
					}
				};
				
				function commit(next) {
					var last = route.current;
					route.current = next;
					$q.when(next)
					.then(function() {
						if (next) {
							 var locals = angular.extend({}, next.resolve), templateUrl, template;
							 angular.forEach(locals, function(value, key) {
								locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
							});
							templateUrl = next.templateUrl;
							if (angular.isFunction(templateUrl)) templateUrl = templateUrl();
							templateUrl = $sce.getTrustedResourceUrl(templateUrl)
							if (angular.isDefined(templateUrl)) {
								next.loadedTemplateUrl = templateUrl;
								template = $templateRequest(templateUrl);
								 if (angular.isDefined(template))
									locals['$template'] = template;
							}
							return $q.all(locals);
						}
					})
					.then(function(locals) {
						if (next == route.current) {
							if (next) next.locals = locals;
							$rootScope.$broadcast('$routeChangeSuccess', next, last);
						}
					}, function(error) {
						 if (next == route.current)
							$rootScope.$broadcast('$routeChangeError', next, last, error);
					});
				}
				
				return route;
			}
		];
	}
	
	myRouteModule.directive('myView', myViewFactory);
	myRouteModule.directive('myView', myViewFillContentFactory);
	
	myViewFactory.$inject = ['myRoute', '$anchorScroll', '$animate'];
	function myViewFactory(myRoute, $anchorScroll, $animate) {
		return {
			restrict: 'ECA',
			terminal: true,
			priority: 400,
			transclude: 'element',
			link: function(scope, $element, attr, ctrl, $transclude) {
				var currentScope,
				currentElement,
				previousLeaveAnimation,
				autoScrollExp = attr.autoscroll,
				onloadExp = attr.onload || '';

				scope.$on('$routeChangeSuccess', update);
				update();

				function cleanupLastView() {
					if (previousLeaveAnimation) {
						$animate.cancel(previousLeaveAnimation);
						previousLeaveAnimation = null;
					}

					if (currentScope) {
						currentScope.$destroy();
						currentScope = null;
					}
					if (currentElement) {
						previousLeaveAnimation = $animate.leave(currentElement);
						previousLeaveAnimation.then(function() {
							previousLeaveAnimation = null;
						});
						currentElement = null;
					}
				}

				function update() {
					var locals = myRoute.current && myRoute.current.locals,
					template = locals && locals.$template;

					if (angular.isDefined(template)) {
						var newScope = scope.$new(),
						current = myRoute.current,
						clone = $transclude(newScope, function(clone) {
							$animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
								if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
									$anchorScroll();
								}
							});
							cleanupLastView();
						});
						currentElement = clone;
						currentScope = current.scope = newScope;
						currentScope.$emit('$viewContentLoaded');
						currentScope.$eval(onloadExp);
					} else {
						cleanupLastView();
					}
				}
			}
		};
	}
	
	myViewFillContentFactory.$inject = ['$compile', '$controller', 'myRoute'];
	function myViewFillContentFactory($compile, $controller, myRoute) {
		
		return {
			restrict: 'ECA',
			priority: -400,
			link: function(scope, $element) {
				var current = myRoute.current,
				locals = current.locals;
				$element.html(locals.$template);
				var link = $compile($element.contents());

				if (current.controller) {
					locals.$scope = scope;
					var controller = $controller(current.controller, locals);
					if (current.controllerAs) {
						scope[current.controllerAs] = controller;
					}
					$element.data('$ngControllerController', controller);
					$element.children().data('$ngControllerController', controller);
				}

				link(scope);
			}
		};
	}
})(window.angular);