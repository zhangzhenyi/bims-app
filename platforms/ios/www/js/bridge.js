(function(c) {
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.image.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.scroller.ios.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.scroller.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.frame.ios.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.frame.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.icons.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.animation.css" }));
	$.getScript("lib/mobiscroll-master/js/mobiscroll.core.js");
	$.getScript("lib/mobiscroll-master/js/mobiscroll.frame.js");
	$.getScript("lib/mobiscroll-master/js/mobiscroll.scroller.js");
	$.getScript("lib/mobiscroll-master/js/mobiscroll.util.datetime.js");
	$.getScript("lib/mobiscroll-master/js/mobiscroll.datetimebase.js");
	$.getScript("lib/mobiscroll-master/js/mobiscroll.datetime.js");
	$.getScript("lib/mobiscroll-master/js/mobiscroll.frame.ios.js");
	$.getScript("lib/mobiscroll-master/js/i18n/mobiscroll.i18n.zh.js");
})($(document.head));

/*列均分*/
function thumbnailist(thumbblcok,thumbul){
	var listwidth = $(thumbblcok).width();
	var listliamargin = $(thumbul+" li div").css("marginRight");
	$(thumbul).css("width",listwidth+parseInt(listliamargin));
	$(window).resize(function(){thumbnailist(thumbblcok,thumbul);});
}

/*search*/
function searchtool(){
	$("header .search").click(function(){
		$(".searchblock").fadeIn();
		$("header .search").hide();
		$("header .jia").hide();
		$("header .nochoose").show();
	})
	$("header .nochoose").click(function(){
		$(".searchblock").fadeOut();
		$("header .search").show();
		$("header .jia").show();
		$("header .nochoose").hide();
	})
	$(".searchblock input").blur(function(){
		$(".searchblock").fadeOut();
		$("header .search").show();
		$("header .jia").show();
		$("header .nochoose").hide();
	})
}

/*块的显示隐藏*/
function sh_block(v){
	var cname = v.attr("class");
	if($("."+cname+'-block').hasClass(cname+"-block-h0")){
		$("."+cname+'-block').removeClass(cname+"-block-h0");
	}else{
		$("."+cname+'-block').addClass(cname+"-block-h0");
	}
}

//tab切换
function shtab(v){
	var elem = v.attr("id");
	v.addClass("on");
	v.siblings().removeClass("on");
	$("."+elem+"-1").show();
	$("."+elem+"-1").siblings().hide();
}

//菜单弹出
function meumpop(v){
	var meumelem = v.attr("id");
	closefullwindow1(id=".popfullwindows");
	popfullwindow1(id="."+meumelem);
}

//全屏弹窗
function popfullwindow1(id){
	$(document.body).addClass("noscroll");
	//var bodyH = $(window).height();
	//alert(bodyH);
	//var mh = $(id).offset().top;
	$(id).css({"z-Index":200});
	$(id).animate({opacity:1},200);
}

//关闭全屏弹窗
function closefullwindow1(id){
	$(id).animate({opacity:0},200);
	setTimeout(function(){$(id).css({"z-Index":-1})},250);
	$(document.body).removeClass("noscroll");
}

Date.prototype.format = Date.prototype.format || function(fmt, utc) {
    var _r, _o = {
        "M+" : (utc?this.getUTCMonth():this.getMonth()) + 1,
        "d+" : utc?this.getUTCDate():this.getDate(),
        "h+" : utc?this.getUTCHours():this.getHours(),
        "m+" : utc?this.getUTCMinutes():this.getMinutes(),
        "s+" : utc?this.getUTCSeconds():this.getSeconds(),
        "q+" : Math.floor(((utc?this.getUTCMonth():this.getMonth()) + 3) / 3),
        "S"  : utc?this.getUTCMilliseconds():this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) _r = fmt.replace(RegExp.$1, ((utc?this.getUTCFullYear():this.getFullYear()) + "").substr(4 - RegExp.$1.length));
    else _r = fmt;
    for (var k in _o) {
        if (new RegExp("(" + k + ")").test(_r))
            _r = _r.replace(RegExp.$1, (RegExp.$1.length==1) ? (_o[k]) : (("00"+ _o[k]).substr((""+ _o[k]).length)));
    }
    return _r;
};
function isBlankString(s){
	if(!s){
		return true;
	}
    else if (s.replace(/(^s*)|(s*$)/g, "").length ==0) 
	{ 
		return true; 
	}else{
		return false;
	}
}

angular.module("bridgeH5", ["myRoute", "ngSanitize"])
.directive("myDatetimePicker", ["$parse", function($parse) {
	return {
		restrict: "E",
		transclude: true,
		link: function(scope, element, attrs) {
			var v = $parse(attrs.ngModel)(scope) || new Date();
			element.removeAttr("ng-model");
			angular.element("<input/>")
			.attr({
				type: "text"
			})
			.css({
				"width": "100%",
				"border": "0"
			})
			.val(v.format("yyyy/MM/dd hh:mm"))
			.appendTo(element)
			.mobiscroll().datetime({
				theme: "ios",
				mode: "mixed",
				display: "bottom",
				lang: "zh",
				minDate: new Date(2000,0,1,0,0),
				maxDate: new Date(2999,11,31,23,59),
				stepMinute: 1,
				onSelect: function(t, e) {
					($parse(attrs.ngModel).assign)(scope, e.getVal());
				},
				defaultValue: v
			});
		}
	};
}])
.directive("myScroll", ['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			var win = angular.element($window), first = true;
			function handler() {
				if ((element.offset().top + element.height()) - (win.height() + win.scrollTop()) <= 0)
					scope.$apply(attrs.myScroll);
			}
			win.on('scroll', function() {
				if (first) first = false;
				else handler();
			});
			scope.$on('$destroy', function() {
				return win.off('scroll', handler);
			});
			$timeout(handler);
		}
	};
}])
.directive("myPdf", ["$parse", "$window", function ($parse, $window) {
	return {
		restrict: "E",
		transclude: true,
		link: function (scope, element, attrs) {
			element.removeAttr("ng-if src");
			angular.element("<iframe></iframe>").attr({
				"src": "lib/pdf/viewer.html?file=" + $parse(attrs.src)(scope),
				"width": "100%",
				"height": angular.element($window).height() - 90
			}).appendTo(element);
		}
	};
}])
.directive("myVideo", ["$parse", function($parse) {
	return {
		restrict: "E",
		transclude: true,
		link: function (scope, element, attrs) {
			element.removeAttr("ng-if src controls autoplay width height");
			angular.element("<video></video>").attr({
				"src": $parse(attrs.src)(scope),
				"controls": (attrs.controls && "true" == attrs.controls.toLowerCase()) ? "controls" : null,
				"autoplay": (attrs.autoplay && "true" == attrs.autoplay.toLowerCase()) ? "autoplay" : null,
				"width": (attrs.width) ? attrs.width : null,
				"height": (attrs.height) ? attrs.height : null
			}).appendTo(element);
		}
	};
}])
.factory("model", ["$rootScope", "$http", "$interval", "$timeout", "myRoute", function($rootScope, $http, $interval, $timeout, myRoute) {
	var _host = "http://101.201.141.1", _path="/bims-test", _base = _host + _path + "/rest/", _sessionId;
	function _fn() {
		$.get( _base + 'login/createToken.jo' + (_sessionId ? ";jsessionid=" + _sessionId : ""), function(data) {
			_sessionId = data;
		});
	}
	_fn();
	$interval(_fn, 300000, 0, false);
	$rootScope.loading = false;
	$rootScope.$location = {
		path: function(p, s) {
			if (s) {
				$rootScope.files.parentId = 1;
				myRoute.$$clear();
			}
			return myRoute.path(p);
		},
		back: myRoute.back
	};
	$rootScope.formatDate = function(time) {
		return (new Date(time)).format("yyyy-MM-dd hh:mm");
	};
	$rootScope.Constants = {
			ISSUETYPE_QUALITY:1,
			ISSUETYPE_SECURITY:2,
			TOPICTYPE_NOTICE:1,
			TOPICTYPE_HOTFOCUS:2,
			TOPICTYPE_NEWS:7,
			TOPICTYPE_TRACE:8,
			TOPICTYPE_ISSUE:3,
			TOPICTYPE_ISSUE_PUBLISH:4,
			TOPICTYPE_ISSUE_HANDLE:5,
			TOPICTYPE_ISSUE_ACCEPT:6,
			ISSUE_IMPORTANT_1:1,
			ISSUE_IMPORTANT_2:2,
			ISSUE_IMPORTANT_3:3,
			ISSUESTATUS_PUBLISHED:1,//
			ISSUESTATUS_HANDLED:2,//已处理
			ISSUESTATUS_ACCEPTED:3,//已验收
			ISSUESTATUS_HOUSEKEEP:4,//已存档
			ATTACHMENTTYPE_COMMON:1,
			ATTACHMENTTYPE_PICTURE:2,
			ATTACHMENTTYPE_VIDEO:3,
			ATTACHMENTTYPE_AUDIO:4,
			ISSUE_PUBLISHER_CATEGORY_YE_ZHU:1,
			ISSUE_PUBLISHER_CATEGORY_JIAN_LI:2,
			ISSUE_PUBLISHER_CATEGORY_OTHER:3
	};

	$rootScope.user = {};
	$rootScope.notice = {};
	$rootScope.hotfocus = {};
	$rootScope.news = {};
	$rootScope.sect = {};
	$rootScope.issues = {};
	$rootScope.issue = {};
	$rootScope.onepage = {id: "about"};
	$rootScope.files = (function() {
		var _icons = {
			"工程简介": "icon-4",
			"项目简介": "icon-4",
			"标段信息": "icon-13",
			"图纸查询": "icon-16",
			"施工组织设计": "icon-2",
			"组织机构": "icon-2",
			"视频动画": "icon-15",
			"管理办法": "icon-17",
			"标准规范": "icon-18",
			"其他": "icon-19"
		};
		
		return {
			parentId: 1,
			getIcon: function(name, dir) {
				return "img/" + (_icons[name] || (dir ? "icon-24" : "icon-11")) + ".png";
			}
		}
	})();
	
	function _req(o,c) {
		$rootScope.loading = true;
		o.url = _base + (o.url || "");
		if (_sessionId) o.url += ";jsessionid=" + _sessionId;
		$http(o)
		.success(function(d) {
			$rootScope.loading = false;
			c(d);
		})
		.error(function() {
			$rootScope.loading = false;
			c(false);
		});
	}

	return {
		base: function() {
			return _host + _path;
		},
		user: {
			login: function(u,p,c) {
				_req({
					method: "post",
					url: "login/login.jo",
					params: {
						username_: u || "",
						password_: p || ""
					}
				},  angular.isFunction(c) ? c : angular.noop);
			},
			update: function(user, c) {
				_req({
					method: "post",
					url: "user/update.jo",
					data: user
				},  angular.isFunction(c) ? c : angular.noop);
			},
			password: function(o, n, c) {
				_req({
					method: "post",
					url: "user/resetPassword.jo",
					params: {
						oldPwd: o,
						newPwd: n
					}
				},  angular.isFunction(c) ? c : angular.noop);
			},
			exists: function(u, c) {
				_req({
					method: "post",
					url: "login/userIsExists.jo",
					params: {
						username: u
					}
				},  angular.isFunction(c) ? c : angular.noop);
			},
			register: function(u, c) {
				_req({
					method: "post",
					url: "login/register.jo",
					data: u
				},  angular.isFunction(c) ? c : angular.noop);
			},
			departments: function(c) {
				_req({
					method: "get",
					url: "login/getAllDepartment.jo"
				},  angular.isFunction(c) ? c : angular.noop);
			}
		},
		notice: {
			list: function(count,num, c) {
				_req({
					method: "get",
					url: "notice/list.jo",
					params: {
						pageCnt: count,
						pageNum: num
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		comment: {
			create: function(id, type, content, c) {
				_req({
					method: "post",
					url: "comment/create.jo",
					data: {
						topicId: id,
						topicType: type,
						content: content
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			list: function(id, type, p, c) {
				_req({
					method: "get",
					url: "comment/list.jo",
					params: {
						topicId: id,
						topicType: type,
						pageNum: p
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		hotfocus: {
			create: function(d, c) {
				_req({
					method: "post",
					url: "hotfocus/create.jo",
					data: d
				}, angular.isFunction(c) ? c : angular.noop);
			},
			list: function(p,c) {
				_req({
					method: "get",
					url: "hotfocus/list.jo",
					params: {
						pageNum: p
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			get: function(i,c) {
				_req({
					method: "get",
					url: "hotfocus/get.jo",
					params: {
						id: i
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		feedback: {
			create: function(title, content, c) {
				_req({
					method: "post",
					url: "feedback/create.jo",
					data: {
						title: title,
						content: content
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		vote:{
			doLike: function(ti, tc, c){
				_req({
					method: "get",
					url: "vote/doLike.jo",
					params: {
						topicId: ti,
						topicType:tc
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			disLike:function(ti, tc, c){
				_req({
					method: "get",
					url: "vote/disLike.jo",
					params: {
						topicId: ti,
						topicType:tc
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			isVoted:function(ti, tc,c){
				_req({
					method: "get",
					url: "vote/isVoted.jo",
					params: {
						topicId: ti,
						topicType:tc
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
			
		},
		news: {
			list: function(p, c) {
				_req({
					method: "get",
					url: "news/list.jo",
					params: {
						pageNum: p
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		issues: {
			//i is issue object
			create: function(i, c) {
				_req({
					method: "post",
					url: "issue/publishissue.jo",
					data: i
				}, angular.isFunction(c) ? c : angular.noop);
			},
			update: function(i, c) {
				_req({
					method: "post",
					url: "issue/updateissue.jo",
					data: i
				}, angular.isFunction(c) ? c : angular.noop);
			},
			//id is issue ID
			remove: function(id, c) {
				_req({
					method: "delete",
					url: "issue/deleteissue.jo",
					params: {
						id:parseInt(id)
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			list: function(s, t, pn, cat, c) {
				if(cat ==0){
					_req({
						method: "post",
						url: "issue/listissue.jo",
						data:{
							sectionId: s,
							issueType: t,
							pageNum: pn
						}
					}, angular.isFunction(c) ? c : angular.noop);
				}else{
					_req({
						method: "post",
						url: "issue/listissue.jo",
						data:{
							sectionId: s,
							issueType: t,
							pageNum: pn,
							publisherCat: cat
						}
					}, angular.isFunction(c) ? c : angular.noop);
				}
			},
			getIssue: function(id, c) {
				_req({
					method: "get",
					url: "issue/getissue.jo",
					params: {
						id:id
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			getLatestIssue: function(c) {
				_req({
					method: "get",
					url: "issue/getLatestIssue.jo"
				}, angular.isFunction(c) ? c : angular.noop);
			},
			searchIssues: function(m, c) {//?????? get special list
				_req({
					method: "post",
					url: "issue/searchissue.jo",
					data:m
				}, angular.isFunction(c) ? c : angular.noop);
			},
			handleIssues: function(i, c) {//
				_req({
					method: "post",
					url: "issue/handleissue.jo",
					data:i
				}, angular.isFunction(c) ? c : angular.noop);
			},
			acceptIssues: function(i, c) {//
				_req({
					method: "post",
					url: "issue/acceptissue.jo",
					data:i
				}, angular.isFunction(c) ? c : angular.noop);
			}
			
		},
		sect : {
			list: function(t, pn, c) {
				_req({
					method: "get",
					url: "section/listSectionByIssueType.jo",
					params: {
						issueType: t,
						pageNum: pn
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		getOnePage: function(c) {
			_req({
				method: "get",
				url: "onepage/get.jo",
				params: { id: $rootScope.onepage.id }
			}, angular.isFunction(c) ? c : angular.noop);
		},
		getFileList: function(parentId, c) {
			_req({
				method: "get",
				url: "file/list.jo",
				params: { parentId: parentId }
			}, angular.isFunction(c) ? c : angular.noop);
		},
		uploadFile: function(url, fileData, callback, progress) {
			$timeout(function() {
				$rootScope.loading = true;
			});
			url = _base + (url || "");
			if (_sessionId) url += ";jsessionid=" + _sessionId;
			$.ajax({
				url: url,
				type: 'post',
				data: fileData,
				cache: false,
				contentType: false,
				processData: false,
				xhr: function() {
					var r = $.ajaxSettings.xhr();
					r.upload.addEventListener('progress',function(e) {
						(progress || angular.noop)(Math.floor(100 * e.loaded / e.total));
					}, false);
					return r;
				},
				success: function(d) {
					$timeout(function() {
						$rootScope.loading = false;
					}, 200);
					(callback || angular.noop)(d);
				},
				error: function() {
					$timeout(function() {
						$rootScope.loading = false;
					}, 200);
					(callback || angular.noop)(false);
				}
			});
		}
	};
}])
.controller("cLoading", ["$scope", function($scope) {
	$scope.displayLoading = function() {
		return $scope.loading ? "block" : "none";
	};
}])
.controller("cLogin", ["$scope", "model", function($scope, model) {
	if (window.localStorage) {
		$scope.username = localStorage["username"];
		$scope.password = localStorage["password"];
	}
	$scope.login = function() {
		model.user.login($scope.username, $scope.password, function(d) {
			if (d) {
				$scope.user.original = d;
				if (window.localStorage) {
					localStorage["username"] = $scope.username;
					localStorage["password"] = $scope.password;
				}
				$scope.user.name = d.name;
				$scope.user.photo = d.avatarUrl || "img/tem-img/img-person.jpg";
				$scope.user.department = (d.department || {}).name || "n/a";
				$scope.user.roles = (d.roles || {}).name || "App游客";
				$scope.user.id = d.id;
				$scope.$location.path("/");
			} else alert("无效的用户名和密码。");
		});
	};
}])
.controller("cZhuce", ["$scope", "$timeout", "model", function($scope, $timeout, model) {
	angular.extend($scope, {
		tipVisibility: "none",
		user: {
			username: "",
			password: "",
			gender: 1
		},
		register: function() {
			if ($scope.user.password != $scope.password0) {
				alert("请输入正确的密码！");
				return;
			}
			model.user.exists($scope.user.username, function(d) {
				if (!d) {
					model.user.register($scope.user, function(data) {
						if (data) {
							$scope.tipVisibility = "block";
							$timeout(function() {
								$scope.tipVisibility = "none";
							}, 2000);
						}
					});
				} else alert("用户已经存在！");
			});
		}
	});
	model.user.departments(function(d) {
		if (d) {
			$scope.departments = d;
			if (d.length > 0) $scope.user.department = d[0];
		}
	});
}])
.controller("cMain", ["$scope", "$timeout", "model", function($scope, $timeout, model) {
	angular.extend($scope, {
		items: [],
		itemClass: function(item) {
			if (item.important == "重要") return "z1";
			if (item.important == "紧急") return "z2";
			return "z3";
		},
		redianClick: function() {
			$scope.$location.path("/redian");
		}
	});
	$scope.notice.itemClick = function(item) {
		var uri = model.base();
		item.content = item.content
		.replace(/img src="\/bims-test/g, "img src=\"" + uri)
		.replace(/img src="\/bims/g, "img src=\"" + uri);
		$scope.notice.current = item;
		$scope.$location.path("/gonggaoxiangqing");
	};
	model.notice.list(3, 1, function(d) {
		if (d) {
			for(var i = 0; i < d.length; i++) {
				$scope.items.push(d[i]);
				if (i == 2) break;
			}
			$timeout(function () {
				thumbnailist(".list-10block",".list-10");
				$(".sliderbanner #owl-demo").owlCarousel({
					autoPlay: 3500,
					slideSpeed:1500,
					paginationSpeed:2000,
					navigation : false,
					items: 1,
					itemsDesktop: false,
					itemsDesktopSmall: false,
					itemsTablet: false,
					itemsMobile: false
				});
			});
		}
	});
	model.hotfocus.list(1, function(d) {
		if (d && d.length > 0) $scope.hotfocus.first = d[0];
	});
	model.issues.getLatestIssue(function(d){
		if(d) {
			$scope.issues.latestData = d;
			if(d.length > 0){
				$scope.issues.first = d[0];
			}
			if (d.length > 1) $scope.issues.second = d[1];
		}
	});
}])
.controller("cGonggao", ["$scope", "model", function($scope, model) {
	angular.extend($scope, {
		page: 1,
		data: [],
		load: function() {
			model.notice.list(20, $scope.page, function(d, s) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.data.push(d[i]);
					$scope.page++;
				}
			});
		},
		getImg: function(url) {
			var uri = model.base();
			return url ? url.replace(/^[\/]*bims-test/g, uri).replace(/^[\/]*bims/g, uri) : null;
		}
	});
}])
.controller("cGonggaoxiangqing", ["$scope", "model", function($scope, model) {
	angular.extend($scope, {
		page: 1,
		comments: [],
		load: function() {
			model.comment.list($scope.notice.current.id, $scope.notice.current.topicType, $scope.page, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.comments.push(d[i]);
					$scope.page++;
				}
			});
		},
		newComment: "",
		save: function() {
			if ($scope.newComment != "") {
				model.comment.create($scope.notice.current.id, $scope.notice.current.topicType, $scope.newComment, function(d) {
					if (d) {
						d.creatorCName = d.creatorCName || $scope.user.name;
						d.creatorAvatarUrl = d.creatorAvatarUrl || $scope.user.photo;
						$scope.comments.unshift(d);
						$scope.notice.current.totalCommentNum++;
					}
				});
				$scope.newComment = "";
			}
		}
	});
}])
.controller("cRedian", ["$scope", "model", function($scope, model) {
	angular.extend($scope, {
		page: 1,
		items: [],
		load: function() {
			model.hotfocus.list($scope.page, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.items.push(d[i]);
					$scope.page++;
				}
			});
		},
		itemClick: function(item) {
			$scope.hotfocus.current = item;
			$scope.$location.path("/redianxiangqing");
		}
	});
}])
.controller("cRedianxiangqing", ["$scope", "model", function($scope, model) {
	model.hotfocus.get($scope.hotfocus.current.id, function(d) {
		if(d) {
			$scope.hotfocus.current = d;
			//更新点赞状态
			$scope.voteMembers = (isBlankString($scope.hotfocus.current.voteUsersX)? [] : $scope.hotfocus.current.voteUsersX).split(",");
		    if($scope.voteMembers.length > 0){
		    	$scope.voteMemberStr = $scope.voteMembers.join("，"); 
		    	if($scope.voteMembers.length > 0){
			    	$scope.voteMemberStr = $scope.voteMembers.join("，"); 
			    	for (x in $scope.voteMembers){
			    		if($scope.voteMembers[x] == $scope.user.name){
							$scope.isVote = true;
							break;
						}
			    	}
			    }
			    
			    if($scope.isVote){
			    		//Judge whether is voted or not
				    	model.vote.isVoted($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, function(d){
				    		if(d){
				    			$scope.isVote = true;
				    		}else{
				    			$scope.isVote = false;
				    		}
				    	})
			    }
		    	
		    }
		}
		
	});
	angular.extend($scope, {
		page: 1,
		comments: [],
		isVote:false,
		voteMembers:[],
		voteMemberStr:"",
		load: function() {
			model.comment.list($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, $scope.page, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.comments.push(d[i]);
					$scope.page++;
				}
				
			});
			
		},	
		topicId:$scope.hotfocus.current.id,
		topicType:$scope.hotfocus.current.topicType,

		doLike:function(){
			if(!$scope.isVote){
				model.vote.doLike($scope.topicId, $scope.topicType, function(d){
					console.log("Click vote true");
					$scope.voteMembers.push($scope.user.name);
					$scope.isVote = true;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
				
			}else{
				if($scope.voteMembers.length <=0) return;
				model.vote.disLike($scope.topicId, $scope.topicType, function(d){
					console.log("unselect vote true");
					for(var i=0; i < $scope.voteMembers.length; i++){
						if($scope.voteMembers[i] == $scope.user.name){
							$scope.voteMembers.splice(i,1);
							break;
						}
					}
					$scope.isVote = false;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
			}
			
		},
		newComment: "",
		save: function() {
			if ($scope.newComment != "") {
				model.comment.create($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, $scope.newComment, function(d) {
					if (d) {
						d.creatorCName = d.creatorCName || $scope.user.name;
						d.creatorAvatarUrl = d.creatorAvatarUrl || $scope.user.photo;
						$scope.comments.unshift(d);
						$scope.hotfocus.current.totalCommentNum++;
					}
				});
				$scope.newComment = "";
			}
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
}])
.controller("cRediantianjia", ["$scope", "$timeout", "model", function($scope, $timeout, model) {
	function _upload(file, blob, c) {
		var formData = new FormData();
		formData.append("file", file);
		formData.append("attachment", blob);
		model.uploadFile("attachment/upload.jo", formData, c);
	}
	
	angular.extend($scope, {
		tipVisibility: "none",
		newItem: {
			picAttachmentList: [],
			videoAttachmentList: []
		},
		remain: 150,
		changed: function() {
			$scope.remain = 150 - $scope.newItem.content.length;
		},
		imgChanged: function(e) {
			var file = (angular.element(e))[0].files[0];
			$scope.newItem.picAttachmentList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file)
			});
			$scope.$apply();
			e.outerHTML = e.outerHTML;
		},
		videoChanged: function(e) {
			var file = angular.element(e)[0].files[0];
			$scope.newItem.videoAttachmentList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file)
			});
			$scope.$apply();
			e.outerHTML = e.outerHTML;
		},
		submit: function() {
			var _item = {
				title: $scope.newItem.title,
				content: $scope.newItem.content,
				attachments: [],
				picAttachmentList:[],
				videoAttachmentList: []
			},
			total = $scope.newItem.picAttachmentList.length + $scope.newItem.videoAttachmentList.length,
			counter = 0,
			picBlob = new Blob(['{"fileType":2,"topicType":2}'], { type: "application/json"}),
			vidBlob = new Blob(['{"fileType":3,"topicType":2}'], { type: "application/json"}), i;
			for (i = 0; i < $scope.newItem.picAttachmentList.length; i++) {
				_upload($scope.newItem.picAttachmentList[i].file, picBlob, function(d) {
					if (d) {
						_item.attachments.push(d);
						_item.picAttachmentList.push(d);
					}
					counter++;
				});
			}
			for (i = 0; i < $scope.newItem.videoAttachmentList.length; i++) {
				_upload($scope.newItem.videoAttachmentList[i].file, vidBlob, function(d) {
					if (d) {
						_item.attachments.push(d);
						_item.videoAttachmentList.push(d);
					}
					counter++;
				});
			}
			$timeout(function _fn_create() {
				if (counter >= total) {
					model.hotfocus.create(_item, function(d) {
						if (d) {
							$scope.tipVisibility = "block";
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}
					});
				} else $timeout(_fn_create, 200);
			});
		},
		save: function() {
			
		}
	});
}])
.controller("cWode", ["$scope", "$timeout", "model", function($scope, $timeout, model) {
	switch($scope.$location.path()) {
	case '/shezhi-guanyuwomen':
		$scope.onepage.id = "about";
		$scope.$location.path('/onepage')
		break;
	case '/wode-gerenxinxi':
		$scope.imgChanged = function(e) {
			var formData = new FormData();
			formData.append("avatarImg", (angular.element(e))[0].files[0]);
			model.uploadFile("user/uploadAvatar.jo", formData, function(d) {
				if (d) {
					$scope.user.photo = d.avatarUrl;
					$scope.user.original.avatarUrl = d.avatarUrl;
					$scope.$apply();
				}
			}, function(progress) {
				console.log(progress);
			});
		};
		break;
	case '/wode-gerenxinxi-xingming':
		angular.extend($scope, {
			tipVisibility: "none",
			alias: $scope.user.name,
			resetAlias: function() {
				if ($scope.alias != $scope.user.name) {
					$scope.user.original.name = $scope.alias;
					model.user.update($scope.user.original, function(d) {
						if (d) {
							$scope.tipVisibility = "block";
							$scope.user.name = d.name;
							$timeout(function() {
								$scope.tipVisibility = "none";
							}, 2000);
						} else $scope.user.original.name = $scope.user.name;
					});
				}
			}
		});
		break;
	case '/wode-gerenxinxi-xiugaimima':
		angular.extend($scope, {
			tipVisibility: "none",
			newPasswd: "",
			resetPassword: function() {
				if ($scope.newPasswd != "") {
					model.user.password($scope.oldPasswd, $scope.newPasswd, function(d) {
						if (d) {
							$scope.tipVisibility = "block";
							$timeout(function() {
								$scope.tipVisibility = "none";
							}, 2000);
						}
					});
				}
			}
		});
		break;
	case '/shiyongyijianfankui':
		angular.extend($scope, {
			tipVisibility: "none",
			feedbackTitle: "",
			feedbackContent: "",
			feedbackCommit: function() {
				if ($scope.feedbackTitle != "" && $scope.feedbackContent != "") {
					model.feedback.create($scope.feedbackTitle, $scope.feedbackContent, function(d) {
						if (d) {
							$scope.tipVisibility = "block";
							$scope.feedbackTitle = "";
							$scope.feedbackContent = "";
							$timeout(function() {
								$scope.tipVisibility = "none";
							}, 2000);
						}
					});
				}
			}
		});
		break;
	}
}])
.controller("cOnePage", ["$scope", "model", function($scope, model) {
	model.getOnePage(function(d) {
		$scope.title = d.title;
		$scope.content = d.content.replace(/img src="\/bims-test/g, "img src=\"" + model.base());
	});
}])
.controller("cNews", ["$scope", "model", function($scope, model) {
	angular.extend($scope, {
		page: 1,
		list: [],
		load: function() {
			model.news.list($scope.page, function(d) {
				if(d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.list.push(d[i]);
					$scope.page++;
				}
			});
		},
		getImg: function(url) {
			var uri = model.base();
			return url ? url.replace(/^[\/]*bims-test/g, uri).replace(/^[\/]*bims/g, uri) : null;
		},
		newsClick: function(n) {
			var uri = model.base();
			n.content = n.content
			.replace(/img src="\/bims-test/g, "img src=\"" + uri)
			.replace(/img src="\/bims/g, "img src=\"" + uri);
			$scope.news.current = n;
			$scope.$location.path("/xinwentupian-xiangqing");
		}
	});
}])
.controller("cIssues", ["$scope", "model", function($scope, model) {
	var s = $scope.issues.currentSectId;
	var t = $scope.issues.currentIssueType;

	angular.extend($scope, {
		page: 1,
		items: [],
		myPublisherCat:0,
		load: function() {
			model.issues.list(s, t, $scope.page, $scope.myPublisherCat, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.items.push(d[i]);
					$scope.page++;
				}
			});
		}
		
	});
//	model.issues.list(s, t, 0, function(d) {
//		if(d) $scope.issues.data = d;
//	});
	$scope.issueClick = function(n) {
		$scope.issues.currentIssue = n;
		$scope.$location.path("/issue-details");
	};

	$scope.filterClick = function(n){
		$scope.items = [];
		$scope.page = 1;
		switch(n) {
			case 1:
				$scope.myPublisherCat = 1;
				break;
			case 2:
				$scope.myPublisherCat = 2;
				break;
			default:
				$scope.myPublisherCat = 0;
		}
		$scope.load();
	};
}])
.controller("cIssueDetails", ["$scope", "model", "$timeout", function($scope, model, $timeout) {
	var id = $scope.issues.currentIssue.id;
	$scope.issueItem = $scope.issues.currentIssue;
	$scope.tipVisibility = "none";
	$scope.tipContent = "";
	$scope.isVote = false;
	$scope.voteMembers = [];
	$scope.voteMemberStr = "";
	model.issues.getIssue(id, function(d) {
		if(d) {
			$scope.issueItem = d;
		    var issueCats = ["制度／方案缺陷","交底培训缺陷","有章不循"];
		    if($scope.issueItem.issueCategory >0 && $scope.issueItem.issueCategory <4){
		    	$scope.issueItem.issueCategoryRemark = issueCats[$scope.issueItem.issueCategory-1]; 
		    }

		    $scope.voteMembers = (isBlankString($scope.issueItem.voteUsersX)?[]:$scope.issueItem.voteUsersX).split(",");
		    if($scope.voteMembers.length > 0){
		    	$scope.voteMemberStr = $scope.voteMembers.join("，"); 
		    	for (x in $scope.voteMembers){
		    		if($scope.voteMembers[x] == $scope.user.name){
						$scope.isVote = true;
						break;
					}
		    	}
		    }
		    
		    if($scope.isVote){
		    		//Judge whether is voted or not
			    	model.vote.isVoted($scope.issueItem.id, $scope.Constants.TOPICTYPE_ISSUE, function(d){
			    		if(d){
			    			$scope.isVote = true;
			    		}else{
			    			$scope.isVote = false;
			    		}
			    	})
		    	}
		    
		}
	});
	
	$scope.page = 1;
	$scope.comments =[];
	$scope.load = function() {
		model.comment.list($scope.issueItem.id,$scope.Constants.TOPICTYPE_ISSUE, $scope.page, function(d) {
			if (d && d.length > 0) {
				for (var i = 0; i < d.length; i++)
					$scope.comments.push(d[i]);
				$scope.page++;
			}else{
//				$scope.tipContent = "没有数据了";
//				$scope.tipVisibility = "block";
//				$timeout(function(){
//					$scope.tipVisibility = "none";
//				} ,1000);
			}
		});
	};
	
	angular.extend($scope, {
		topicId:$scope.issues.currentIssue.id,
		topicType:$scope.Constants.TOPICTYPE_ISSUE,

		doLike:function(){
			if(!$scope.isVote){
				model.vote.doLike($scope.topicId, $scope.topicType, function(d){
					console.log("Click vote true");
					$scope.voteMembers.push($scope.user.name);
					$scope.isVote = true;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
				
			}else{
				if($scope.voteMembers.length <=0) return;
				model.vote.disLike($scope.topicId, $scope.topicType, function(d){
					console.log("unselect vote true");
					for(var i=0; i < $scope.voteMembers.length; i++){
						if($scope.voteMembers[i] == $scope.user.name){
							$scope.voteMembers.splice(i,1);
							break;
						}
					}
					$scope.isVote = false;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
			}
			
		}
	});
	
	$scope.load = function() {
		model.comment.list($scope.issueItem.id,$scope.Constants.TOPICTYPE_ISSUE, $scope.page, function(d) {
			if (d && d.length > 0) {
				for (var i = 0; i < d.length; i++)
					$scope.comments.push(d[i]);
				$scope.page++;
			}else{
//				$scope.tipContent = "没有数据了";
//				$scope.tipVisibility = "block";
//				$timeout(function(){
//					$scope.tipVisibility = "none";
//				} ,1000);
			}
		});
	};
	$scope.load();
	$scope.newComment = "";
	$scope.save = function() {
		if ($scope.newComment != "") {
			model.comment.create($scope.issueItem.id, $scope.Constants.TOPICTYPE_ISSUE, $scope.newComment, function(d) {
				if (d) {
					d.creatorCName = d.creatorCName || $scope.user.name;
					d.creatorAvatarUrl = d.creatorAvatarUrl || $scope.user.photo;
					$scope.comments.unshift(d);
					$scope.issueItem.totalCommentNum++;
				}
			});
			$scope.newComment = "";
		}
	};
	
	$scope.edit = function(){
		
	};
	
	$scope.del = function(){
		model.issues.remove($scope.issueItem.id, function(d){
			if(d){
				$scope.tipContent = "删除成功";
				$scope.tipVisibility = "block";
				$timeout(function(){
					$scope.$location.path("/issueList");
				} ,1000);
			}else{
				$scope.tipContent = "删除失败";
				$scope.tipVisibility = "block";
				$timeout(function(){
					$scope.tipVisibility = "none";
				} ,1000);
			}
		});
	};
}])
.controller("cIssueEdit", ["$scope", "model", "$timeout", function($scope, model, $timeout){
	$scope.newIssue = {
	};
	$scope.tipVisibility = "none";
	
	$scope.remain= 150;
	$scope.remain1= 150;
	
	$scope.changed = function() {
		if($scope.newIssue.issueDesc!= null){
			$scope.remain = 150 - $scope.newIssue.issueDesc.length;
		}
		if($scope.newIssue.issueRectification!= null){
			$scope.remain1 = 150 - $scope.newIssue.issueRectification.length;
		}
		
	};
	//Get issue data
	var id = $scope.issues.currentIssue.id;
	model.issues.getIssue(id, function(d) {
		if(d) {
			$scope.newIssue = d;
			$scope.changed();
		}
	});
	
	function _upload(file, blob, c) {
		var formData = new FormData();
		formData.append("file", file);
		formData.append("attachment", blob);
		model.uploadFile("attachment/upload.jo", formData, c);
	}
	
//	$scope.newIssue.issueTotalAttachmentList = [];
//	$scope.newIssue = $scope.issues.currentIssue;
//	$scope.newIssue.deadlineTime = new Date($scope.newIssue.deadlineTime);
//	$scope.issues.currentIssue.issuePicAttachmentList = $scope.issues.currentIssue.issuePicAttachmentList;
	$scope.choiceImportant = function(i){
		$scope.newIssue.important = i;
	};
	$scope.total = 0;
//	
	$scope.imgChanged = function(e) {
			var file = (angular.element(e))[0].files[0];
			$scope.newIssue.issuePicAttachmentList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file),
				isNewFile:1
			});
			$scope.total++;
			$scope.$apply();
			e.outerHTML = e.outerHTML;
	};
	$scope.videoChanged = function(e) {
			var file = angular.element(e)[0].files[0];
			$scope.newIssue.issueVideoAttachmentList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file),
				isNewFile:1
			});
			$scope.total++;
			$scope.$apply();
			e.outerHTML = e.outerHTML;
	};
		
	$scope.save = function(i){
		//TODO change by biz
	};
	$scope.submit = function(i){
//		$scope.newIssue.issueType = $scope.issues.currentIssueType;
//		$scope.newIssue.sectionId = $scope.issues.currentSectId;
		var _item = {
				id:$scope.newIssue.id,
				issueTitle: $scope.newIssue.issueTitle,
				issueType:$scope.issues.currentIssueType,
				location:$scope.newIssue.location,
				sectionId:$scope.issues.currentSectId,
				issueDesc:$scope.newIssue.issueDesc,
				issueRectification:$scope.newIssue.issueRectification,
				important:$scope.newIssue.important,
				deadlineTime:$scope.newIssue.deadlineTime,
				issuePicAttachmentList:[],
				issueVideoAttachmentList:[],
				issueTotalAttachmentList:[]

		},
//			total = $scope.newIssue.issuePicAttachmentList.length + $scope.newIssue.issueVideoAttachmentList.length,
			counter = 0,
			picBlob = new Blob(['{"fileType":2,"topicType":2}'], { type: "application/json"}),
			vidBlob = new Blob(['{"fileType":3,"topicType":2}'], { type: "application/json"}), i;
			for (i = 0; i < $scope.newIssue.issuePicAttachmentList.length; i++) {
				if($scope.newIssue.issuePicAttachmentList[i].isNewFile != 1) {
					_item.issuePicAttachmentList.push($scope.newIssue.issuePicAttachmentList[i]);
					_item.issueTotalAttachmentList.push($scope.newIssue.issuePicAttachmentList[i]);
				}else
				_upload($scope.newIssue.issuePicAttachmentList[i].file, picBlob, function(d) {
					if (d) {
						_item.issueTotalAttachmentList.push(d);
						_item.issuePicAttachmentList.push(d);
					}
					counter++;
				});
			}
			for (i = 0; i < $scope.newIssue.issueVideoAttachmentList.length; i++) {
				if($scope.newIssue.issueVideoAttachmentList[i].isNewFile != 1) {
					_item.issueTotalAttachmentList.push($scope.newIssue.issueVideoAttachmentList[i]);
					_item.issueVideoAttachmentList.push($scope.newIssue.issueVideoAttachmentList[i]);
				}else
				_upload($scope.newIssue.issueVideoAttachmentList[i].file, vidBlob, function(d) {
					if (d) {
						_item.issueTotalAttachmentList.push(d);
						_item.issueVideoAttachmentList.push(d);
					}
					counter++;
				});
			}
			$timeout(function _fn_create() {
				if (counter >= $scope.total) {
					console.log(counter);
					model.issues.update(_item, function(d) {
						if (d) {
							$scope.tipVisibility = "block";
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}
					});
				} else $timeout(_fn_create, 200);
			});
		
	};
}])
.controller("cIssueCreate", ["$scope", "model", "$timeout", function($scope, model, $timeout){
	
	function _upload(file, blob, c) {
		var formData = new FormData();
		formData.append("file", file);
		formData.append("attachment", blob);
		model.uploadFile("attachment/upload.jo", formData, c);
	}
	
	$scope.newIssue = {
		issuePicAttachmentList: [],
		issueVideoAttachmentList: []
	};
	
	$scope.newIssue.important = $scope.Constants.ISSUE_IMPORTANT_3;
	$scope.newIssue.issueTotalAttachmentList = [];
	$scope.choiceImportant = function(i){
		$scope.newIssue.important = i;
	};
	$scope.tipVisibility = "none";
	
	$scope.remain= 150;
	$scope.remain1= 150;
	$scope.changed = function() {
			$scope.remain = 150 - $scope.newIssue.issueDesc.length;
			$scope.remain1 = 150 - $scope.newIssue.issueRectification.length;
	};
	$scope.imgChanged = function(e) {
			var file = (angular.element(e))[0].files[0];
			$scope.newIssue.issuePicAttachmentList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file)
			});
			$scope.$apply();
			e.outerHTML = e.outerHTML;
	};
	$scope.videoChanged = function(e) {
			var file = angular.element(e)[0].files[0];
			$scope.newIssue.issueVideoAttachmentList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file)
			});
			$scope.$apply();
			e.outerHTML = e.outerHTML;
	};
		
	$scope.save = function(i){
		//TODO change by biz
	};
	$scope.submit = function(i){
		$scope.newIssue.issueType = $scope.issues.currentIssueType;
		$scope.newIssue.sectionId = $scope.issues.currentSectId;
		var _item = {
				issueTitle: $scope.newIssue.issueTitle,
				issueType:$scope.issues.currentIssueType,
				location:$scope.newIssue.location,
				sectionId:$scope.issues.currentSectId,
				issueDesc:$scope.newIssue.issueDesc,
				issueRectification:$scope.newIssue.issueRectification,
				important:$scope.newIssue.important,
				deadlineTime:$scope.newIssue.deadlineTime,
				issuePicAttachmentList:[],
				issueVideoAttachmentList:[],
				issueTotalAttachmentList:[]

		},
			total = $scope.newIssue.issuePicAttachmentList.length + $scope.newIssue.issueVideoAttachmentList.length,
			counter = 0,
			picBlob = new Blob(['{"fileType":2,"topicType":2}'], { type: "application/json"}),
			vidBlob = new Blob(['{"fileType":3,"topicType":2}'], { type: "application/json"}), i;
			for (i = 0; i < $scope.newIssue.issuePicAttachmentList.length; i++) {
				_upload($scope.newIssue.issuePicAttachmentList[i].file, picBlob, function(d) {
					if (d) {
						_item.issueTotalAttachmentList.push(d);
						_item.issuePicAttachmentList.push(d);
					}
					counter++;
				});
			}
			for (i = 0; i < $scope.newIssue.issueVideoAttachmentList.length; i++) {
				_upload($scope.newIssue.issueVideoAttachmentList[i].file, vidBlob, function(d) {
					if (d) {
						_item.issueTotalAttachmentList.push(d);
						_item.issueVideoAttachmentList.push(d);
					}
					counter++;
				});
			}
			$timeout(function _fn_create() {
				if (counter >= total) {
					model.issues.create(_item, function(d) {
						if (d) {
							$scope.tipVisibility = "block";
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}
					});
				} else $timeout(_fn_create, 200);
			});
		
	};
}])
.controller("cIssueCheck", ["$scope", "model", "$timeout",function($scope, model, $timeout){
	angular.extend($scope, {
		issueItem:{
			id : $scope.issues.currentIssue.id,
			acceptDesc:""
		},
		tipVisibility: "none",
		tipContent:"提交成功",
		remain:150,
		contentChanged:function(){
			if($scope.issueItem.acceptDesc!= null){
				$scope.remain = 150 - $scope.issueItem.acceptDesc.length;
			}
		},
		submit: function(i){
			var _item = {
					id: $scope.issueItem.id,
					acceptDesc:$scope.issueItem.acceptDesc
			};
			model.issues.acceptIssues(_item, function(d) {
				if (d) {
					$scope.tipVisibility = "block";
					$timeout(function() {
						$scope.$location.back();
					}, 1000);
				}
			});
		}
	});
	
}])
.controller("cIssueHandle", ["$scope", "model", "$timeout",function($scope, model, $timeout){

	function _upload(file, blob, c) {
		var formData = new FormData();
		formData.append("file", file);
		formData.append("attachment", blob);
		model.uploadFile("attachment/upload.jo", formData, c);
	}
	$scope.issueCats = [];
	angular.extend($scope, {
		issueCats:[{id:1,name:"制度／方案缺陷"}, {id:2, name:"交底培训缺陷"},{id:3,name:"有章不循"},{id:4, name:"其他"}],
		issueItem:{
			id : $scope.issues.currentIssue.id,
			issueCategory:1,
			issueCategoryRemark:"",
			handlePicList: [],
			handleVideoList: [],
			handleTotalAttachmentList: []
		},
		remain:150,
		remain1:150,
		remain2:150,
		tipVisibility: "none",
		tipContent:"",
		selectAction:function(){
			console.log($scope.issueItem.issueCategory);
			if($scope.issueItem.issueCategory != 4){
				$scope.issueItem.issueCategoryRemark = "";
			}
		},
		contentChanged:function(i){
			switch(i){
			case 0:
				if($scope.issueItem.handleDesc!= null){
					$scope.remain = 150 - $scope.issueItem.handleDesc.length;
				}
				break;
			case 1:
				if($scope.issueItem.lessonDesc!= null){
					$scope.remain1 = 150 - $scope.issueItem.lessonDesc.length;
				}
				break;
			case 2:
				if($scope.issueItem.preventionDesc!= null){
					$scope.remain2 = 150 - $scope.issueItem.preventionDesc.length;
				}
				break;
			}
		},
		imgChanged : function(e) {
			var file = (angular.element(e))[0].files[0];
			$scope.issueItem.handlePicList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file)
			});
			$scope.$apply();
			e.outerHTML = e.outerHTML;
		},
	    videoChanged : function(e) {
			var file = angular.element(e)[0].files[0];
			$scope.issueItem.handleVideoList.push({
				file: file,
				thumbnailUrl: URL.createObjectURL(file)
			});
			$scope.$apply();
			e.outerHTML = e.outerHTML;
	    },
	    submit: function(i){

			var _item = {
					id: $scope.issueItem.id,
					handleDesc: $scope.issueItem.handleDesc,
					lessonDesc: $scope.issueItem.lessonDesc,
					preventionDesc: $scope.issueItem.preventionDesc,
					issueCategory: $scope.issueItem.issueCategory,
					issueCategoryRemark: $scope.issueItem.issueCategoryRemark,
					handlePicList:[],
					handleVideoList:[],
					handleTotalAttachmentList:[]
			},
				total = $scope.issueItem.handlePicList.length + $scope.issueItem.handleVideoList.length,
				counter = 0,
				picBlob = new Blob(['{"fileType":2,"topicType":2}'], { type: "application/json"}),
				vidBlob = new Blob(['{"fileType":3,"topicType":2}'], { type: "application/json"}), i;
				for (i = 0; i < $scope.issueItem.handlePicList.length; i++) {
					_upload($scope.issueItem.handlePicList[i].file, picBlob, function(d) {
						if (d) {
							_item.handleTotalAttachmentList.push(d);
							_item.handlePicList.push(d);
						}
						counter++;
					});
				}
				for (i = 0; i < $scope.issueItem.handleVideoList.length; i++) {
					_upload($scope.issueItem.handleVideoList[i].file, vidBlob, function(d) {
						if (d) {
							_item.handleTotalAttachmentList.push(d);
							_item.handleVideoList.push(d);
						}
						counter++;
					});
				}
				$timeout(function _fn_create() {
					if (counter >= total) {
						model.issues.handleIssues(_item, function(d) {
							if (d) {
								$scope.tipVisibility = "block";
								$scope.tipContent = "提交成功";
								$timeout(function() {
									$scope.$location.back();
								}, 1000);
							}
						});
					} else $timeout(_fn_create, 200);
				});
			
		}
	});
}])
.controller("cIssusSect1", ["$scope", "model", function($scope, model){
	$scope.issues.currentIssueType = $scope.Constants.ISSUETYPE_QUALITY;
	//Set the issue number
	model.sect.list($scope.Constants.ISSUETYPE_QUALITY,0,function(d) {
		if(d) $scope.sect.data = d;
	});
	//****************************************
	$scope.sectClick = function(s) {
		$scope.issues.currentSectId = s;
		$scope.$location.path("/issueList");
	};
}])
.controller("cIssusSect2", ["$scope", "model", function($scope, model){
	//Set the issue number of per section
	$scope.issues.currentIssueType = $scope.Constants.ISSUETYPE_SECURITY;
	model.sect.list($scope.Constants.ISSUETYPE_SECURITY, 0, function(d) {
		if(d) $scope.sect.data = d;
	});
	//****************************************
	$scope.sectClick = function(s) {
		$scope.issues.currentSectId = s;
		$scope.$location.path("/issueList");
	};
}])
.controller("cNewsDetail", ["$scope", "model", function($scope, model) {
	angular.extend($scope, {
		page: 1,
		comments: [],
		load: function() {
			model.comment.list($scope.news.current.id, $scope.news.current.topicType, $scope.page, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.comments.push(d[i]);
					$scope.page++;
				}
			});
		},
		publisher: $scope.news.current.publisherName || $scope.news.current.createUser || $scope.news.current.updateUser || "n/a",
		newComment: "",
		creatorAvatarUrl: function(c) {
			return c.creatorAvatarUrl || "img/tem-img/img-person.jpg";
		},
		save: function() {
			if ($scope.newComment != "") {
				model.comment.create($scope.news.current.id, $scope.news.current.topicType, $scope.newComment, function(d) {
					if (d) {
						d.creatorCName = d.creatorCName || $scope.user.name;
						d.creatorAvatarUrl = d.creatorAvatarUrl || $scope.user.photo;
						$scope.comments.unshift(d);
						$scope.news.current.totalCommentNum++;
					}
				});
				$scope.newComment = "";
			}
		}
	});
}])
.controller("cSousuo", ["$scope", "model", function($scope, model) {
	$scope.status = ['on','','','',''];
	var path = $scope.$location.path();
	if (path.indexOf("sousuo-single") > 0) {
		$scope.files.parentId = parseInt(path.substring(path.indexOf("?id=") + 4));
		$scope.status[0] = '';
		if ($scope.files.parentId == 808 || $scope.files.parentId == 809) $scope.status[3] = 'on';
		else $scope.status[2] = 'on';
	}
	model.getFileList($scope.files.parentId, function(d) {
		if(d) {
			if ($scope.files.parentId < 2) d.fileName = '搜索'
			$scope.files.current = d;
			$scope.items = d.dirList.concat(d.filesList);
		}
	});
	angular.extend($scope, {
		backClick: function() {
			$scope.files.parentId = $scope.files.current.parentId;
			$scope.$location.back();
		},
		itemClicked: function(item) {
			if (item.showDetail) {
				$scope.onepage.id = item.onePageId;
				$scope.$location.path('/onepage');
			} else if (item.dir) {
				$scope.files.parentId = item.id;
				$scope.$location.path('/sousuo');
			} else {
				$scope.files.filename = item.fileName;
				$scope.files.filepath = item.filePath.indexOf("http") >= 0 ? item.filePath : model.base() + item.filePath;
				$scope.$location.path('/onefile');
			}
		}
	});
}])
.controller("cOneFile", ["$scope", "model", function($scope, model) {
	var ext = $scope.files.filepath.substr($scope.files.filepath.lastIndexOf(".") + 1, 3).toLowerCase();
	$scope.img = (ext == 'png' || ext == 'jpg' || ext == 'gif');
	$scope.pdf = ext == 'pdf';
	$scope.video = (ext == "mp4" || ext =="ogg" || ext == "3gp" || ext == "mov");
	if ($scope.files.filename.length > 8) $scope.files.filename = $scope.files.filename.substring(0, 8) + " ...";
}])
.config(["myRouteProvider", function(myRouteProvider) {
	myRouteProvider
	.when("/login", {
		templateUrl: "partials/a1-1-1denglu.html",
		controller: "cLogin"
	})
	.when("/zhuce", {
		templateUrl: "partials/zhuce.html",
		controller: "cZhuce"
	})
	.when("/", {
		templateUrl: "partials/index.html",
		controller: "cMain"
	})
	.when("/gonggao", {
		templateUrl: "partials/gonggao.html",
		controller: "cGonggao"
	})
	.when("/gonggaoxiangqing", {
		templateUrl: "partials/gonggaoxiangqing.html",
		controller: "cGonggaoxiangqing"
	})
	.when("/redian", {
		templateUrl: "partials/redian.html",
		controller: "cRedian"
	})
	.when("/redianxiangqing", {
		templateUrl: "partials/redian-xiangqing.html",
		controller: "cRedianxiangqing"
	})
	.when("/rediantianjia", {
		templateUrl: "partials/redian-create.html",
		controller: "cRediantianjia"
	})
	.when("/sousuo", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/henji", {
		templateUrl: "partials/a1-1-1henji.html"
	})
	.when("/faxian", {
		templateUrl: "partials/a1-1-1faxian.html"
	})
	.when("/wode", {
		templateUrl: "partials/a5-1-1wode.html",
		controller: "cWode"
	})
	.when("/wode-gerenxinxi", {
		templateUrl: "partials/a5-1-2wode-gerenxinxi.html",
		controller: "cWode"
	})
	.when("/wode-gerenxinxi-xingming", {
		templateUrl: "partials/a5-1-3wode-gerenxinxi-xingming.html",
		controller: "cWode"
	})
	.when("/wode-gerenxinxi-xiugaimima", {
		templateUrl: "partials/a5-1-4wodegerenxinxi-xiugamima.html",
		controller: "cWode"
	})
	.when("/shangchuanguanli", {
		templateUrl: "partials/a5-2-1shangchuanguanli.html",
		controller: "cWode"
	})
	.when("/shiyongyijianfankui", {
		templateUrl: "partials/a5-3-1shiyongyijianfankui.html",
		controller: "cWode"
	})
	.when("/shezhi", {
		templateUrl: "partials/a5-4-1shezhi.html",
		controller: "cWode"
	})
	.when("/gongchengjianjie", {
		templateUrl: "partials/one-page.html",
		controller: "cOnePage"
	})
	.when("/sousuo-single?id=14", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=53", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=65", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=66", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=67", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=68", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=808", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/sousuo-single?id=809", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/biaoduanxinxi", {
		templateUrl: "partials/a3-1-1biaoduanxinxi.html"
	})
	.when("/xinwentupian", {
		templateUrl: "partials/xinwentupian.html",
		controller: "cNews"
	})
	.when("/xinwentupian-xiangqing", {
		templateUrl: "partials/xinwentupian-xiangqing.html",
		controller: "cNewsDetail"
	})
	.when("/issues-feedback-quality", {
		templateUrl: "partials/wentifankui.html",
		controller: "cIssusSect1"
	})
	.when("/issues-feedback-safe", {
		templateUrl: "partials/wentifankui.html",
		controller: "cIssusSect2"
	})
	.when("/issueList", {
		templateUrl: "partials/wenti-list.html",
		controller: "cIssues"
	})
	.when("/issue-details", {
		templateUrl: "partials/wenti-xiangqing.html",
		controller: "cIssueDetails"
	})
	.when("/issue-create", {
		templateUrl: "partials/wenti-create.html",
		controller: "cIssueCreate"
	})
	.when("/issue-edit", {
		templateUrl: "partials/wenti-edit.html",
		controller: "cIssueEdit"
	})
	.when("/issue-handle",{
		templateUrl: "partials/wenti-handle.html",
		controller: "cIssueHandle"
	})
	.when("/issue-check",{
		templateUrl: "partials/wenti-check.html",
		controller: "cIssueCheck"
	})
	.when("/onepage", {
		templateUrl: "partials/one-page.html",
		controller: "cOnePage"
	})
	.when("/onefile", {
		templateUrl: "partials/one-file.html",
		controller: "cOneFile"
	})
	.otherwise({
        redirectTo: "/"
    });
}])
.run(["myRoute", function(myRoute) {
	myRoute.path("/login");
}]);