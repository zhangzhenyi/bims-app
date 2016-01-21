(function(c) {
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.image.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.scroller.ios.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.scroller.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.frame.ios.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.frame.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.icons.css" }));
	$("link:first", c).before($("<link>").attr({ rel: "stylesheet", type: "text/css", href: "lib/mobiscroll-master/css/mobiscroll.animation.css" }));
})($(document.head));

/*列均分*/
function thumbnailist(thumbblcok,thumbul) {
	var listwidth = $(thumbblcok).width(),
	listliamargin = $(thumbul+" li div").css("marginRight");
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
	});
	$("header .nochoose").click(function(){
		$(".searchblock").fadeOut();
		$("header .search").show();
		$("header .jia").show();
		$("header .nochoose").hide();
	});
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
	$(id).css({"z-Index":200});
	$(id).animate({opacity:1},200);
}

//关闭全屏弹窗
function closefullwindow1(id){
    $(id).animate({opacity:0},200);
    setTimeout(function(){$(id).css({"z-Index":-1});},250);
    $(document.body).removeClass("noscroll");
}

String.prototype.getByteLen = function(val) {
    var r = i = 0;
    for (; i < val.length; i++, r++) {
         if (val.charAt(i).match(/[^\x00-\xff]/ig) != null) r++;
    }
    return r;
};

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

function isBlankString(s) {
	if (!s) return true;
	if (s.replace(/(^s*)|(s*$)/g, "").length ==0) return true;
	return false;
}

angular.module("bridgeH5", ["myRoute", "ngSanitize", "radialIndicator"])
.filter('cutTail', [function () {
	  return function (value, wordwise, max, tail) {
		    if (!value) return '';
		    if(value.length <= max) return value;
		    value = value.substr(0, max);
		    if (wordwise) {
		      var lastspace = value.lastIndexOf(' ');
		      if (lastspace != -1) {
		        value = value.substr(0, lastspace);
		      }
		    }
		    return value + (tail || ' …');
	  };
}])
.directive("myRadialIndicator", ["$parse", function($parse) {
	return {
		restrict: "AE",
		transclude: true,
		replace: true,
		template: "<div></div>",
		compile: function(t, a) {
			angular.element("<div></div>")
			.css({
				"font-family": "宋体",
				"font-size": "18px",
				"font-weight": "bold",
				"color": "#87CEEB"
			})
			.html("{{" + a.bigModel + "}}%")
			.appendTo(t);
			angular.element("<div></div>")
			.css({
				"display": "inline-block",
				"margin-top": "-8px"
			})
			.attr({
				"data-radial-indicator": "{radius: 60, barWidth: 15, percentage: true, displayNumber: false, barColor: '#87CEEB'}",
				"data-radial-indicator-model": a.bigModel
			})
			.append(
				angular.element("<div></div>")
				.css({
					"position": "absolute",
					"margin-top": "20px",
					"margin-left": "20px"
				})
				.attr({
					"data-radial-indicator": "{radius: 40, barWidth: 15, percentage: true, barColor: '#87CEEB', fontSize: 20, fontFamily: '宋体'}",
					"data-radial-indicator-model": a.smallModel
				})
			)
			.appendTo(t);
		}
	};
}])
.directive("myTouchRemove", ["$window", "$parse", function($window, $parse) {
	var _selected,
	_bk = angular.element("<div></div>").css({
		"width": "100%",
		"height": "100%",
		"position":"absolute",
		"top":"0",
		"left":"0",
		"background":"rgba(0,0,0,0.4)",
		"z-index":"999",
		"display":"none"
	}).bind("click", function() {_select(0);}).appendTo("body"),
	_pane = angular.element("<div></div>").css({
		"background-color": "rgba(204,204,204,.5)",
		"width": "100%",
		"height": "80px",
		"position": "absolute",
		"top": angular.element($window).height() + 1
	})
	.append(angular.element("<p></p>").css("margin", 0).append(
	angular.element("<button>删除</button>")
		.css({
			"margin-top": "5px",
			"width": "100%",
			"height":"30px"
		})
		.bind("click", function() {_select(1);}))
	)
	.append(angular.element("<p></p>").css("margin", 0).append(
		angular.element("<button>取消</button>")
		.css({
			"width": "100%",
			"margin-top": "5px",
			"height":"30px"
		})
		.bind("click", function() {_select(0);}))
	);
	_pane.appendTo(_bk);
	
	function _select(n) {
		_pane.css("top", angular.element($window).height() + 1);
		_bk.css("display", "none");
		_selected(n);
	}
	
	function _show(c) {
		_bk.css("display", "block");
		_selected = c || angular.noop;
		_pane.animate({top: angular.element($window).height() - 80}, {
			speed: "slow",
			queue: false
		});
	}
	
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			var _able = false,
			_ele = angular.element("<i></i>").css({
				"position": "absolute",
				"margin": "-4px auto auto 44px",
				"background": "transparent url(img/remove.png) no-repeat 0 0",
				"width": "10px",
				"height": "10px",
				"cursor": "pointer",
				"display": "none"
			}).insertBefore(element);
			touch.on(element, "touchstart", function(e) {
				e.preventDefault();
			});
			touch.on(element, "hold", function(e) {
				if (!_able) {
					_able = true;
					_ele.css("display", "inline-block");
					_show(function(n) {
						if (n == 1) {
							var item = attrs.myTouchRemove.substr(attrs.myTouchRemove.indexOf("(") + 1);
							item = $.trim(item.substring(0, item.lastIndexOf(")"))), r = {};
							r[item] = ($parse(item))(scope);
							($parse(attrs.myTouchRemove))(scope, r);
						} else {
							_ele.css("display", "none");
							_able = false;
						}
					});
				}
			});
			scope.$on("$destroy", function() {
				touch.off(element, "hold");
				touch.off(element, "touchstart");
			});
		}
	};
}])
.directive("myTouchZoom", function() {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			var _scale = 1, _translateX = 0, _translateY = 0, scale = "", translate = "";

			touch.on(element, "touchstart", function(e) {
				e.preventDefault();
			});
			touch.on(element, "pinchstart", function(e) {
				_translateX = 0;
				_translateY = 0;
				translate = "";
			});
			touch.on(element, "pinch", function(e) {
				_scale += (e.scale - 1);
				if (_scale < 1) _scale = 1;
				else if (_scale > 20) _scale = 20;
				scale =  " scale(" + _scale + ")";
				var s = translate + scale;
				element.css({
					"transform": s,
					"-ms-transform": s,
					"-moz-transform": s,
					"-webkit-transform": s,
					"-o-transform": s
				});
			});
			touch.on(element, "swiping", function(e) {
				if (_scale > 1) {
					translate = "translate(" + (e.distanceX + _translateX) + "px," + (e.distanceY + _translateY) + "px)";
					var t = translate + scale;
					element.css({
						"transform": t,
						"-ms-transform": t,
						"-moz-transform": t,
						"-webkit-transform": t,
						"-o-transform": t
					});
				}
			});
			touch.on(element, "swipeend", function(e) {
				_translateX += e.distanceX;
				_translateY += e.distanceY;
			});
			scope.$on("$destroy", function() {
				touch.off(element, "swipeend");
				touch.off(element, "swiping");
				touch.off(element, "pinch");
				touch.off(element, "pinchstart");
				touch.off(element, "touchstart");
			});
		}
	};
})
.factory("fileSystem", ["$window", function($window) {
	var _root, _dir, _dirName = ".bims.h5.cache";
	
	function _error(error) {
		if (angular.isString(error)) {
			if (error != "no image selected")
				tipmessage("发生错误："+ error, "erroTip");
		} else if(angular.isObject(error)) {
			if (error.code != 3)
				tipmessage("发生错误, Code:" + error.code, "erroTip");
		}
	}
	
	if ($window.requestFileSystem) {
		$window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			_root = fileSystem.root;
			_root.getDirectory(_dirName, {create: true, exclusive: false}, function(dirEntry) {
				_dir = dirEntry;
			}, _error);
		}, _error);
	}
	
	return {
		clear: function() {
			if (_dir) {
				_dir.removeRecursively(function() {
					_dir = null;
					_root.getDirectory(_dirName, {create: true, exclusive: false}, function(dirEntry) {
						_dir = dirEntry;
						tipmessage("数据清除了", "clearTip");
					}, _error);
				}, _error);
			}
		},
		create: function(url, c) {
			$window.resolveLocalFileSystemURL(url, function (file) {
				file.copyTo(_dir, (new Date()).getTime() + file.name.substr(file.name.lastIndexOf('.')), function(f) {
					(c || angular.noop)(f.toURL());
				}, _error);
			}, _error);
		}
	};
}])
.directive("myMediaSelector", ["$window", "$parse", "$timeout", "fileSystem", function($window, $parse, $timeout, fileSystem) {
	var _pane = angular.element("<div></div>").css({
		"width": "100%",
		"height": "100%",
		"position":"absolute",
		"top":"0",
		"left":"0",
		"background":"rgba(0,0,0,0.4)",
		"z-index":"999",
		"display":"none"
	}).bind("click", function(){_select(0);}).appendTo("body");
	
	var btns = angular.element("<div></div>").css({
		"background-color": "rgba(204,204,204,.5)",
		"width": "100%",
		"height": "120px",
		"position": "absolute",
		"top": angular.element($window).height() + 1
	})
	.append(angular.element("<p></p>").css("margin", 0).append(
		angular.element("<button>拍摄</button>")
		.css({
			"margin-top": "5px",
			"width": "100%",
			"height":"30px"
		})
		.bind("click", function() {_select(1);}))
	)
	.append(angular.element("<p></p>").css("margin", 0).append(
		angular.element("<button>从相册选择</button>")
		.css({"width":"100%", "margin-top":"5px","height":"30px"})
		.bind("click", function() {_select(2);}))
	)
	.append(angular.element("<p></p>").css("margin", 0).append(
		angular.element("<button>取消</button>")
		.css({
			"width": "100%",
			"margin-top": "5px",
			"height":"30px"
		})
		.bind("click", function() {_select(0);}))
	), 	_selected;
	
	_pane.append(btns);
	
	function _error(error) {
		if (angular.isString(error)) {
			if (error != "no image selected")
				tipmessage("发生错误："+error, "erroTip");
		} else if(angular.isObject(error)) {
			if (error.code != 3)
				tipmessage("发生错误,Code:"+error.code, "erroTip");
		}
	}
	
	function _select(n) {
		btns.css("top", angular.element($window).height() + 1);
		_pane.css("display", "none");
		_selected(n);
	}
	
	function _show(c) {
		btns.css("top", angular.element($window).height() + 1);
		_pane.css("display", "inline-block");
		_selected = c || angular.noop;
		btns.animate({top: angular.element($window).height() - 120}, {
			speed: "slow",
			queue: false
		});
	}

	function _captureVideo(files, scope, change) {
		tipmessage1(message="文件生成中",img="<img src='img/loading.gif';><br/>",id="tipimg");
		for (var i = 0; i < files.length; i++) {
			fileSystem.create("file:///" + files[i].fullPath, function(url) {
				scope.$apply(change(scope, {$uri: url}));
			});
		}
		closetipmessage1("tipimg");
	}
	
	function _selectMedia(uri, scope, change) {
		fileSystem.create(uri, function(url) {
			scope.$apply(change(scope, {$uri: url}));
		});
	}
	
	return {
		restrict: "AE",
		transclude: true,
		replace: true,
		template: "<span></span>",
		compile: function(t, a) {
			var data = {};
			angular.element("<img/>")
			.attr({
				"src": a["src"],
				"class": a["class"]
			})
			.css("cursor", "pointer")
			.appendTo(t);
			t.removeAttr("src class type change");
			return {
				post: function(scope, element, attrs) {
					element.bind("click", function() {
						_show(function(n) {
							if (n != 0) {
								if ( (attrs.type || "img").toLowerCase() == "video") {
									if (n == 1) {
										data.op = (navigator && navigator.device) ? navigator.device.capture.captureVideo : angular.noop;
										data.opt = {limit: 1};
										data.success = function(files) {
											_captureVideo(files, scope, $parse(attrs.change));
										};
									} else {
										data.op = (navigator && navigator.camera) ? navigator.camera.getPicture : angular.noop;
										data.opt = {
											destinationType: 1,	//Camera.DestinationType.FILE_URI
											sourceType: 2,	//SAVEDPHOTOALBUM
											mediaType: 1	//VIDEO
										};
										data.success = function(uri) {
											_selectMedia(uri, scope, $parse(attrs.change));
										};
									}
								} else {
									data.op = (navigator && navigator.camera) ? navigator.camera.getPicture : angular.noop;
									data.opt = {
										quality: 50,
										destinationType: 1,
										sourceType: n == 1 ? 1 : 2,
										targetWidth: 800,
										targetHeight: 600,
										mediaType: 0
									};
									data.success = function(uri) {
										_selectMedia(uri, scope, $parse(attrs.change));
									};
								}
								data.op(data.success, _error, data.opt);
							}
						});
					});
				}
			};
		}
	};
}])
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
				if ((element.offset().top + element.height()) - (win.height() + win.scrollTop()) < 0)
					scope.$apply(attrs.myScroll);
			}
			win.on('scroll', function(e) {
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
			})
			.css({"margin-top":"5px","vertical-align":"bottom"})
			.appendTo(element);
		}
	};
}])
.factory("transferCache", ["$rootScope", function($rootScope) {
	var _key = "transferQ", _value = {list: [], count: 0}, _ls = window.localStorage || {}, _view;
	 
	(function() {
		var v = _ls[_key], i;
		if (v) {
			_value = JSON.parse(v);
			if (angular.isArray(_value.list)) {
				if (_value.list.length == 0) _value.count = 0;
			} else {
				_value.list = [];
				_value.count = 0;
			}
			for (i = 0; i < _value.list.length; i++) {
				_value.list[i]._status = "o1";
				_value.list[i]._statusText = "未上传";
			}
		}
	})();

	function _save() {
		_ls[_key] = JSON.stringify(_value);
	}
	 
	return {
		list: function() {
			if (_view || false) return _view;
			_view = [];
			for (var i = 0; i < _value.list.length; i++)
				if ((_value.list[i]._user || $rootScope.user.id) == $rootScope.user.id)
					_view.push(_value.list[i]);
			return _view;
		},
		get: function() {
			if (_value.list.length > 0) {
				for (var i = 0; i < _value.list.length; i++) {
					if (_value.list[i]._status == "o2") return false;
				}
				return _value.list[_value.list.length - 1];
			}
			return false;
		},
		push: function(item, type, update) {
			var e = angular.extend(item, {
				_index: _value.count++,
				_type: type || 'redian',
				_status: "o1",
				_statusText: "未上传",
				_user: $rootScope.user.id,
				_time: new Date(),
				_update: update == "update"
			});
			tipmessage("开始保存");
			_value.list.push(e);
			_save();
			tipmessage("成功结束");
			if (_view || false) _view.push(e);
			return e;
		},
		remove: function(item) {
			for (var i = 0; i < _value.list.length; i++) {
				if (_value.list[i]._index == item._index) {
					_value.list.splice(i, 1);
					_save();
					if (_view || false) {
						for (i = 0; i < _view.length; i++) {
							if (_view[i]._index == item._index) {
								_view.splice(i, 1);
								break;
							}
						}
					}
					if (window.resolveLocalFileSystemURL) {
						var uris = item.picAttachmentList.concat(item.videoAttachmentList), j;
						for (j = 0; j < uris.length; j++) {
							if (uris[j].id || false) continue;
							window.resolveLocalFileSystemURL(uris[j].fileUrl, function (file) {
								file.remove(angular.noop, angular.noop);
							});
						}
					}
					break;
				}
			}
		},
		clear: function() {
			 _value = {list: [], count: 0};
			 _view = null;
			 _save();
		},
		save: _save
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
	
	$rootScope.origionVersion = "0.0.4.0109_beta";
	$rootScope.hasChecked = false;
	$rootScope.autoUpdateOnWiffi = false;
//	$rootScope.videoThumbnail = "http://101.201.141.1/bims-test/images/default_play.jpg";
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
	$rootScope.component ={};
	$rootScope.notice = {};
	$rootScope.hotfocus = {};
	$rootScope.trace = {};
	$rootScope.news = {};
	$rootScope.sect = {};
	$rootScope.issues = {};
	$rootScope.issue = {};
	$rootScope.onepage = {id: "about"};

	$rootScope.setting ={
			installer : "",
			currentVersion:"",
			versionTitle:"",
			versionRemark:"",
			lastVersion:""
	};
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
		};
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
	
	function _transfer(fileURI, fileType, topicType, callback) {
		var url = encodeURI(_base + "attachment/uploadForH5.jo;jsessionid=" + _sessionId + "?fileType=" + fileType + "&topicType=" + topicType + "&showName=&thumbnailUri=&title=&content="),
		ft = (window.FileTransfer) ? new FileTransfer() : {upload: angular.noop, abort: angular.noop},
		opt = (window.FileUploadOptions) ? new FileUploadOptions() : {};
		opt.fileKey = "file";
		opt.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
		opt.mimeType = "multipart/form-data";
		opt.chunkedMode = false;
		ft.upload(fileURI, url, function(r) {
			callback(JSON.parse(r.response), fileURI);
		}, function() {
			callback(false, fileURI);
		}, opt);
		
		return ft;
	}
	
	function _uploadAttachments(item, callback, transferCallback) {
		var pics, videos, o = angular.extend({}, item), 	total, counter = 0, i, loops;
		if(item.topicType == 3) {
			pics = item.issuePicAttachmentList;
			videos = item.issueVideoAttachmentList;
			o.issueTotalAttachmentList = [];
			o.issuePicAttachmentList = [];
			o.issueVideoAttachmentList = [];
		} else {
			pics = item.picAttachmentList;
			videos = item.videoAttachmentList;
			o.attachments = [];
			o.picAttachmentList = [];
			o.videoAttachmentList = [];
		}
		loops = (pics || false) ? pics.length : 0;
		total = loops;
		for (i = 0; i < loops; i++) {
			if (pics[i].id || false) {
				if(item.topicType == 3) {
					o.issueTotalAttachmentList.push(pics[i]);
					o.issuePicAttachmentList.push(pics[i]);
				} else {
					o.attachments.push(pics[i]);
					o.picAttachmentList.push(pics[i]);
				}
				counter++;
			} else {
				(transferCallback || angular.noop)(pics[i].fileUrl, _transfer(pics[i].fileUrl, 2, item.topicType, function(d, url) {
					if (d) {
						if (item.topicType == 3) {
							o.issueTotalAttachmentList.push(d);
							o.issuePicAttachmentList.push(d);
						} else {
							o.attachments.push(d);
							o.picAttachmentList.push(d);
						}
					}
					(transferCallback || angular.noop)(url, false);
					counter++;
				}));
			}
		}
		loops = ((videos || false) ? videos.length : 0);
		total += loops;
		for (i = 0; i < loops; i++) {
			if (videos[i].id || false) {
				if (item.topicType == 3) {
					o.issueTotalAttachmentList.push(videos[i]);
					o.issueVideoAttachmentList.push(videos[i]);
				} else {
					o.attachments.push(videos[i]);
					o.videoAttachmentList.push(videos[i]);
				}
				counter++;
			} else {
				(transferCallback || angular.noop)(videos[i].fileUrl, _transfer(videos[i].fileUrl, 3, item.topicType, function(d, url) {
					if (d) {
						if(item.topicType == 3) {
							o.issueTotalAttachmentList.push(d);
							o.issueVideoAttachmentList.push(d);
						} else {
							o.attachments.push(d);
							o.videoAttachmentList.push(d);
						}
					}
					(transferCallback || angular.noop)(url, false);
					counter++;
				}));
			}
		}
		$timeout(function _fn_waiting_attachment() {
			if (counter < total) $timeout(_fn_waiting_attachment, 200);
			else (callback || angular.noop)(o);
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
			},
			search: function(count,num, t, c) {
				_req({
					method: "post",
					url: "notice/search.jo",
					data: {
						pageCnt: count,
						pageNum: num,
						title: t
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			get:function(id, c){
				_req({
					method: "get",
					url: "notice/get.jo",
					params: {
						id: id
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
			search: function(t,p,c) {
				_req({
					method: "post",
					url: "hotfocus/search.jo",
					data: {
						title:t,
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
			},
			update: function(d, c) {
				_req({
					method: "post",
					url: "hotfocus/update.jo",
					data: d
				}, angular.isFunction(c) ? c : angular.noop);
			},
			//id is issue ID
			remove: function(id, c) {
				_req({
					method: "delete",
					url: "hotfocus/delete.jo",
					params: {
						id:parseInt(id)
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		component: {
			get: function(i,c){
				_req({
					method: "get",
					url: "component/get.jo",
					params: {
						compId: i
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		trace: {
			create: function(d, c) {
				_req({
					method: "post",
					url: "trace/create.jo",
					data: d
				}, angular.isFunction(c) ? c : angular.noop);
			},
			list: function(p,t, c) {
				_req({
					method: "get",
					url: "trace/list.jo",
					params: {
						pageNum: p,
						traceType:t
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			search: function(t, p, tt,c) {
				_req({
					method: "post",
					url: "trace/searchTraceByTitle.jo",
					data: {
						title:t,
						pageNum: p,
						traceType: tt 
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			get: function(i,c) {
				_req({
					method: "get",
					url: "trace/getById.jo",
					params: {
						id: i
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			getByCompId:function(i,pn,t, c){
				_req({
					method: "get",
					url: "trace/getByCompId.jo",
					params:{
						compId:i,
						pageNum:pn,
						traceType:t
						
					}
				}, angular.isFunction(c) ? c: angular.noop);
			},
			
			update: function(d, c) {
				_req({
					method: "post",
					url: "trace/update.jo",
					data: d
				}, angular.isFunction(c) ? c : angular.noop);
			},
			//id is issue ID
			remove: function(id, c) {
				_req({
					method: "delete",
					url: "trace/delete.jo",
					params: {
						id:parseInt(id)
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			picsList: function(c) {
				_req({
					method: "get",
					url: "trace/getTracePicturesList.jo"
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
			search:function(s,t,pn,st,cat, c){
				if(cat ==0){
					_req({
						method: "post",
						url: "issue/searchissue.jo",
						data:{
							sectionId: s,
							issueType: t,
							pageNum: pn,
							issueTitle:st
						}
					}, angular.isFunction(c) ? c : angular.noop);
				}else{
					_req({
						method: "post",
						url: "issue/searchissue.jo",
						data:{
							sectionId: s,
							issueType: t,
							pageNum: pn,
							publisherCat: cat,
							issueTitle:st
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
			},
			all: function(c) {
				_req({
					method: "get",
					url: "section/listAllSections.jo"
				}, angular.isFunction(c) ? c : angular.noop);
			},
			get: function(id, c) {
				_req({
					method: "get",
					url: "section/getSectionById.jo",
					params: {
						sectionId: id
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
		removeFiles: function(fileURIs) {
			if (window.resolveLocalFileSystemURL) {
				for (var i = 0; i < fileURIs.length; i++) {
					window.resolveLocalFileSystemURL(fileURIs[i].fileUrl, function (file) {
						file.remove(angular.noop, angular.noop);
					});
				}
			}
		},
		setting:{
			getVersion:function(p, c){
				_req({
					method: "get",
					url: "version/getVersion.jo",
					params: { 
						platform:p 
					}
				}, angular.isFunction(c) ? c : angular.noop);
			}
		},
		transfer: _transfer,
		uploadAttachments: _uploadAttachments,
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
.directive("myAutoTransfer", ["$rootScope","$interval", "$timeout", "$window", "transferCache", "model", function($rootScope, $interval, $timeout, $window, transferCache, model) {
	var  _transfers = {};
	
	function _transfer() {
//		tipmessage("upload checkinging...", "tiploading");
		var item = transferCache.get();
		if (item) {
			tipmessage("uploading...", "tiploading");
			item._status = "o2";
			item._statusText = "上传中";
			model.uploadAttachments(item, function(i) {
				var op;
				switch(i._type) {
					case "redian":
						op = i._update ? model.hotfocus.update : model.hotfocus.create;
						break;
					case "spotcheck":
						op = i._update ? model.trace.update : model.trace.create;
						break;
					case "issue":
						op = i._update ? model.issues.update : model.issues.create;
						break;
					default:
						op = angular.noop;
				}
				delete i._index;
				delete i._type;
				delete i._status;
				delete i._statusText;
				delete i._user;
				delete i._time;
				delete i._update;
				op(i, function(d) {
					if (d) {
						model.removeFiles(item.picAttachmentList.concat(item.videoAttachmentList));
						transferCache.remove(item);
					}
				});
			}, function(url, transfer) {
				if (transfer) _transfers[url] = transfer;
				else delete _transfers[url];
			});
		}
	}
	
	return {
		restrict: "E",
		transclude: true,
		replace: true,
		link: function (scope, element, attrs) {
			var id = $interval(function() {
				if($rootScope.user && $rootScope.user.name) {
					if ((($window.localStorage && localStorage["autoUpdateOnWiffi"] == "true") || false) && (($window.navigator && navigator.network) ? navigator.network.connection.type == Connection.WIFI : false))
						$timeout(_transfer);
					else {
						angular.forEach(_transfers, function(transfer) {
							transfer.abort();
						});
						_transfers = {};
					}
				}
			}, attrs.interval ? parseInt(attrs.interval) : 2000, 0, false);
			
			scope.$on("$destroy", function() {
				$interval.cancel(id);
			});
		}
	};
}])
.controller("cAutoTransfer", ["$scope", function($scope) {}])
.controller("cLoading", ["$scope", "$document", "$rootScope","model", function($scope, $document, $rootScope, model) {
	$rootScope.myHeaderPosition = "fixed";
	$scope.displayLoading = function() {
		if($scope.loading ){
			tipmessage1(message="努力加载中",img="<img src='img/loading.gif';><br/>",id="tipimg");
		}else{
			closetipmessage1(id="tipimg");
		}
		return $scope.loading ? "block" : "none";
	};
	$scope.onHide = function(){
		$rootScope.myHeaderPosition = "fixed";
	};
	$scope.onShow = function(){
		$rootScope.myHeaderPosition = "relative";
	};
}])
.controller("cLogin", ["$scope", "model", function($scope, model) {
	if (window.localStorage) {
		$scope.username = localStorage["username"];
		$scope.password = localStorage["password"];
	}
	$scope.login = function() {
		if(!$scope.userForm.$valid){
        	tipmessage("请输入用户名和密码");
        	return;
        }
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
			} else {
				tipmessage("无效的用户名和密码。", "invalidUP");
			}
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
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			if ($scope.user.password != $scope.password0) {
				tipmessage("请输入正确的密码！", "wrongPwd");
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
				} else {
					tipmessage("用户已经存在！", "existedUser");
				}
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
.controller("cMain", ["$scope", "$rootScope","$timeout", "model", function($scope, $rootScope, $timeout, model) {
	//设置wiffi状态下是否自动上传。。。
	if (window.localStorage) {
		var wiffi = localStorage["autoUpdateOnWiffi"] || false;
		if(wiffi == "true"){
			$rootScope.autoUpdateOnWiffi = true;
		}else{
			$rootScope.autoUpdateOnWiffi = false;
		}
	}
	else $rootScope.autoUpdateOnWiffi = false;
	
	angular.extend($scope, {
		items: [],
		itemClass: function(item) {
			if (item.important == "重要") return "z1";
			if (item.important == "紧急") return "z2";
			return "z3";
		},
		redianClick: function() {
			$scope.$location.path("/redian");
		},
		setting:{
			installer : "",
			currentVersion:"",
			versionTitle:"",
			versionRemark:"",
			lastVersion:""
		},
		onInstall:function(){
			if($scope.hasNewVersion){
				//post to outside browser to open url
				window.open($scope.setting.installer,"_system");
			}
			
		},
		popUpdateWin:function(){
			$("#zoomscroll").addClass("loaded").animate({opacity:1},200);
			$(document.body).addClass("noscroll");
			$(".txt-25 a").click(function(){
				$(".pop-window1").animate({height:0},50);
				$("#zoomscroll").animate({opacity:0},200);
				setTimeout(function(){$('#zoomscroll').removeClass('loaded');$(document.body).removeClass("noscroll");$("#zoom").html("");},400);
				onInstall();
			});
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
			if(d.length > 0) {
				$scope.issues.first = d[0];
			}
			if (d.length > 1) $scope.issues.second = d[1];
		}
	});

	if(!$rootScope.hasChecked && window.device){
		var platform = 1;
		switch(window.device.platform){
		case 'iPhone':
			platform = 1;
			break;
		case 'Android':
			platform = 2;
			break;
		}
		model.setting.getVersion(platform, function(d){
		if(d){//
			$rootScope.hasChecked = true;
			$scope.setting.currentVersion = d.version;
			$scope.setting.versionTitle = d.title;
			$scope.setting.versionRemark = d.remark;
			if(d.url){
				$scope.setting.installer = d.url;
			}
			
			$scope.setting.lastVersion = $scope.origionVersion;
			if(d.version != $scope.setting.lastVersion){
				$scope.hasNewVersion = true;
				$scope.popUpdateWin();
			}
		}
	  });
	}else{
		$scope.setting.lastVersion = "0.0.1";
	}
	
}])
.controller("cGonggao", ["$scope", "model", function($scope, model) {
	var _page = 0;
	angular.extend($scope, {
		page: 1,
		data: [],
		filterChanged:false,
		filterTitle:"",
		load: function() {
			if($scope.filterChanged){
				if (_page != $scope.page) {
					_page = $scope.page;
					model.notice.search(20, $scope.page, $scope.filterTitle, function(d, s) {
						if (d && d.length > 0) {
							for (var i = 0; i < d.length; i++)
								$scope.data.push(d[i]);
							$scope.page++;
						}
					});
				}
			}else{
				if (_page != $scope.page) {
					_page = $scope.page;
					model.notice.list(20, $scope.page, function(d, s) {
						if (d && d.length > 0) {
							for (var i = 0; i < d.length; i++)
								$scope.data.push(d[i]);
							$scope.page++;
						}
					});
				}
			}
		},
		search:function(){
			$scope.filterChanged = $scope.filterTitle.length == 0? false:true;
			$scope.page = 1;
			_page = 0;
			$scope.data.length = 0;
			$scope.load();
		},
		getImg: function(url) {
			var uri = model.base();
			return url ? url.replace(/^[\/]*bims-test/g, uri).replace(/^[\/]*bims/g, uri) : null;
		}
	});
}])
.controller("cGonggaoxiangqing", ["$scope", "model", function($scope, model) {
	//Get latest data
	model.notice.get($scope.notice.current.id, function(d) {
		if(d) {
			var uri = model.base();
			d.content = d.content
			.replace(/img src="\/bims-test/g, "img src=\"" + uri)
			.replace(/img src="\/bims/g, "img src=\"" + uri);
			$scope.notice.current = d;
			$scope.voteMembers = (isBlankString($scope.notice.current.voteUsersX))? [] : $scope.notice.current.voteUsersX.split(",");
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
			    
			    if($scope.isVote) {
			    		//Judge whether is voted or not
				    	model.vote.isVoted($scope.notice.current.id, $scope.notice.current.topicType, function(d) {
				    		if(d) {
				    			$scope.isVote = true;
				    		} else {
				    			$scope.isVote = false;
				    		}
				    	});
			    }
		    }
		}
	});
	angular.extend($scope, {
		_page: 0,
		page: 1,
		comments: [],
		isVote:false,
		voteMembers:[],
		voteMemberStr:"",
		load: function() {
			if ($scope._page != $scope.page) {
				$scope._page = $scope.page;
				model.comment.list($scope.notice.current.id, $scope.notice.current.topicType, $scope.page, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.comments.push(d[i]);
						$scope.page++;
					}
				});
			}
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
		},
		
		topicId:$scope.notice.current.id,
		topicType:$scope.notice.current.topicType,
		doLike:function(){
			if(!$scope.isVote){
				model.vote.doLike($scope.topicId, $scope.topicType, function(d){
					$scope.voteMembers.push($scope.user.name);
					$scope.isVote = true;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
				
			}else{
				if($scope.voteMembers.length <=0) return;
				model.vote.disLike($scope.topicId, $scope.topicType, function(d){
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
}])
.controller("cRedian", ["$scope", "model", function($scope, model) {
	var _page = 0;
	angular.extend($scope, {
		page: 1,
		filterChanged:false,
		filterTitle:"",
		items: [],
		load: function() {
		if($scope.filterChanged){
			if (_page != $scope.page) {
				_page = $scope.page;
				model.hotfocus.search($scope.filterTitle, $scope.page, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.items.push(d[i]);
						$scope.page++;
					}
				});
			}
		}else{
			if (_page != $scope.page) {
				_page = $scope.page;
				model.hotfocus.list($scope.page, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.items.push(d[i]);
						$scope.page++;
					}
				});
			}
		}
		},
		search:function(){
			$scope.filterChanged = true;
			$scope.page = 1;
			_page = 0;
			$scope.items.length = 0;
			$scope.load();
		},
		itemClick: function(item) {
			$scope.hotfocus.current = item;
			$scope.$location.path("/redianxiangqing");
		}
	});
}])
.controller("cRedianxiangqing", ["$scope", "model", function($scope, model) {
	$scope.voteMembers = (isBlankString($scope.hotfocus.current.voteUsersX))? [] : $scope.hotfocus.current.voteUsersX.split(",");
	if($scope.voteMembers.length > 0) {
		$scope.voteMemberStr = $scope.voteMembers.join("，"); 
		if($scope.voteMembers.length > 0) {
			$scope.voteMemberStr = $scope.voteMembers.join("，"); 
			for (var x in $scope.voteMembers) {
				if($scope.voteMembers[x] == $scope.user.name) {
					$scope.isVote = true;
					break;
				}
			}
		}
		if($scope.isVote) {
			//Judge whether is voted or not
			model.vote.isVoted($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, function(d) {
				if(d) $scope.isVote = true;
				else $scope.isVote = false;
			});
		}
	}
	angular.extend($scope, {
		_page: 0,
		page: 1,
		comments: [],
		isVote:false,
		voteMembers:[],
		voteMemberStr:"",
		load: function() {
			if ($scope._page != $scope.page) {
				$scope._page = $scope.page;
				model.comment.list($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, $scope.page, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.comments.push(d[i]);
						$scope.page++;
					}
				});
			}
		},	
		topicId: $scope.hotfocus.current.id,
		topicType: $scope.hotfocus.current.topicType,
		doLike:function(){
			if(!$scope.isVote){
				model.vote.doLike($scope.topicId, $scope.topicType, function(d){
					$scope.voteMembers.push($scope.user.name);
					$scope.isVote = true;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
			} else {
				if($scope.voteMembers.length <=0) return;
				model.vote.disLike($scope.topicId, $scope.topicType, function(d){
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
		del : function(){
			model.hotfocus.remove($scope.hotfocus.current.id, function(d){
				if(d){
					$scope.tipContent = "删除成功";
					$scope.tipVisibility = "block";
					$timeout(function(){
						$scope.$location.path("/redian");
					} ,1000);
				}else{
					$scope.tipContent = "删除失败";
					$scope.tipVisibility = "block";
					$timeout(function(){
						$scope.tipVisibility = "none";
					} ,1000);
				}
			});
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
}])
.controller("cRedianEdit", ["$scope", "$timeout", "model","transferCache", function($scope, $timeout, model, transferCache) {
	function _removeAttachment(id, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id == id) {
				arr.splice(i, 1);
				for (i = 0; i < $scope.hotfocus.current.attachments.length; i++) {
					if ($scope.hotfocus.current.attachments[i].id == id) {
						$scope.hotfocus.current.attachments.splice(i, 1);
						break;
					}
				}
				$scope.$apply();
				break;
			}
		}
	}
	
	angular.extend($scope, {
		tipVisibility: "none",
		remain: 150,
		removeImage: function(id) {
			_removeAttachment(id, $scope.hotfocus.current.picAttachmentList);
		},
		removeVideo: function(id) {
			_removeAttachment(id, $scope.hotfocus.current.videoAttachmentList);
		},
		changed: function() {
			$scope.remain = 150 - ($scope.hotfocus.current.content && $scope.hotfocus.current.content.length);
		},
		removeImage: function(url) {
			for (var i = 0; i < $scope.hotfocus.current.picAttachmentList.length; i++) {
				if ($scope.hotfocus.current.picAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.hotfocus.current.picAttachmentList[i]]);
					$scope.hotfocus.current.picAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		removeVideo: function(url) {
			for (var i = 0; i < $scope.hotfocus.current.videoAttachmentList.length; i++) {
				if ($scope.hotfocus.current.videoAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.hotfocus.current.videoAttachmentList[i]]);
					$scope.hotfocus.current.videoAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		imageChanged: function(uri) {
			$scope.hotfocus.current.picAttachmentList.push({
				fileUrl: uri,
				thumbnailUrl: uri
			});
		},
		videoChanged: function(uri) {
			$scope.hotfocus.current.videoAttachmentList.push({
				fileUrl: uri,
				thumbnailUrl: uri
			});
		},
		submit: function() {
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			model.uploadAttachments($scope.hotfocus.current, function(item) {
				model.hotfocus.update(item, function(d) {
					if (d) {
						tipmessage("修改成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
			});
		},
		save: function() {
			transferCache.push($scope.hotfocus.current, "redian", "update");
			tipmessage("保存成功");//是否需要返回值？
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cRediantianjia", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	angular.extend($scope, {
		tipVisibility: "none",
		newItem: {
			topicType: 2,
			picAttachmentList: [],
			videoAttachmentList: []
		},
		remain: 150,
		removeImage: function(url) {
			for (var i = 0; i < $scope.newItem.picAttachmentList.length; i++) {
				if ($scope.newItem.picAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.newItem.picAttachmentList[i]]);
					$scope.newItem.picAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		removeVideo: function(url) {
			for (var i = 0; i < $scope.newItem.videoAttachmentList.length; i++) {
				if ($scope.newItem.videoAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.newItem.videoAttachmentList[i]]);
					$scope.newItem.videoAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		changed: function() {
			$scope.remain = 150 - $scope.newItem.content.length;
		},
		imageChanged: function(uri) {
			$scope.newItem.picAttachmentList.push({
				fileUrl: uri,
				thumbnailUrl: uri
			});
		},
		videoChanged: function(uri) {
			$scope.newItem.videoAttachmentList.push({
				fileUrl: uri,
				thumbnailUrl: uri
			});
		},
		submit: function() {
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			model.uploadAttachments($scope.newItem, function(item) {
				model.hotfocus.create(item, function(d) {
					if (d) {
						model.removeFiles($scope.newItem.picAttachmentList.concat($scope.newItem.videoAttachmentList));
						tipmessage("创建成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
			});
		},
		save: function() {
			transferCache.push($scope.newItem, "redian");
			tipmessage("保存成功");//是否需要返回值？
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cWode", ["$scope", "$timeout", "model", "transferCache", "fileSystem", function($scope, $timeout, model, transferCache, fileSystem) {
	switch($scope.$location.path()) {
	case '/shezhi':
		//Get latest version
		$scope.hasNewVersion = false;
		if (window.localStorage) {
			var wiffi = localStorage["autoUpdateOnWiffi"] || false;
			if(wiffi == "true"){
				$scope.autoUpdateOnWiffi = true;
			}else{
				$scope.autoUpdateOnWiffi = false;
			}
		}
		else $scope.autoUpdateOnWiffi = false;
		angular.extend($scope, {
			clear: function() {
				transferCache.clear();
				fileSystem.clear();
			},
			setting:{
				installer : "",
				currentVersion:"",
				versionTitle:"",
				versionRemark:"",
				lastVersion:""
			},
			onInstall:function(){
				if($scope.hasNewVersion) {
					//post to outside browser to open url
					window.open($scope.setting.installer,"_system");
				}
			},
			setAutoUpload: function() {
				if(true && $scope.autoUpdateOnWiffi){
					$scope.autoUpdateOnWiffi = false;
				}else{
					$scope.autoUpdateOnWiffi = true;
				}
				if (window.localStorage) 
					localStorage["autoUpdateOnWiffi"] = $scope.autoUpdateOnWiffi;
			}
		});

		if(window.device) {
			var platform = 1;
			switch(window.device.platform){
			case 'iPhone':
				platform = 1;
				break;
			case 'Android':
				platform = 2;
				break;
			}
			model.setting.getVersion(platform, function(d){
				if(d){//
					$scope.setting.currentVersion = d.version;
					$scope.setting.versionTitle = d.title;
					$scope.setting.versionRemark = d.remark;
					if(d.url){
						$scope.setting.installer = d.url;
					}
					
					$scope.setting.lastVersion = $scope.origionVersion;
					if($scope.setting.currentVersion != $scope.setting.lastVersion){
						$scope.hasNewVersion = true;
					}
				}
			});
		} else $scope.setting.lastVersion = "0.0.1";
		break;
	case '/shezhi-guanyuwomen':
		$scope.onepage.id = "about";
		$scope.$location.path('/onepage');
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
	case '/shangchuanguanli':
		angular.extend($scope, {
			tipVisibility: "none",
			detailVisibility: "none",
			loadedClass: "",
			tasks: transferCache.list(),
			xiangqing: function() {
				$scope.closeDetail();
				$scope.current.id = 0;
				$scope.current.createTime = $scope.current._time;
				$scope.current.publisherName = $scope.user.name;
				if ($scope.current._type == "redian") {
					if (!($scope.current.topicType)) $scope.current.topicType = 2;
					$scope.hotfocus.current = $scope.current;
					$scope.$location.path("/redianxiangqing");
				}else if($scope.current._type == "spotcheck"){
					if (!($scope.current.topicType)) $scope.current.topicType = 8;
					$scope.trace.current = $scope.current;
					$scope.$location.path("/spotcheck-detail");
				}else if($scope.current._type == "issue"){
					if (!($scope.current.topicType)) $scope.current.topicType = 3;
					$scope.issues.currentIssue = $scope.current;
					$scope.$location.path("/issue-details");
				}
			},
			transfer: function() {
				$scope.closeDetail();
				$scope.current._status = "o2";
				$scope.current._statusText = "上传中";
				model.uploadAttachments($scope.current, function(item) {
					var op;
					switch(item._type) {
						case "redian":
							op = item._update ? model.hotfocus.update : model.hotfocus.create;
							break;
						case "spotcheck":
							op = item._update ? model.trace.update : model.trace.create;
							break;
						case "issue":
							op = item._update ? model.issues.update : model.issues.create;
							break;
						default:
							op = angular.noop;
					}
					delete item._index;
					delete item._type;
					delete item._status;
					delete item._statusText;
					delete item._user;
					delete item._time;
					delete item._update;
					op(item, function(d) {
						if (d) {
							model.removeFiles($scope.current.picAttachmentList.concat($scope.current.videoAttachmentList));
							tipmessage("上传成功");
							transferCache.remove($scope.current);
							$timeout(function() {
								$scope.tipVisibility = "none";
							}, 1000);
						} else tipmessage("上传失败");
					});
				});
			},
			remove: function() {
				$scope.closeDetail();
				transferCache.remove($scope.current);
				tipmessage("删除成功");
			},
			detail: function(task) {
				if (task._status == "o1") {
					$scope.current = task;
					$scope.loadedClass = "loaded";
					angular.element(document.body).addClass("noscroll");
					$scope.detailVisibility = "block";
				}
			},
			closeDetail: function() {
				$scope.loadedClass = "";
				angular.element(document.body).removeClass("noscroll");
				$scope.detailVisibility = "none";
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
	var _page = 0;
	angular.extend($scope, {
		page: 1,
		list: [],
		load: function() {
			if (_page != $scope.page) {
				_page = $scope.page;
				model.news.list($scope.page, function(d) {
					if(d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.list.push(d[i]);
						$scope.page++;
					}
				});
			}
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
	var s = $scope.issues.currentSectId,
	t = $scope.issues.currentIssueType,
	lastLoaded = 0;

	angular.extend($scope, {
		page: 1,
		items: [],
		myPublisherCat: 0,
		filterChanged:false,
		filterTitle:"",
		load: function() {
			if($scope.filterChanged){
				if ($scope.page != lastLoaded) {
					lastLoaded = $scope.page;
					model.issues.search(s, t, $scope.page, $scope.filterTitle, $scope.myPublisherCat, function(d) {
						if (d && d.length > 0) {
							for (var i = 0; i < d.length; i++)
								$scope.items.push(d[i]);
							$scope.page++;
						}
					});
				}
			}else{
				if ($scope.page != lastLoaded) {
					lastLoaded = $scope.page;
					model.issues.list(s, t, $scope.page, $scope.myPublisherCat, function(d) {
						if (d && d.length > 0) {
							for (var i = 0; i < d.length; i++)
								$scope.items.push(d[i]);
							$scope.page++;
						}
					});
				}
			}
			
		},
		search:function(){
			$scope.filterChanged = true;
			$scope.page = 1;
			lastLoaded = 0;
			$scope.items.length = 0;
			$scope.load();
		},
		issueClick: function(n) {
			$scope.issues.currentIssue = n;
			$scope.$location.path("/issue-details");
		},
		filterClick: function(n) {
			$scope.items = [];
			$scope.page = 1;
			lastLoaded = 0;
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
		}
	});
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

		    $scope.voteMembers = (isBlankString($scope.issueItem.voteUsersX))?[]:$scope.issueItem.voteUsersX.split(",");
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
			    	});
		    	}
		}
	});
	
	$scope._page = 0;
	$scope.page = 1;
	$scope.comments =[];
	$scope.load = function() {
		if ($scope._page != $scope.page) {
			$scope._page = $scope.page;
			model.comment.list($scope.issueItem.id,$scope.Constants.TOPICTYPE_ISSUE, $scope.page, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.comments.push(d[i]);
					$scope.page++;
				}
			});
		}
	};
	
	angular.extend($scope, {
		topicId:$scope.issues.currentIssue.id,
		topicType:$scope.Constants.TOPICTYPE_ISSUE,

		doLike:function(){
			if(!$scope.isVote){
				model.vote.doLike($scope.topicId, $scope.topicType, function(d){
					$scope.voteMembers.push($scope.user.name);
					$scope.isVote = true;
					$scope.voteMemberStr = $scope.voteMembers.join("，"); 
				});
				
			}else{
				if($scope.voteMembers.length <=0) return;
				model.vote.disLike($scope.topicId, $scope.topicType, function(d){
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
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
	$scope._page = 0;
	$scope.load = function() {
		if ($scope._page != $scope.page) {
			$scope._page = $scope.page;
			model.comment.list($scope.issueItem.id,$scope.Constants.TOPICTYPE_ISSUE, $scope.page, function(d) {
				if (d && d.length > 0) {
					for (var i = 0; i < d.length; i++)
						$scope.comments.push(d[i]);
					$scope.page++;
				}
			});
		}
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
	
//	$scope.newIssue.issueTotalAttachmentList = [];
//	$scope.newIssue = $scope.issues.currentIssue;
//	$scope.newIssue.deadlineTime = new Date($scope.newIssue.deadlineTime);
//	$scope.issues.currentIssue.issuePicAttachmentList = $scope.issues.currentIssue.issuePicAttachmentList;
	$scope.choiceImportant = function(i){
		$scope.newIssue.important = i;
	};
	$scope.total = 0;
//	
	$scope.imageChanged = function(uri) {
		$scope.newIssue.issuePicAttachmentList.push({
			fileUrl: uri,
			thumbnailUrl: uri
		});
	};
	$scope.videoChanged = function(uri) {
		$scope.newIssue.issueVideoAttachmentList.push({
			fileUrl: uri,
			thumbnailUrl: uri
		});
	};;
		
	$scope.removeImage= function(url) {
		for (var i = 0; i < $scope.newIssue.issuePicAttachmentList.length; i++) {
			if ($scope.newIssue.issuePicAttachmentList[i].fileUrl == url) {
				model.removeFiles([$scope.newIssue.issuePicAttachmentList[i]]);
				$scope.newIssue.issuePicAttachmentList.splice(i, 1);
				$scope.$apply();
				break;
			}
		}
	},
	$scope.removeVideo=function(url) {
		for (var i = 0; i < $scope.newIssue.issueVideoAttachmentList.length; i++) {
			if ($scope.newIssue.issueVideoAttachmentList[i].fileUrl == url) {
				model.removeFiles([$scope.newIssue.issueVideoAttachmentList[i]]);
				$scope.newIssue.issueVideoAttachmentList.splice(i, 1);
				$scope.$apply();
				break;
			}
		}
	},
		
	$scope.save = function(i){
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
		transferCache.push($scope.newIssue, "issue");
			tipmessage("保存成功");//是否需要返回值？
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
	};
	$scope.submit = function(i){
		if(!$scope.form.$valid){
        	tipmessage("请检查输入内容是否正确");
        	return;
        }
		
		model.uploadAttachments($scope.newIssue, function(item) {
				model.issues.update(item, function(d) {
					if (d) {
			model.removeFiles($scope.newIssue.issuePicAttachmentList.concat($scope.newIssue.issueVideoAttachmentList));
						tipmessage("创建成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
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
		issuePicAttachmentList:[],
		issueVideoAttachmentList:[],
		issueTotalAttachmentList:[],
		issueRectification:"",
		issueTitle:"",
		deadlineTime:new Date(),
		location:"",
		topicType: 3,
		issueDesc:"",
		important:3,
		issueType : $scope.issues.currentIssueType,
		sectionId : $scope.issues.currentSectId
	};
	
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
	$scope.imageChanged = function(uri) {
		$scope.newIssue.issuePicAttachmentList.push({
			fileUrl: uri,
			thumbnailUrl: uri
		});
	};
	$scope.videoChanged = function(uri) {
		$scope.newIssue.issueVideoAttachmentList.push({
			fileUrl: uri,
			thumbnailUrl: uri
		});
	};
	$scope.removeImage= function(url) {
			for (var i = 0; i < $scope.newIssue.issuePicAttachmentList.length; i++) {
				if ($scope.newIssue.issuePicAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.newIssue.issuePicAttachmentList[i]]);
					$scope.newIssue.issuePicAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
	$scope.removeVideo=function(url) {
			for (var i = 0; i < $scope.newIssue.issueVideoAttachmentList.length; i++) {
				if ($scope.newIssue.issueVideoAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.newIssue.issueVideoAttachmentList[i]]);
					$scope.newIssue.issueVideoAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		
	$scope.save = function(i){
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
		transferCache.push($scope.newIssue, "issue");
			tipmessage("保存成功");//是否需要返回值？
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
	};
	$scope.submit = function(i){
		if(!$scope.form.$valid){
        	tipmessage("请检查输入内容是否正确");
        	return;
        }
		
		model.uploadAttachments($scope.newIssue, function(item) {
				model.issues.create(item, function(d) {
					if (d) {
			model.removeFiles($scope.newIssue.issuePicAttachmentList.concat($scope.newIssue.issueVideoAttachmentList));
						tipmessage("创建成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
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
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
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
		issueCats:[{id:0,name:"制度／方案缺陷"}, {id:1, name:"交底培训缺陷"},{id:2,name:"有章不循"},{id:4, name:"其他"}],
		issueCatsSafe:[{id:0,name:"制度／方案缺陷"}, {id:1, name:"交底培训缺陷"},{id:2,name:"有章不循"},{id:3,name:"未识别的危险源"},{id:4, name:"其他"}],
		issueItem:{
			id : $scope.issues.currentIssue.id,
			issueCategory:0,
			issueCategoryRemark:"",
			issueType:$scope.issues.currentIssue.issueType,
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
	    	if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
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
	var _lastPage = 0;
	angular.extend($scope, {
		page: 1,
		comments: [],
		load: function() {
			if ($scope.page != _lastPage) {
				_lastPage = $scope.page;
				model.comment.list($scope.news.current.id, $scope.news.current.topicType, $scope.page, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.comments.push(d[i]);
						$scope.page++;
					}
				});
			}
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
			if ($scope.files.parentId < 2) d.fileName = '搜索';
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
.controller("cHenji", ["$scope", function($scope){
	angular.extend($scope, {
		popTempTip:function(){
			tipmessage("攻城师努力建设中...");
		}
	});
}])
.controller("cOneFile", ["$scope", "model", function($scope, model) {
	if ($scope.files) {
		if ($scope.files.filepath) {
			var len = $scope.files.filepath.length - $scope.files.filepath.lastIndexOf(".") - 1;
			var ext = $scope.files.filepath.substr($scope.files.filepath.lastIndexOf(".") + 1, len).toLowerCase();
			$scope.img = (ext == 'png' || ext == 'jpg' || ext == 'gif' || ext == 'jpeg' || $scope.files.filepath.indexOf("image/") > 0);
			$scope.pdf = ext == 'pdf';
			$scope.video = (ext == "mp4" || ext =="ogg" || ext == "3gp" || ext == "mov");
		}
		if ($scope.files.filename && $scope.files.filename.length > 8)
			$scope.files.filename = $scope.files.filename.substring(0, 8) + " ...";
	}
}])
.controller("cSpotCheck", ["$scope", "model", "transferCache", "$timeout",function($scope, model, transferCache, $timeout){
	traceType = 1;
	switch($scope.$location.path()) {
	case "/spotcheck-list" ://TRACE_TYPE_SIGN = 1; //现场签认
		_page = 0;
		angular.extend($scope, {
			page: 1,
			filterChanged:false,
			filterTitle:"",
			items: [],
			load: function() {
			if($scope.filterChanged){
				if (_page != $scope.page) {
					_page = $scope.page;
					model.trace.search($scope.filterTitle, $scope.page, traceType, function(d) {
						if (d && d.length > 0) {
							for (var i = 0; i < d.length; i++)
								$scope.items.push(d[i]);
							$scope.page++;
						}
					});
				}
			}else{
				if (_page != $scope.page) {
					_page = $scope.page;
					model.trace.list($scope.page,traceType, function(d) {
						if (d && d.length > 0) {
							for (var i = 0; i < d.length; i++)
								$scope.items.push(d[i]);
							$scope.page++;
						}
					});
				}
			}
			},
			search:function(){
				$scope.filterChanged = true;
				$scope.page = 1;
				_page = 0;
				$scope.items.length = 0;
				$scope.load();
			},
			itemClick: function(item) {
				$scope.trace.current = item;
				$scope.$location.path("/spotcheck-detail");
			}
		});

		break;
	case "/spotcheck-create":
		angular.extend($scope, {
			remain:150,
			saveTitle:"spotcheck",
			newItem:{
				content:"",
				title:"",
				compId:"",
				traceType:traceType,
				component:{
					name:"",
					designer:"",
					constructor:"",
					supervisor:""
				},
				topicType: 8,
				picAttachmentList: [],
				videoAttachmentList: []
			},
			onscan:function(){
				cordova.plugins.barcodeScanner.scan(
					      function (result) {
					    	  if(result.cancelled == 0){
					    		  $scope.newItem.compId = result.text;
					    		  tipmessage("二维码提取成功");
					    		  model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
					    			  if(d){
					    				  tipmessage("该构件签认已完成", "_FoundCompId");
					    				  //Jump to sign details
					    				  $scope.trace.current = d;
					    				  $scope.$location.path("/spotcheck-detail");
					    			  }else{
					    				  tipmessage("该构件允许签认", "_FoundCompId");
					    				  //Get component info
					    				  model.component.get($scope.newItem.compId, function(d){
					    					  if(d){
					    						  tipmessage("获得构件信息", "_FoundCompId");
					    						  $scope.newItem.component = d;
					    					  }else{
					    						  tipmessage("该构件编码不存在", "_notFoundCompId");
					    					  }
					    				  });
					    			  }
					    		  });
					    	  }
					    
					    	  
					      }, 
					      function (error) {
					    	  tipmessage("扫描二维码失败");
					      }
				);
			},
			changed: function() {
				$scope.remain = 150 - $scope.newItem.content.length;
			},
			imageChanged: function(uri) {
				$scope.newItem.picAttachmentList.push({
					fileUrl: uri,
					thumbnailUrl: uri
				});
			},
			test:function(){
				/****/
				$scope.newItem.compId = "comp_xxxx_121";
	    		  model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
	    			  if(d){
	    				  tipmessage("该构件签认已完成", "_FoundCompId");
	    				  //Jump to sign details
	    				  $scope.trace.current = d;
	    				  $scope.$location.path("/spotcheck-detail");
	    			  }else{
	    				  tipmessage("该构件允许签认", "_FoundCompId");
	    				  //Get component info
	    				  model.component.get($scope.newItem.compId, function(d){
	    					  if(d){
	    						  tipmessage("获得构件信息", "_FoundCompId");
	    						  $scope.newItem.component = d;
	    					  }else{
	    						  tipmessage("该构件编码不存在", "_notFoundCompId");
	    					  }
	    				  });
	    			  }
	    		  });
				
	    		  model.uploadAttachments($scope.newItem, function(item) {
						model.trace.create(item, function(d) {
							if (d) {
								model.removeFiles($scope.newItem.picAttachmentList);
								tipmessage("创建成功");
								$timeout(function() {
									$scope.$location.back();
								}, 1000);
							}
						});
					});
				
				/*****/
			},
			
			submit: function() {
				if(!$scope.form.$valid){
		        	tipmessage("请检查输入内容是否正确");
		        	return;
		        }
				else if(isBlankString($scope.newItem.compId)){
					tipmessage("请检查构件是否存在");
		        	return;
				}
				model.uploadAttachments($scope.newItem, function(item) {
					delete item.videoAttachmentList;
					model.trace.create(item, function(d) {
						if (d) {
							model.removeFiles($scope.newItem.picAttachmentList);
							tipmessage("创建成功");
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}
					});
				});
			},
			save: function() {
				if(!$scope.form.$valid){
		        	tipmessage("请检查输入内容是否正确");
		        	return;
		        }
				else if(isBlankString($scope.newItem.compId)){
					tipmessage("请检查构件是否存在");
		        	return;
				}
				transferCache.push($scope.newItem, $scope.saveTitle);
				tipmessage("保存成功");//是否需要返回值？
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			}
		});
		break;
	case "/spotcheck-edit":
		angular.extend($scope, {
			remain:150,
			saveTitle:"spotcheck",
			newItem:{
				content:"",
				title:"",
				traceType:traceType,
				component:{
					name:"",
					designer:"",
					constructor:"",
					supervisor:""
				},
				topicType: 8,
				picAttachmentList: [],
				videoAttachmentList: []
			},
			
			onscan:function(){
				cordova.plugins.barcodeScanner.scan(
					      function (result) {
					    	  if(result.cancelled == 0){
					    		  $scope.newItem.compId = result.text;
					    		  tipmessage("二维码提取成功");
					    		  model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
					    			  if(d){
					    				  tipmessage("该构件签认已完成", "_FoundCompId");
					    				  //Jump to sign details
					    				  $scope.trace.current = d;
					    				  $scope.$location.path("/spotcheck-detail");
					    			  }else{
					    				  tipmessage("该构件允许签认", "_FoundCompId");
					    				  //Get component info
					    				  model.component.get($scope.newItem.compId, function(d){
					    					  if(d){
					    						  tipmessage("获得构件信息", "_FoundCompId");
					    						  $scope.newItem.component = d;
					    					  }else{
					    						  tipmessage("该构件编码不存在", "_notFoundCompId");
					    					  }
					    				  });
					    			  }
					    		  });
					    	  }
					    
					    	  
					      }, 
					      function (error) {
					    	  tipmessage("扫描二维码失败");
					      }
				);
			},
			changed: function() {
				$scope.remain = 150 - $scope.newItem.content.length;
			},
			imageChanged: function(uri) {
				$scope.newItem.picAttachmentList.push({
					fileUrl: uri,
					thumbnailUrl: uri
				});
			},
			submit: function() {
				if(!$scope.form.$valid){
		        	tipmessage("请检查输入内容是否正确");
		        	return;
		        }else if(isBlankString($scope.newItem.compId)){
					tipmessage("请检查构件是否存在");
		        	return;
				}
				model.uploadAttachments($scope.newItem, function(item) {
					model.trace.update(item, function(d) {
						if (d) {
							model.removeFiles($scope.newItem.picAttachmentList);
							tipmessage("提交成功");
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}
					});
				});
			},
			save: function() {
				if(!$scope.form.$valid){
		        	tipmessage("请检查输入内容是否正确");
		        	return;
		        }else if(isBlankString($scope.newItem.compId)){
					tipmessage("请检查构件是否存在");
		        	return;
				}
				transferCache.push($scope.newItem, $scope.saveTitle, "update");
				tipmessage("保存成功");//是否需要返回值？
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			}
		});
		model.trace.get($scope.trace.current.id, function(d) {
			if(d) {
				$scope.newItem = d;
			}
		});
		
		break;
	case "/spotcheck-detail":
		angular.extend($scope, {
			del : function(){
				model.trace.remove($scope.trace.current.id, function(d){
					if(d){
						tipmessage("删除成功");
					}else{
						tipmessage("删除失败");
					}
				});
			}
		});
		model.trace.get($scope.trace.current.id, function(d) {
			if(d) {
				$scope.trace.current = d;
			}
		});
		

		break;
	}
}])
.controller("cHenjiShangchuan", ["$scope", "model", function($scope, model) {
	var _titles = ["全景照片", "主要设备", "工艺与技术", "标准化建设", "专题会议", "任务风采", "其它"];
	model.trace.picsList(function(d) {
		if (d) $scope.list = d;
	});
	angular.extend($scope, {
		_page: 0,
		page: 1,
		title: function(type) {
			var i = type - 6;
			if (i >= 0 && i < _titles.length) return _titles[i];
			return "n/a";
		},
		itemClicked: function(t) {
			$scope.trace.henjishangchuan = {
				title: $scope.title(t.traceType),
				type: t.traceType
			};
			$scope.$location.path("/henji-shangchuan-list");
		}
	});
}])
.controller("cHenjiShangchuanList", ["$scope", "model", function($scope, model) {
	angular.extend($scope, {
		_page: 0,
		page: 1,
		list: [],
		searching: {
			query: "",
			change: function() {
				$scope._page = 0;
				$scope.page = 1;
				$scope.list = [];
				$scope.load();
			},
			cancel: function() {
				$scope.searching.query = "";
				$scope._page = 0;
				$scope.page = 1;
				$scope.list = [];
				$scope.load();
			}
		},
		load: function() {
			if ($scope._page != $scope.page) {
				$scope._page = $scope.page;
				model.trace.search($scope.searching.query, $scope.page, $scope.trace.henjishangchuan.type, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.list.push(d[i]);
						$scope.page++;
					}
				});
			}
		},
		itemClicked: function(t) {
			$scope.trace.henjishangchuan.current = t;
			$scope.$location.path("/henji-shangchuan-xiangqing");
		},
		add: function() {
			$scope.trace.henjishangchuan.current = null;
			$scope.$location.path("/henji-shangchuan-edit");
		}
	});
}])
.controller("cHenjiShangchuanEdit", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	if ($scope.trace.henjishangchuan.type != 6) {
		model.sect.all(function(d) {
			if (d) $scope.sections = d;
		});
	}
	angular.extend($scope, {
		person: $scope.trace.henjishangchuan.type != 6,
		background: $scope.trace.henjishangchuan.type > 9,
		section: $scope.trace.henjishangchuan.type != 6,
		locations: [
		    {v: "东涌互通枢纽立交"}, {v: "骝东互通及主线桥"}, {v: "西引桥"}, {v: "大沙水道桥"}, {v: "中引桥"}, {v: "海鸥互通及主线桥"}, {v: "坭洲水道桥"}, {v: "东引桥"}, {v: "沙田互通枢纽立交"}
		],
		newItem: $scope.trace.henjishangchuan.current || {
			topicType: 8,
			traceType: $scope.trace.henjishangchuan.type,
			picAttachmentList: [],
			videoAttachmentList: []
		},
		removeImage: function(url) {
			for (var i = 0; i < $scope.newItem.picAttachmentList.length; i++) {
				if ($scope.newItem.picAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.newItem.picAttachmentList[i]]);
					$scope.newItem.picAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		imageChanged: function(url) {
			$scope.newItem.picAttachmentList.push({
				fileUrl: url,
				thumbnailUrl: url
			});
		},
		submit: function() {
			model.uploadAttachments($scope.newItem, function(item) {
				delete item.videoAttachmentList;
				(($scope.trace.henjishangchuan.current || false) ? model.trace.update : model.trace.create)(item, function(d) {
					if (d) {
						model.removeFiles($scope.newItem.picAttachmentList);
						tipmessage("提交成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
			});
		},
		save: function() {
			if ($scope.trace.henjishangchuan.current || false)
				transferCache.push($scope.newItem, "spotcheck", "update");
			else
				transferCache.push($scope.newItem, "spotcheck");
			tipmessage("保存成功");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cHenjiShangchuanXiangqing", ["$scope", "$timeout", "model", function($scope, $timeout, model) {
	if ($scope.trace.henjishangchuan.current.sectionId || false) {
		model.sect.get($scope.trace.henjishangchuan.current.sectionId, function(d) {
			if (d) $scope.sectionName = d.sectionName;
		});
	}
	angular.extend($scope, {
		location: $scope.trace.henjishangchuan.current.location || false,
		person: ($scope.trace.henjishangchuan.current.person || false) && ($scope.trace.henjishangchuan.type != 6),
		background: ($scope.trace.henjishangchuan.current.background || false) && ($scope.trace.henjishangchuan.type > 9),
		section: ($scope.trace.henjishangchuan.current.sectionId || false) && ($scope.trace.henjishangchuan.type != 6),
		publisherName: $scope.trace.henjishangchuan.current.publisherName || false,
		pic: $scope.trace.henjishangchuan.current.picAttachmentList && $scope.trace.henjishangchuan.current.picAttachmentList.length > 0,
		sectionName: "",
		edit: function() {
			$scope.$location.path("/henji-shangchuan-edit");
		},
		remove: function() {
			model.trace.remove($scope.trace.henjishangchuan.current.id, function(d) {
				if (d) tipmessage("删除成功");
				else tipmessage("删除失败");
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			});
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
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
	.when("/redian-edit", {
		templateUrl: "partials/redian-edit.html",
		controller: "cRedianEdit"
	})
	.when("/sousuo", {
		templateUrl: "partials/sousuo-list.html",
		controller: "cSousuo"
	})
	.when("/henji", {
		templateUrl: "partials/a1-1-1henji.html",
		controller: "cHenji"
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
	.when("/spotcheck-list", {
		templateUrl: "partials/spotcheck-list.html",
		controller: "cSpotCheck"
	})
	.when("/spotcheck-create", {
		templateUrl: "partials/spotcheck-create.html",
		controller: "cSpotCheck"
	})
	.when("/spotcheck-edit", {
		templateUrl: "partials/spotcheck-edit.html",
		controller: "cSpotCheck"
	})
	.when("/spotcheck-detail", {
		templateUrl: "partials/spotcheck-details.html",
		controller: "cSpotCheck"
	})
	.when("/henji-shangchuan", {
		templateUrl: "partials/henji-shangchuan.html",
		controller: "cHenjiShangchuan"
	})
	.when("/henji-shangchuan-list", {
		templateUrl: "partials/henji-shangchuan-list.html",
		controller: "cHenjiShangchuanList"
	})
	.when("/henji-shangchuan-edit", {
		templateUrl: "partials/henji-shangchuan-edit.html",
		controller: "cHenjiShangchuanEdit"
	})
	.when("/henji-shangchuan-xiangqing", {
		templateUrl: "partials/henji-shangchuan-xiangqing.html",
		controller: "cHenjiShangchuanXiangqing"
	})
	.otherwise({
        redirectTo: "/"
    });
}])
.run(["myRoute", function(myRoute) {
	myRoute.path("/login");
}]);