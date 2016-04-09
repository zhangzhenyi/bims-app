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

(function() {
    'use strict';
     angular.module('base64', []).constant('$base64', (function() {
        var buffer = (typeof module !== 'undefined' && module.exports) ? require('buffer').Buffer : null,
        b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        b64tab = (function(bin) {
            var t = {};
            for (var i = 0,
            l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
            return t;
        })(b64chars),
        fromCharCode = String.fromCharCode,
        cb_utob = function(c) {
        	var cc;
            if (c.length < 2) {
                cc = c.charCodeAt(0);
                return cc < 0x80 ? c: cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f))) : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f)));
            }
            cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) + fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f)));
        },
        re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
        utob = function(u) {
            return u.replace(re_utob, cb_utob);
        },
        cb_encode = function(ccc) {
            var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16 | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
            chars = [b64chars.charAt(ord >>> 18), b64chars.charAt((ord >>> 12) & 63), padlen >= 2 ? '=': b64chars.charAt((ord >>> 6) & 63), padlen >= 1 ? '=': b64chars.charAt(ord & 63)];
            return chars.join('');
        },
        btoa = function(b) {
            return b.replace(/[\s\S]{1,3}/g, cb_encode);
        },
        _encode = buffer ?
        function(u) {
            return (u.constructor === buffer.constructor ? u: new buffer(u)).toString('base64');
        }: function(u) {
            return btoa(utob(u));
        },
        encode = function(u, urisafe) {
            return ! urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g,
            function(m0) {
                return m0 == '+' ? '-': '_';
            }).replace(/=/g, '');
        },
        re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g'),
        cb_btou = function(cccc) {
            switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18) | ((0x3f & cccc.charCodeAt(1)) << 12) | ((0x3f & cccc.charCodeAt(2)) << 6) | (0x3f & cccc.charCodeAt(3)),
                offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(((0x0f & cccc.charCodeAt(0)) << 12) | ((0x3f & cccc.charCodeAt(1)) << 6) | (0x3f & cccc.charCodeAt(2)));
            default:
                return fromCharCode(((0x1f & cccc.charCodeAt(0)) << 6) | (0x3f & cccc.charCodeAt(1)));
            }
        },
        btou = function(b) {
            return b.replace(re_btou, cb_btou);
        },
        cb_decode = function(cccc) {
            var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [fromCharCode(n >>> 16), fromCharCode((n >>> 8) & 0xff), fromCharCode(n & 0xff)];
            chars.length -= [0, 0, 2, 1][padlen];
            return chars.join('');
        },
        atob = function(a) {
            return a.replace(/[\s\S]{1,4}/g, cb_decode);
        },
        _decode = buffer ?
        function(a) {
            return (a.constructor === buffer.constructor ? a: new buffer(a, 'base64')).toString();
        }: function(a) {
            return btou(atob(a));
        },
        decode = function(a) {
            return _decode(String(a).replace(/[-_]/g,
            function(m0) {
                return m0 == '-' ? '+': '/';
            }).replace(/[^A-Za-z0-9\+\/]/g, ''));
        };
         return {            
            encode: encode,            
            decode: decode,
        };
    })());
})();

angular.module("bridgeH5", ["myRoute", "ngSanitize", "radialIndicator", "base64"])
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
.directive("myChosen", ["$parse", "$timeout", function($parse, $timeout) {
	return {
		restrict: "AE",
		transclude: true,
		replace: true,
		template: "<select multiple='multiple'></select>",
		compile: function(t, a) {
			t.attr("placeholder", a.placeholder).SumoSelect({
				csvDispCount: 4,
				floatWidth: 318,
				search: true,
				searchText: a.placeholder,
				okCancelInMulti: true,
				triggerChangeCombined : true,
				forceCustomRendering: true,
				locale: ['确定', '取消', '全选']
			});

			function _getSelected() {
				var r = new Array();
				angular.element("option:selected", t[0]).each(function() {
					r.push(angular.element(this).val());
				});
				return r.join(",");
			}
			
			function _setSelected(s) {
				var a = angular.isString(s) ? s.split(",") : (angular.isArray(s) ? s : []), opts = t[0].options, i, j, b;
				for (j = 0; j < opts.length; j++) {
					b = false;
					for(i = 0; i < a.length; i++) {
						if (a[i] == angular.element(opts[j]).val()) {
							t[0].sumo.selectItem(j);
							b = true;
							break;
						}
					}
					if (!b) t[0].sumo.unSelectItem(j);
				}
			}
			
			return {
				pre:  function(scope, element, attrs) {
					element.css("width", "100%");
					angular.element(".SelectBox", element).css("width", "100%");
					if (attrs.data) {
						$timeout(function() {
							var a = ($parse(attrs.data))(scope), i, n = attrs.text || "text", v = attrs.value || "value";
							if (angular.isArray(a)) {
								for (i = 0; i < a.length; i++)
									t[0].sumo.add((a[i])[v], (a[i])[n]);
							}
						});
					}
					scope.setSelected = function(s) {
						$timeout(function() {
							_setSelected(s);
						});
					};
				},
				post: function(scope, element, attrs) {
					if (attrs.ngModel) {
						$timeout(function() {
							var m = $parse(attrs.ngModel);
							_setSelected(m(scope) || "");
							if ("true" == attrs.disable) t[0].sumo.disable();
							else {
								angular.element(t[0]).bind("change", function() {
									(m.assign)(scope, _getSelected());
								});
							}
						});
					}
					scope.$on("$destroy", function() {
						angular.element(t[0]).unbind("change");
						t[0].sumo.unload();
					});
				}
			};
		}
	};
}])
.directive("myRadialIndicator", function() {
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
				"color": "#9797EF",
				"text-align": "center"
			})
			.html("{{" + a.bigModel + "}}%")
			.appendTo(t);
			angular.element("<div></div>")
			.css({
				"display": "inline-block",
				"margin-top": "-8px"
			})
			.attr({
				"data-radial-indicator": "{radius: 60, barWidth: 15, percentage: true, displayNumber: false, barColor: '#9797EF'}",
				"data-radial-indicator-model": a.bigModel
			})
			.append(
				angular.element("<div></div>")
				.css({
					"position": "absolute",
					"margin-top": "18px",
					"margin-left": "18px"
				})
				.attr({
					"data-radial-indicator": "{radius: 42, barWidth: 15, percentage: true, barColor: '#87CEEB', fontSize: 20, fontFamily: '宋体'}",
					"data-radial-indicator-model": a.smallModel
				})
			)
			.appendTo(t);
		}
	};
})
.directive("myTouchRemove", ["$window", "$document", "$parse", function($window, $document, $parse) {
	var _selected,
	_bk = angular.element("<div></div>").css({
		"width": "100%",
		"height": "100%",
		"position":"absolute",
		"top":"0",
		"left":"0",
		"background":"rgba(0,0,0,0.4)",
		"z-index":"9999",
		"display":"none"
	}).bind("click", function() {_select(0);}).appendTo("body"),
	_pane = angular.element("<div></div>").css({
		"background-color": "rgba(204,204,204,.5)",
		"width": "100%",
		"height": "80px",
		"position": "fixed",
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
		_pane.css("top", angular.element($window).height() + 1);
		_bk.css({
			"height": angular.element($document).height(),
			"display": "inline-block"
		});
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
				e.preventDefault();
			});
			touch.on(element, "tap", function(e) {
				e.preventDefault();
			});
			scope.$on("$destroy", function() {
				touch.off(element, "tap");
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
.directive("myMediaSelector", ["$window", "$document", "$parse", "$timeout", "fileSystem", function($window, $document, $parse, $timeout, fileSystem) {
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
		"position": "fixed",
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
		_pane.css({
			"height":  angular.element($document).height(),
			"display": "inline-block"
		});
		btns.css("top", angular.element($window).height() + 1);
		_selected = c || angular.noop;
		btns.animate({top: angular.element($window).height() - 120}, {
			speed: "slow",
			queue: false
		});
	}

	function _fixPath(path) {
		var r = path.toLowerCase().indexOf("file:/") == -1 ? "file:///" + path : path;
		return (r.split("?"))[0];
	}
	
	function _captureVideo(files, scope, change) {
		for (var i = 0; i < files.length; i++) {
			fileSystem.create(_fixPath(files[i].fullPath), function(url) {
				scope.$apply(change(scope, {$uri: url}));
			});
		}
	}
	
	function _selectMedia(uri, scope, change) {
		if (uri.toLowerCase().indexOf("content:/")  >= 0) {
			if ($window.FilePath) {
				FilePath.resolveNativePath(uri, function(path) {
					fileSystem.create(_fixPath(path), function(url) {
						scope.$apply(change(scope, {$uri: url}));
					});
				}, _error);
			}
		} else fileSystem.create(_fixPath(uri), function(url) {
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
				"ng-src": a["src"],
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
										data.op = ($window.navigator && navigator.device) ? navigator.device.capture.captureVideo : angular.noop;
										data.opt = {limit: 1};
										data.success = function(files) {
											_captureVideo(files, scope, $parse(attrs.change));
										};
									} else {
										data.op = ($window.navigator && navigator.camera) ? navigator.camera.getPicture : angular.noop;
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
									data.op = ($window.navigator && navigator.camera) ? navigator.camera.getPicture : angular.noop;
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
.directive("myTitlePicker", ["$parse", function($parse) {
	return {
		restrict: "E",
		transclude: true,
		link: function(scope, element, attrs) {
			element.removeAttr("ng-model");
			angular.element("<input/>")
			.attr({
				type: "text",
				placeholder: "请点击选择主题"
			})
			.css({
				"width": "100%",
				"border": "0"
			})
			.val($parse(attrs.ngModel)(scope))
			.appendTo(element)
			.mobiscroll().date({
				theme: "ios",
				mode: "mixed",
				display: "bottom",
				lang: "zh",
				dateFormat: "yy年mm月进度月报",
				onBeforeShow: function (inst) {
					inst.settings.wheels[0].length > 2 ? inst.settings.wheels[0].pop() : null;
				},
				onSelect: function(t) {
					($parse(attrs.ngModel).assign)(scope, t);
				}
			});
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
	
	function _remove(item) {
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
			var e;
			tipmessage("开始保存");
			if (item._status || false) {
				_remove(item);
				e = item;
			} else {
				e = angular.extend(item, {
					_index: _value.count++,
					_type: type,
					_status: "o1",
					_statusText: "未上传",
					_user: $rootScope.user.id,
					_time: new Date(),
					_update: update == "update"
				});
			}
			_value.list.push(e);
			_save();
			tipmessage("成功结束");
			if (_view || false) _view.push(e);
			return e;
		},
		remove: _remove,
		clear: function() {
			 _value = {list: [], count: 0};
			 _view = null;
			 _save();
		},
		save: _save
	};
}])
.factory("model", ["$window", "$rootScope", "$http", "$interval", "$timeout", "$base64", "myRoute", function($window, $rootScope, $http, $interval, $timeout, $base64, myRoute) {
//	var _host = "http://192.168.1.125:8080", _path="/bims", _base = _host + _path + "/rest/", _sessionId;
	var _host = "http://101.201.141.1", _path="/bims-test", _base = _host + _path + "/rest/", _sessionId;
//	var _host = "http://120.24.99.94", _path="/bims", _base = _host + _path + "/rest/", _sessionId;
	
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
	$rootScope.formatDate2Day = function(time) {
		return (new Date(time)).format("yyyy-MM-dd");
	};
	
	$rootScope.origionVersion = "0.0.4.0109_beta";
//    $rootScope.origionVersion = "1.3.0";
	$rootScope.hasChecked = false;
	$rootScope.autoUpdateOnWiffi = false;
	$rootScope.Constants = {
			ISSUETYPE_QUALITY:1,
			ISSUETYPE_SECURITY:2,
			ISSUETYPE_MATERIAL:3,
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
			ISSUESTATUS_PUBLISH_WAITING_REVIEW:-100,//等待验收
			ISSUESTATUS_PUBLISH_REVIEW_REFUSED:-2,//验收拒绝
			ISSUESTATUS_PUBLISHED:1,//
			ISSUESTATUS_HANDLE_REVIEW_REFUSED:-1,//处理审核未通过
			ISSUESTATUS_HANDLED_WAITING_REVIEW:-101,//已处理，待审核
			ISSUESTATUS_HANDLED:2,//已处理，已审核
			ISSUESTATUS_ACCEPTED:3,//已验收
			ISSUESTATUS_HOUSEKEEP:4,//已存档
			ISSUESTATUS_REFUSED:0,//验收未通过，重新处理
			ATTACHMENTTYPE_COMMON:1,
			ATTACHMENTTYPE_PICTURE:2,
			ATTACHMENTTYPE_VIDEO:3,
			ATTACHMENTTYPE_AUDIO:4,
			ISSUE_PUBLISHER_CATEGORY_YE_ZHU:1,
			ISSUE_PUBLISHER_CATEGORY_JIAN_LI:2,
			ISSUE_PUBLISHER_CATEGORY_OTHER:3,
			USER_ROLE_AUTHORITY_PUBLISH_ISSUE_REVIEW:"/reviewIssueForPublish.jo",
			USER_ROLE_AUTHORITY_HANDLE_ISSUE_REVIEW:"/reviewIssueForHandle.jo",
			USER_ROLE_AUTHORITY_ISSUE_PUBLISH:"/publishissue.jo",
			USER_ROLE_AUTHORITY_ISSUE_HANDLE:"/handleissue.jo",
			USER_ROLE_AUTHORITY_ISSUE_ACCEPT:"/acceptissue.jo",
			USER_ROLE_AUTHORITY_ISSUE_PUBLISH_DOC:"/publishissueForDoc.jo",
			USER_ROLE_AUTHORITY_ISSUE_HANDLE_DOC:"/handleissueForDoc.jo",
			USER_ROLE_AUTHORITY_ISSUE_ACCEPT_DOC:"/acceptissueForDoc.jo"
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
	$rootScope.messages = {
		unreadCount:0
	};

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
	
	function _androidBackButton() {
		var p = $rootScope.$location.path();
		if (p == "/" || p == "/login" || p == "/henji" || (p == "/sousuo" &&  $rootScope.files.parentId <= 1) || p == "/wode" || p == "/faxian") {
			tipmessage("再点击一次退出应用");
			document.removeEventListener("backbutton", _androidBackButton, false);
			$timeout(function() {
				document.addEventListener("backbutton", _androidBackButton, false);
			}, 3000);
		} else {
			if (p == "/sousuo") $rootScope.files.parentId = $rootScope.files.current.parentId;
			$rootScope.$location.back();
		}
	}
	
	document.addEventListener("deviceready", function() {
		document.addEventListener("backbutton", _androidBackButton, false);
		if($window.navigator){
			navigator.splashscreen.hide();
		}
	}, false);
	
	function _req(o,c,l) {
		if(l){
			$rootScope.loading = false;
		}else
		$rootScope.loading = true;
		o.url = _base + (o.url || "");
		if (_sessionId) o.url += ";jsessionid=" + _sessionId;
		$http(o)
		.success(function(d) {
			$rootScope.loading = false;
			c(d || {});
		})
		.error(function() {
			$rootScope.loading = false;
			c(false);
		});
	}
	
	function _transfer(fileURI, fileType, topicType, callback, content) {
		var url = encodeURI(_base + "attachment/uploadForH5.jo;jsessionid=" + _sessionId + "?fileType=" + fileType + "&topicType=" + topicType + "&showName=&thumbnailUri=&title=&content=" + $base64.encode(content || "")),
		ft = (window.FileTransfer) ? new FileTransfer() : {upload: angular.noop, abort: angular.noop},
		opt = (window.FileUploadOptions) ? new FileUploadOptions() : {};
		opt.fileKey = "file";
		opt.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
		opt.mimeType = "multipart/form-data";
		opt.chunkedMode = false;
		opt.headers = {
		          Connection: "close"
		        };
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
			if (item._handling_) {
				pics = item.handlePicList;
				videos = item.handleVideoList;
				o.handleTotalAttachmentList = [];
				o.handlePicList = [];
				o.handleVideoList = [];
			} else {
				pics = item.issuePicAttachmentList;
				videos = item.issueVideoAttachmentList;
				o.issueTotalAttachmentList = [];
				o.issuePicAttachmentList = [];
				o.issueVideoAttachmentList = [];
			}
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
					if (item._handling_) {
						o.handleTotalAttachmentList.push(pics[i]);
						o.handlePicList.push(pics[i]);
					} else {
						o.issueTotalAttachmentList.push(pics[i]);
						o.issuePicAttachmentList.push(pics[i]);
					}
				} else {
					o.attachments.push(pics[i]);
					o.picAttachmentList.push(pics[i]);
				}
				counter++;
			} else {
				(transferCallback || angular.noop)(pics[i].fileUrl, _transfer(pics[i].fileUrl, 2, item.topicType, function(d, url) {
					if (d) {
						if (item.topicType == 3) {
							if (item._handling_) {
								o.handleTotalAttachmentList.push(d);
								o.handlePicList.push(d);
							} else {
								o.issueTotalAttachmentList.push(d);
								o.issuePicAttachmentList.push(d);
							}
						} else {
							o.attachments.push(d);
							o.picAttachmentList.push(d);
						}
					}
					(transferCallback || angular.noop)(url, false);
					counter++;
				}, pics[i].content));
			}
		}
		loops = ((videos || false) ? videos.length : 0);
		total += loops;
		for (i = 0; i < loops; i++) {
			if (videos[i].id || false) {
				if (item.topicType == 3) {
					if (item._handling_) {
						o.handleTotalAttachmentList.push(videos[i]);
						o.handleVideoList.push(videos[i]);
					} else {
						o.issueTotalAttachmentList.push(videos[i]);
						o.issueVideoAttachmentList.push(videos[i]);
					}
				} else {
					o.attachments.push(videos[i]);
					o.videoAttachmentList.push(videos[i]);
				}
				counter++;
			} else {
				(transferCallback || angular.noop)(videos[i].fileUrl, _transfer(videos[i].fileUrl, 3, item.topicType, function(d, url) {
					if (d) {
						if(item.topicType == 3) {
							if (item._handling_) {
								o.handleTotalAttachmentList.push(d);
								o.handleVideoList.push(d);
							} else {
								o.issueTotalAttachmentList.push(d);
								o.issueVideoAttachmentList.push(d);
							}
						} else {
							o.attachments.push(d);
							o.videoAttachmentList.push(d);
						}
					}
					(transferCallback || angular.noop)(url, false);
					counter++;
				}, videos[i].content));
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
			uploadAvatar: function(fileURI, callback) {
				var url = encodeURI(_base + "user/uploadAvatar.jo;jsessionid=" + _sessionId),
				ft = ($window.FileTransfer) ? new FileTransfer() : {upload: angular.noop, abort: angular.noop},
				opt = ($window.FileUploadOptions) ? new FileUploadOptions() : {};
				opt.fileKey = "avatarImg";
				opt.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
				opt.mimeType = "multipart/form-data";
				opt.chunkedMode = false;
				ft.upload(fileURI, url, function(r) {
					callback(JSON.parse(r.response));
				}, function() {
					callback(false);
				}, opt);
			},
			login: function(u,p,v,f, c) {
				_req({
					method: "post",
					url: "login/loginMap.jo",
					data: {
						username: u || "",
						password: p || "",
						version: v || "0.0.0",
						platform: f || 1 
					},
					header:{
						"contentType":"application/x-www-form-urlencoded;charset=UTF-8"
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
				},  function(a) {
					if (angular.isFunction(c)) {
						if (angular.isObject(a)) c(false);
						else c(true);
					}
				});
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
			},
			list: function(c) {
				_req({
					method: "get",
					url: "user/list.jo"
				},  angular.isFunction(c) ? c : angular.noop);
			},
			checkAutority: function(auth, c){
				var roles = $rootScope.user.roles;
				for(r in roles){
					var authorities = roles[r].urls;
					for(a in authorities){
						if(authorities[a] && authorities[a].indexOf(auth) > 0){
							angular.isFunction(c) ? c(true) : angular.noop;
							return;
						}
					}
				}
				angular.isFunction(c) ? c(false) : angular.noop;
			}
		},
		message:{
			getAllMessage:function(c){
				_req({
					method: "get",
					url: "message/getAllMessage.jo"
				},  angular.isFunction(c) ? c : angular.noop);
			},
			loadMessage:function(n, c){
				_req({
					method: "get",
					url: "message/loadMessagesByPageNum.jo",
					params: {
						pageNum : n
					}
				},  angular.isFunction(c) ? c : angular.noop);
			},
			readMessage:function(idstr, c){
				_req({
					method: "post",
					url: "message/read.jo",
					data: {
						ids: idstr
					}
				}, angular.isFunction(c) ? c : angular.noop);
			},
			getUnreadMessageCount:function(c){
				_req({
					method: "get",
					url: "message/getUnreadMessages.jo"
				}, angular.isFunction(c) ? c : angular.noop, true);
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
			reportList: function(id, pn, c) {
				_req({
					method: "get",
					url: "trace/getProgressReportList.jo",
					params: {
						sectionId: id,
						pageNum: pn
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
			remove: function(id, c) {
				_req({
					method: "delete",
					url: "trace/delete.jo",
					params: {
						id: parseInt(id)
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
				var u = "issue/publishissue.jo";
				if(i.issueType == $rootScope.Constants.ISSUETYPE_MATERIAL){
					u = "issue/publishissueForDoc.jo"
				}
				_req({
					method: "post",
					url: u,
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
			reviewPublishIssue:function(i, c){
				_req({
					method: "post",
					url: "issue/reviewIssueForPublish.jo",
					data:i
				}, angular.isFunction(c) ? c : angular.noop);
			},
			handleIssues: function(i, c) {//
				var u = "issue/handleissue.jo";
				if(i.issueType == $rootScope.Constants.ISSUETYPE_MATERIAL){
					u = "issue/handleissueForDoc.jo"
				}
				_req({
					method: "post",
					url: u,
					data:i
				}, angular.isFunction(c) ? c : angular.noop);
			},
			reviewHandleIssue:function(i, c){
				_req({
					method: "post",
					url: "issue/reviewIssueForHandle.jo",
					data:i
				}, angular.isFunction(c) ? c : angular.noop);
			},
			acceptIssues: function(i, c) {//
				var u = "issue/acceptissue.jo";
				if(i.issueType == $rootScope.Constants.ISSUETYPE_MATERIAL){
					u = "issue/acceptissueForDoc.jo"
				}
				_req({
					method: "post",
					url: u,
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
		var item = transferCache.get();
		if (item) {
			item._status = "o2";
			item._statusText = "上传中";
			model.uploadAttachments(item, function(i) {
				var op;
				var isIssue = false;
				switch(i._type) {
					case "redian":
						op = i._update ? model.hotfocus.update : model.hotfocus.create;
						break;
					case "spotcheck":
					case "henji-shangchuan":
					case "henji-gongchengjindu":
					case "henji-zhiliang":
					case "henji-chengzhangguocheng":
						op = i._update ? model.trace.update : model.trace.create;
						break;
					case "issue":
						delete i.topicType;
						isIssue = true;
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
				delete i._option;
				op(i, function(d) {
					if (d) {
					if(isIssue){
						model.removeFiles(item.issuePicAttachmentList.concat(item.issueVideoAttachmentList));
					}else{
						model.removeFiles(item.picAttachmentList.concat(item.videoAttachmentList));
					}
						tipmessage("上传成功");
						transferCache.remove(item);
					}else tipmessage("上传失败");
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
			
			var idMsg =  $interval(function() {
				if($rootScope.user && $rootScope.user.name) {
					//检查是否有未读消息
//					tipmessage("检查消息");
					model.message.getUnreadMessageCount(function(d){
						if(d && d.code == 0 ){
							$rootScope.messages.unreadCount = d.resultNum;
//							$rootScope.messages.unreadCount = 1;
						}
//						tipmessage("Message number "+$rootScope.messages.unreadCount);
					});
				}
			}, 10000, 0, false);
			
			scope.$on("$destroy", function() {
				$interval.cancel(id);
				$interval.cancel(idMsg);
			});
		}
	};
}])
.controller("cAutoTransfer", ["$scope", function($scope) {}])
.controller("cLoading", ["$scope", "$document", "$rootScope","model", function($scope, $document, $rootScope, model) {
	$rootScope.myHeaderPosition = "fixed";
	$scope.displayLoading = function() {
		if($scope.loading ){
			tipmessage1(message="努力加载中",id="tipimgLoading");
		}else{
			closetipmessage1(id="tipimgLoading");
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
	$scope.onInstall =function(){
		   if($scope.hasNewVersion){
		   //post to outside browser to open url
		   window.open($scope.setting.installer,"_system");
		   }
		   
   };
   $scope.popUpdateWin = function(){
	   $("#zoomscroll").addClass("loaded").animate({opacity:1},200);
	   $(document.body).addClass("noscroll");
	   $(".txt-25 a").click(function(){
                        $(".pop-window1").animate({height:0},50);
                        $("#zoomscroll").animate({opacity:0},200);
                        setTimeout(function(){$('#zoomscroll').removeClass('loaded');$(document.body).removeClass("noscroll");$("#zoom").html("");},400);
                        onInstall();
                        });
   };
	$scope.login = function() {
		if(!$scope.userForm.$valid){
        	tipmessage("请输入用户名和密码");
        	return;
        }
       var platform = 1;
       if(!$scope.hasChecked && window.device){
       switch(window.device.platform){
       case 'iPhone':
       platform = 1;
       break;
       case 'Android':
       platform = 2;
       break;
       }
       
       }else{
       $scope.setting.lastVersion = "0.0.0";
       }
       model.user.login($scope.username, $scope.password, $scope.origionVersion, platform, function(d) {
            if (d && d.CODE) {
            if(d.CODE == -101){//需要更新版本
            model.setting.getVersion(platform, function(d){
                                     if(d){//
                                     $scope.hasChecked = true;
                                     $scope.setting.currentVersion = d.version;
                                     $scope.setting.versionTitle = d.title;
                                     $scope.setting.versionRemark = d.remark;
                                     if(d.url){
                                     $scope.setting.installer = d.url;
                                     }
                                     
                                     $scope.setting.lastVersion = $scope.origionVersion;
                                     $scope.hasNewVersion = true;
                                     $scope.popUpdateWin();
                                     }
                                     });
                return;
            }else if(d.CODE == -100){//登录失败
                tipmessage("无效的用户名和密码。", "invalidUP");
            }else if(d.CODE == 100 && d.DATA){//登录成功
                        $scope.hasChecked = true;
                $scope.user.original = d.DATA;
                if (window.localStorage) {
                    localStorage["username"] = $scope.username;
                    localStorage["password"] = $scope.password;
                }
                $scope.user.name = d.DATA.name;
                $scope.user.photo = d.DATA.avatarUrl || "img/tem-img/img-person.jpg";
                $scope.user.department = (d.DATA.department || {}).name || "n/a";
                
                //					alert(JSON.stringify($scope.user.department));
                if(d.DATA.roles && d.DATA.roles.length > 0){
                    $scope.user.roles = d.DATA.roles;
                }else{
                    $scope.user.roles =  [{"name":"App游客"}];
                }
                
                //					alert(JSON.stringify($scope.user.roles));
                $scope.user.id = d.DATA.id;
                $scope.$location.path("/");
                
                model.user.list(function(d) {
                    if (d) $scope.user.list = d;
                });
            }else{
            tipmessage("未知的登录错误。", "invalidUP");
            }
            
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
								$scope.$location.back()
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

	
//	$scope.messages.unreadCount = $rootScope.messages.unreadCount;
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
.controller("cRedianxiangqing", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	model.hotfocus.get($scope.hotfocus.current.id, function(d) {
		if (d) {
			$scope.hotfocus.current = d;
			$scope.voteMembers = (isBlankString(d.voteUsersX)) ? [] : d.voteUsersX.split(",");
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
					model.vote.isVoted(d.id, d.topicType, function(d) {
						if(d) $scope.isVote = true;
						else $scope.isVote = false;
					});
				}
			}
		}
	});
	
	angular.extend($scope, {
		_page: 0,
		page: 1,
		comments: [],
		isVote: false,
		voteMembers: [],
		voteMemberStr: "",
		showComments: !($scope.hotfocus.current._status || false),
		load: function() {
			if (!($scope.hotfocus.current._status || false)) {
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
			}
		},
		more: $scope.user.id == $scope.hotfocus.current.publisherId || $scope.hotfocus.current._status,
		doLike: function() {
			if($scope.isVote) {
				if($scope.voteMembers.length <=0) return;
				model.vote.disLike($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, function(d) {
					for(var i = 0; i < $scope.voteMembers.length; i++) {
						if($scope.voteMembers[i] == $scope.user.name) {
							$scope.voteMembers.splice(i, 1);
							break;
						}
					}
					$scope.isVote = false;
					$scope.voteMemberStr = $scope.voteMembers.join("，");
				});
			} else {
				model.vote.doLike($scope.hotfocus.current.id, $scope.hotfocus.current.topicType, function(d) {
					$scope.voteMembers.push($scope.user.name);
					$scope.isVote = true;
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
		del : function() {
			if ($scope.hotfocus.current._status || false) {
				transferCache.remove($scope.hotfocus.current);
				tipmessage("删除成功");
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			} else {
				model.hotfocus.remove($scope.hotfocus.current.id, function(d) {
					if(d){
						$scope.tipContent = "删除成功";
						$scope.tipVisibility = "block";
						$timeout(function(){
							$scope.$location.back();
						} ,1000);
					} else {
						$scope.tipContent = "删除失败";
						$scope.tipVisibility = "block";
						$timeout(function() {
							$scope.tipVisibility = "none";
						} ,1000);
					}
				});
			}
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
				thumbnailUrl: "img/icon-15.png"
			});
		},
		submit: function() {
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			model.uploadAttachments($scope.hotfocus.current, function(item) {
				delete item._index;
				delete item._type;
				delete item._status;
				delete item._statusText;
				delete item._user;
				delete item._time;
				delete item._update;
				delete item._option;
				(($scope.hotfocus.current._status || false) ? ($scope.hotfocus.current._update ? model.hotfocus.update : model.hotfocus.create) : model.hotfocus.update)(item, function(d) {
					if (d) {
						if($scope.hotfocus.current._status || false) transferCache.remove($scope.hotfocus.current);
						tipmessage("提交成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					} else tipmessage("提交失败");
				});
			});
			
		},
		save: function() {
			if ($scope.hotfocus.current._status || false) {
				if ($scope.hotfocus.current._update) transferCache.push($scope.hotfocus.current, "redian", "update");
				else transferCache.push($scope.hotfocus.current, "redian");
			} else transferCache.push($scope.hotfocus.current, "redian", "update");
			tipmessage("保存成功");
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
				thumbnailUrl: "img/icon-15.png"
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
						tipmessage("提交成功");
						model.removeFiles($scope.newItem.picAttachmentList.concat($scope.newItem.videoAttachmentList));
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}else tipmessage("提交失败");
				});
			});
			
		},
		save: function() {
		if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			transferCache.push($scope.newItem, "redian");
			tipmessage("保存成功");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cWode", ["$window", "$scope", "$timeout", "model", "transferCache", "fileSystem", function($window, $scope, $timeout, model, transferCache, fileSystem) {
	switch($scope.$location.path()) {
	case '/shezhi':
		//Get latest version
		$scope.hasNewVersion = false;
		if ($window.localStorage) {
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
					$window.open($scope.setting.installer,"_system");
				}
			},
			setAutoUpload: function() {
				if(true && $scope.autoUpdateOnWiffi){
					$scope.autoUpdateOnWiffi = false;
				}else{
					$scope.autoUpdateOnWiffi = true;
				}
				if ($window.localStorage) 
					localStorage["autoUpdateOnWiffi"] = $scope.autoUpdateOnWiffi;
			}
		});

		if($window.device) {
			var platform = 1;
			switch($window.device.platform){
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
		angular.extend($scope, {
			imgChanged: function(e) {
				var formData = new FormData();
				formData.append("avatarImg", (angular.element(e))[0].files[0]);
				model.uploadFile("user/uploadAvatar.jo", formData, function(d) {
					if (d) {
						$scope.user.photo = d.avatarUrl;
						$scope.user.original.avatarUrl = d.avatarUrl;
						$scope.$apply();
					}
				});
			},
			usingCamera: $window.FileTransfer || false,
			imageChanged: function(url) {
				model.user.uploadAvatar(url, function(d) {
					if (d) {
						$scope.user.photo = d.avatarUrl;
						$scope.user.original.avatarUrl = d.avatarUrl;
						$scope.$apply();
					}
				});
			}
		});
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
				$scope.current.createTime = $scope.current.createTime || $scope.current._time;
				$scope.current.publisherName = $scope.current.publisherName || $scope.user.name;
				switch($scope.current._type) {
					case 'redian':
						if (!($scope.current.topicType)) $scope.current.topicType = 2;
						$scope.hotfocus.current = $scope.current;
						$scope.$location.path("/redianxiangqing");
						break;
					case 'spotcheck':
						if (!($scope.current.topicType)) $scope.current.topicType = 8;
						$scope.trace.current = $scope.current;
						$scope.$location.path("/spotcheck-detail");
						break;
					case 'issue':
						if (!($scope.current.topicType)) $scope.current.topicType = 3;
						$scope.issues.currentIssue = $scope.current;
						$scope.$location.path("/issue-details");
						break;
					case 'henji-shangchuan':
						if (!($scope.current.topicType)) $scope.current.topicType = 8;
						$scope.trace.henjishangchuan = $scope.current._option;
						$scope.trace.henjishangchuan.current = $scope.current;
						$scope.$location.path("/henji-shangchuan-xiangqing");
						break;
					case 'henji-gongchengjindu':
						if (!($scope.current.topicType)) $scope.current.topicType = 8;
						$scope.trace.gongchengjindu = $scope.current._option;
						$scope.trace.gongchengjindu.current = $scope.current;
						$scope.$location.path("/henji-gongchengjindu-xiangqing");
						break;
					case 'henji-zhiliang':
						if (!($scope.current.topicType)) $scope.current.topicType = 8;
						$scope.trace.zhiliang = $scope.current._option || {};
						$scope.trace.zhiliang.current = $scope.current;
						$scope.$location.path("/henji-zhiliang-xiangqing");
						break;
					case 'henji-chengzhangguocheng':
						if (!($scope.current.topicType)) $scope.current.topicType = 8;
						$scope.trace.chengzhangguocheng = $scope.current._option || {};
						$scope.trace.chengzhangguocheng.current = $scope.current;
						$scope.$location.path("/henji-chengzhangguocheng-xiangqing");
						break;
				}
			},
			transfer: function() {
				$scope.closeDetail();
				$scope.current._status = "o2";
				$scope.current._statusText = "上传中";
				var isIssue = false;
				model.uploadAttachments($scope.current, function(item) {
					var op;
					switch(item._type) {
						case "redian":
							op = item._update ? model.hotfocus.update : model.hotfocus.create;
							break;
						case "spotcheck":
						case "henji-shangchuan":
						case "henji-gongchengjindu":
						case "henji-zhiliang":
						case "henji-chengzhangguocheng":
							op = item._update ? model.trace.update : model.trace.create;
							break;
						case "issue":
							delete item.topicType;
							isIssue = true;
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
					delete item._option;
					
					op(item, function(d) {
						if (d) {
							if (isIssue) model.removeFiles($scope.current.issuePicAttachmentList.concat($scope.current.issueVideoAttachmentList));
							else 	model.removeFiles($scope.current.picAttachmentList.concat($scope.current.videoAttachmentList));
							tipmessage("上传成功");
							transferCache.remove($scope.current);
							$timeout(function() {
								$scope.tipVisibility = "none";
							}, 1000);
						} else {
							tipmessage("上传失败");
							$scope.current._status = "o3";
							$scope.current._statusText = "上传失败";
						}
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
		$scope.content = d.content.replace(/img src="\/bims-test/g, "img src=\"" + model.base())
		.replace(/img src="\/bims/g, "img src=\"" + model.base());
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
	var createAuth = false;
	if(t == $scope.Constants.ISSUETYPE_MATERIAL){
		createAuth = true;
	}else
	model.user.checkAutority($scope.Constants.USER_ROLE_AUTHORITY_ISSUE_PUBLISH,function(d)
			{
				if(d || false){
					createAuth = true;
				}else{
					createAuth = false;
				}
			});
	angular.extend($scope, {
		authoCreateIssue: createAuth,
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
	$scope.noAnyMenu = true;
	var id = $scope.issues.currentIssue.id;
	$scope.issueItem = $scope.issues.currentIssue;
	$scope.tipVisibility = "none";
	$scope.tipContent = "";
	$scope.isVote = false;
	$scope.voteMembers = [];
	$scope.voteMemberStr = "";
	$scope.authoHandleIssue=false;
	$scope.authoAcceptIssue=false;
	$scope.authoReviewPublishIssue=false;
	$scope.authoReviewHandleIssue=false;
	if($scope.issueItem.issueType == $scope.Constants.ISSUETYPE_MATERIAL){
		$scope.authoHandleIssue=true;
		$scope.authoAcceptIssue=true;
		$scope.authoReviewPublishIssue=true;
		$scope.authoReviewHandleIssue=true;
	}else{
		model.user.checkAutority($scope.Constants.USER_ROLE_AUTHORITY_PUBLISH_ISSUE_REVIEW,function(d)
				{
					if(d || false){
						$scope.authoReviewPublishIssue = true;
					}else{
						$scope.authoReviewPublishIssue = false;
					}
				});
		model.user.checkAutority($scope.Constants.USER_ROLE_AUTHORITY_HANDLE_ISSUE_REVIEW,function(d)
				{
					if(d || false){
						$scope.authoReviewHandleIssue = true;
					}else{
						$scope.authoReviewHandleIssue = false;
					}
				});
		model.user.checkAutority($scope.Constants.USER_ROLE_AUTHORITY_ISSUE_HANDLE,function(d)
				{
					if(d || false){
						$scope.authoHandleIssue = true;
					}else{
						$scope.authoHandleIssue = false;
					}
				});
		model.user.checkAutority($scope.Constants.USER_ROLE_AUTHORITY_ISSUE_ACCEPT,function(d)
				{
					if(d || false){
						$scope.authoAcceptIssue = true;
					}else{
						$scope.authoAcceptIssue = false;
					}
				});
	}
	
	//＊＊＊＊＊＊＊如果是新创建待审核的问题，公司领导可以审核 TODO ＊＊＊＊＊＊＊＊＊＊＊
	model.issues.getIssue(id, function(d) {
		if(d) {
			$scope.issueItem = d;
			//判断显示menu
			if(($scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_PUBLISH_WAITING_REVIEW 
					|| $scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_PUBLISH_REVIEW_REFUSED) 
					&& $scope.user.id==$scope.issueItem.publisherId){
				$scope.hasEditMenu = true;
			}else{
				$scope.hasEditMenu = false;
			}
			
			if($scope.user.id==$scope.issueItem.publisherId){
				$scope.hasDeleteMenu = true;
			}else{
				$scope.hasDeleteMenu = false;
			}
			if($scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_PUBLISH_WAITING_REVIEW 
					&& $scope.authoReviewPublishIssue == true){
				$scope.hasReviewPublishMenu = true;
			}else{
				$scope.hasReviewPublishMenu = false;
			}
			if($scope.authoHandleIssue == true 
					&& ($scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_HANDLE_REVIEW_REFUSED 
							|| $scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_PUBLISHED 
							|| $scope.issueItem.issueStatus == $scope.Constants.ISSUESTATUS_REFUSED)){
				$scope.hasHandleMenu = true;
			}else{
				$scope.hasHandleMenu = false;
			}
			if($scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_HANDLED_WAITING_REVIEW 
					&& $scope.authoReviewHandleIssue == true){
				$scope.hasReviewHandleMenu = true;
			}else{
				$scope.hasReviewHandleMenu = false;
			}
			if($scope.authoAcceptIssue==true && $scope.issueItem.issueStatus==$scope.Constants.ISSUESTATUS_HANDLED){
				$scope.hasAcceptMenu = true;
			}else{
				$scope.hasAcceptMenu = false;
			}
			//如果没有任何menu，不显示。。。。
			if($scope.hasEditMenu == false && $scope.hasEditMenu == false
					&& $scope.hasReviewPublishMenu == false && $scope.hasHandleMenu == false
					&& $scope.hasReviewHandleMenu == false && $scope.hasAcceptMenu == false){
				$scope.noAnyMenu = true;
			}else{
				$scope.noAnyMenu = false;
			}
//			$scope.setSelected($scope.issueItem.at);
		    var issueCats = ["制度／方案缺陷","交底培训缺陷","有章不循","未识别的危险源"];
			
		    if($scope.issueItem.issueCategory >= 0 && $scope.issueItem.issueCategory <4){
		    	$scope.issueItem.issueCategoryRemark = issueCats[$scope.issueItem.issueCategory]; 
		    }
		    if($scope.issueItem.handleProcessList.length > 0)
		    for(w in $scope.issueItem.handleProcessList){
//		    	alert(JSON.stringify($scope.issueItem.handleProcessList[w]));
		    	if($scope.issueItem.handleProcessList[w].issueCategory >= 0 && 
		    			$scope.issueItem.handleProcessList[w].issueCategory <4){
		    		$scope.issueItem.handleProcessList[w].issueCategoryRemark = issueCats[$scope.issueItem.handleProcessList[w].issueCategory]; 
			    }
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
.controller("cIssueEdit", ["$scope", "model", "$timeout","transferCache", function($scope, model, $timeout, transferCache){
	model.issues.getIssue($scope.issues.currentIssue.id, function(d) {
		if(d) {
			$scope.newIssue = d;
			$scope.setSelected($scope.newIssue.at);
			$scope.newIssue.topicType = 3;
			$scope.changed();
		}
	});
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
			thumbnailUrl: "img/icon-15.png"
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
	};
	$scope.removeVideo=function(url) {
		for (var i = 0; i < $scope.newIssue.issueVideoAttachmentList.length; i++) {
			if ($scope.newIssue.issueVideoAttachmentList[i].fileUrl == url) {
				model.removeFiles([$scope.newIssue.issueVideoAttachmentList[i]]);
				$scope.newIssue.issueVideoAttachmentList.splice(i, 1);
				$scope.$apply();
				break;
			}
		}
	};
		
	$scope.save = function(){
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			$scope.newIssue.at = $scope.newIssue.at.join();
		transferCache.push($scope.newIssue, "issue","update");
			tipmessage("保存成功");//是否需要返回值？
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
	};
	$scope.onscan =function(){
		cordova.plugins.barcodeScanner.scan(
			      function (result) {
			    	  if(result.cancelled == 0){
			    		  $scope.newIssue.location = result.text;
			    		  tipmessage("二维码提取成功");
			    	  }
			      }, 
			      function (error) {
			    	  tipmessage("扫描二维码失败");
			      }
		);
	};
	$scope.submit = function(){
		if(!$scope.form.$valid){
        	tipmessage("请检查输入内容是否正确");
        	return;
        }
		tipmessage1(message="上传文件中",id="tipimg");
		$scope.newIssue.at = $scope.newIssue.at.join();
		model.uploadAttachments($scope.newIssue, function(item) {
			changeTipmessage("开始创建","tipimg");
			delete item.topicType;
				model.issues.update(item, function(d) {
					if (d) {
						changeTipmessage("编辑成功", "tipimg");
						model.removeFiles($scope.newIssue.issuePicAttachmentList.concat($scope.newIssue.issueVideoAttachmentList));
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}else{
						changeTipmessage("编辑失败","tipimg");
					}
					closetipmessage1("tipimg");
				});
		});
	};
}])
.controller("cIssueCreate", ["$scope", "model", "$timeout","transferCache", function($scope, model, $timeout,transferCache){	
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
		sectionId : $scope.issues.currentSectId,
		at: ""
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
			thumbnailUrl: "img/icon-15.png"
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
	};
	$scope.removeVideo=function(url) {
			for (var i = 0; i < $scope.newIssue.issueVideoAttachmentList.length; i++) {
				if ($scope.newIssue.issueVideoAttachmentList[i].fileUrl == url) {
					model.removeFiles([$scope.newIssue.issueVideoAttachmentList[i]]);
					$scope.newIssue.issueVideoAttachmentList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
	};
	$scope.onscan =function(){
		cordova.plugins.barcodeScanner.scan(
			      function (result) {
			    	  if(result.cancelled == 0){
			    		  $scope.newIssue.location = result.text;
			    		  tipmessage("二维码提取成功");
			    	  }
			      }, 
			      function (error) {
			    	  tipmessage("扫描二维码失败");
			      }
		);
	};
	$scope.save = function(){
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			tipmessage1(message="保存中",id="tipimg");
			$scope.newIssue.at = $scope.newIssue.at.join();
			transferCache.push($scope.newIssue, "issue");
			changeTipmessage("保存成功",id="tipimg");
			closetipmessage1("tipimg");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
	};
	$scope.submit = function(){
		if(!$scope.form.$valid){
        	tipmessage("请检查输入内容是否正确");
        	return;
        }
		$scope.newIssue.at = $scope.newIssue.at.join();
		tipmessage1(message="上传文件中",id="tipimg");
		model.uploadAttachments($scope.newIssue, function(item) {
			changeTipmessage("开始创建","tipimg");
				delete item.topicType;
				
				model.issues.create(item, function(d) {
					if (d) {
						changeTipmessage("创建成功",id="tipimg");
						model.removeFiles($scope.newIssue.issuePicAttachmentList.concat($scope.newIssue.issueVideoAttachmentList));
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}else{
						changeTipmessage("创建失败","tipimg");
					}
					closetipmessage1("tipimg");
				});
		});
				
	};
}])
.controller("cIssueCheck", ["$scope", "model", "$timeout",function($scope, model, $timeout){
	angular.extend($scope, {
		issueItem:{
			id : $scope.issues.currentIssue.id,
			issueType: $scope.issues.currentIssue.issueType,
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
		submit: function(s){
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			var _item = {
					id: $scope.issueItem.id,
					acceptStatus: s,
					issueType:$scope.issueItem.issueType,
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

.controller("cIssueReview", ["$scope", "model", "$timeout",function($scope, model, $timeout){
	if($scope.issues.currentIssue.issueStatus != $scope.Constants.ISSUESTATUS_PUBLISH_WAITING_REVIEW
			&& $scope.issues.currentIssue.issueStatus != $scope.Constants.ISSUESTATUS_HANDLED_WAITING_REVIEW){
		$scope.$location.back();
	}
	angular.extend($scope, {
		reviewDesc:"",
		issueItem:{
			id : $scope.issues.currentIssue.id,
			reviewDesc:""
		},
		isPublishReview:$scope.issues.currentIssue.issueStatus == $scope.Constants.ISSUESTATUS_PUBLISH_WAITING_REVIEW,
		isHandleReview:$scope.issues.currentIssue.issueStatus == $scope.Constants.ISSUESTATUS_HANDLED_WAITING_REVIEW,
		tipVisibility: "none",
		tipContent:"提交成功",
		remain:150,
		contentChanged:function(){
			if($scope.issueItem.reviewDesc!= null){
				$scope.remain = 150 - $scope.issueItem.reviewDesc.length;
			}
		},
		submit: function(s){
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			var _item = {
					id: $scope.issueItem.id
			};
			
			if($scope.isPublishReview || false){
				_item.publishReviewDesc = $scope.reviewDesc;
				_item.publishReviewStatus = s;
				model.issues.reviewPublishIssue(_item, function(d) {
					if (d) {
						$scope.tipVisibility = "block";
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
			}else if($scope.isHandleReview || false){
				_item.handleReviewDesc =  $scope.reviewDesc;
				_item.handleReviewStatus = s;
				model.issues.reviewHandleIssue(_item, function(d) {
					if (d) {
						$scope.tipVisibility = "block";
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}
				});
			}
			
		}
	});
	
}])
.controller("cIssueHandle", ["$scope", "model", "$timeout","transferCache", function($scope, model, $timeout,transferCache){
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
			handleTotalAttachmentList: [],
			_handling_: true,
			topicType: 3
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
		imageChanged : function(uri) {
			$scope.issueItem.handlePicList.push({
				fileUrl: uri,
				thumbnailUrl: uri
			});
		},
		videoChanged : function(uri) {
			$scope.issueItem.handleVideoList.push({
				fileUrl: uri,
				thumbnailUrl: "img/icon-15.png"
			});
	    },
	    removeImage: function(url) {
			for (var i = 0; i < $scope.issueItem.handlePicList.length; i++) {
				if ($scope.issueItem.handlePicList[i].fileUrl == url) {
					model.removeFiles([$scope.issueItem.handlePicList[i]]);
					$scope.issueItem.handlePicList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
		removeVideo:function(url) {
			for (var i = 0; i < $scope.issueItem.handleVideoList.length; i++) {
				if ($scope.issueItem.handleVideoList[i].fileUrl == url) {
					model.removeFiles([$scope.issueItem.handleVideoList[i]]);
					$scope.issueItem.handleVideoList.splice(i, 1);
					$scope.$apply();
					break;
				}
			}
		},
	
	    submit: function(i){
	    	if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
	    	tipmessage1(message="上传文件中",id="tipimg");
			model.uploadAttachments($scope.issueItem, function(item) {
				changeTipmessage("开始创建","tipimg");
//				delete item.issueType;
				delete item._handling_;
				delete item.topicType;
				model.issues.handleIssues(item, function(d) {
					if (d) {
						changeTipmessage("提交成功",id="tipimg");
						model.removeFiles($scope.issueItem.handlePicList.concat($scope.issueItem.handleVideoList));
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					}else{
						changeTipmessage("提交失败","tipimg");
					}
					closetipmessage1("tipimg");
				});
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
.controller("cIssusSect3", ["$scope", "model", function($scope, model){
	//Set the issue number of per section
	$scope.issues.currentIssueType = $scope.Constants.ISSUETYPE_MATERIAL;
	model.sect.list($scope.Constants.ISSUETYPE_MATERIAL, 0, function(d) {
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
.controller("cHenji", ["$scope", "model", function($scope, model){
	angular.extend($scope, {
		popTempTip:function(){
			tipmessage("攻城师努力建设中...");
		},
		onScan:function(){
			cordova.plugins.barcodeScanner.scan(
		      function (result) {
		    	  if(result.cancelled == 0){
//		    		  alert("scan result : "+result.text);
		    		  //Get component info
		    		  model.component.get(result.text, function(d){
		    		  	if(d && d.name){
		    		  		tipmessage("获得构件信息");
		    		  		$scope.component.current = d;
//		    		  		alert("component : "+ JSON.stringify($scope.component.current));
		    		  		$scope.$location.path('/henji-scan');
		    		  	}else{
			    		  	tipmessage("该构件编码不存在", "_notFoundCompId");
		    		  	}
		    		  });
		    		  /*
model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
		    			  if(d){
		    				  tipmessage("该构件签认已完成", "_FoundCompId");
		    				  //Jump to sign details
		    				  $scope.component.current = d;
		    				  $scope.$location.path("/spotcheck-detail");
		    			  }else{
		    				  tipmessage("该构件允许签认", "_FoundCompId");
		    			  }
		    		  });
*/
		    	  }
		    
		    	  
		      }, 
		      function (error) {
		    	  tipmessage("扫描二维码失败");
		      }
			);
		}
	});
}])
.controller("cMessage", ["$scope", "model", function($scope, model){
	
	lastLoaded = -1;
	
	angular.extend($scope, {
		items:[],
		page:0,
		load: function() {
			if ($scope.page != lastLoaded) {
				lastLoaded = $scope.page;
				var msgIds = "";
				model.message.loadMessage($scope.page, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++){
							$scope.items.push(d[i]);
							if(!d[i].read || false){
								if(msgIds.length <= 0){
								}else{
									msgIds += ",";
								}
								msgIds += d[i].id;
							}
							
						}
							
						$scope.page++;
						
						if(msgIds.length > 0){
							model.message.readMessage(msgIds, function(d){
								if(d || false){
									tipmessage("消息更新为已读");
								}
							});
						}
					}
				});
				
				
			}
		},
		jumpTo: function(item){
			switch(item.type){
			case "0101"://quality
			case "0102"://Safe
			case "0103"://Document
//				$scope.issues.currentIssue = {id:item.refId};
//				$scope.$location.path("/issue-details");
				break;
			case "0201"://Task message
				break;
			case "0001":
//				break;
			default:
				//jump to system	
//				tipmessage("");
			}
		}
	});
	
	
}])
.controller("cOneFile", ["$scope", "model","$timeout", function($scope, model, $timeout) {
	if ($scope.files) {
		if ($scope.files.filepath) {
			var len = $scope.files.filepath.length - $scope.files.filepath.lastIndexOf(".") - 1;
			var ext = $scope.files.filepath.substr($scope.files.filepath.lastIndexOf(".") + 1, len).toLowerCase();
			$scope.img = (ext == 'png' || ext == 'jpg' || ext == 'gif' || ext == 'jpeg' || $scope.files.filepath.indexOf("image/") > 0);
			$scope.pdf = ext == 'pdf';
			$scope.video = (ext == "mp4" || ext =="ogg" || ext == "3gp" || ext == "mov");
			if ($scope.img) {
				$scope.saveas = function(url) {
					var img = new Image(), canvas = document.createElement("canvas"), imgData;
					img.crossOrigin = "*" ;
					img.onload = function() {
						canvas.width = img.width;
				        canvas.height = img.height;
				        canvas.getContext("2d").drawImage(img, 0, 0);
				        try {
				        	imgData = canvas.toDataURL("image/jpeg", 1.0).replace(/data:image\/jpeg;base64,/,  "");
				        	if (window.cordova) {
				        		tipmessage1("保存图片中...", "savePic");
				        		cordova.exec(function() {
				        			changeTipmessage("下载成功", "savePic");
				        			$timeout(function() {
				        				closetipmessage1("savePic");
									}, 2000);
				        			
				        		}, function() {
				        			changeTipmessage("下载失败", "savePic");
				        			$timeout(function() {
				        				closetipmessage1("savePic");
									}, 2000);
				        		}, "Canvas2ImagePlugin", "saveImageDataToLibrary", [imgData]);
				        	}
				        } catch(error) {
				        	tipmessage("下载失败");
				        }
					};
					img.src = url;
				};
			}
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
//					    		  tipmessage("二维码提取成功");
					    		  model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
					    			  if(d && d[0]){
					    				  tipmessage("该构件签认已完成", "_FoundCompId");
					    				  //Jump to sign details
					    				  $scope.trace.current = d[0];
					    				  $scope.$location.path("/spotcheck-detail");
					    			  }else{
//					    				  tipmessage("该构件允许签认", "_FoundCompId");
					    				  //Get component info
					    				  model.component.get($scope.newItem.compId, function(d){
					    					  if(d  && d.name){
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
			onCompIdChange: function() {
				model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
	    			  if(d && d[0]){
	    				  tipmessage("该构件签认已完成", "_FoundCompId");
	    			  }else{
	    				  model.component.get($scope.newItem.compId, function(d) {
	    						if (d && d.name) $scope.newItem.component = d;
	    						else tipmessage("该构件编码不存在");
	    					});
	    			  }
				});
				
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
	    			  if(d && d[0]){
	    				  tipmessage("该构件签认已完成", "_FoundCompId");
	    				  //Jump to sign details
	    				  $scope.trace.current = d[0];
	    				  $scope.$location.path("/spotcheck-detail");
	    			  }else{
	    				  tipmessage("该构件允许签认", "_FoundCompId");
	    				  //Get component info
	    				  model.component.get($scope.newItem.compId, function(d){
	    					  if(d  && d.name){
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
				}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
					tipmessage("请检查构件是否存在");
		        	return;
				}
				tipmessage1(message="上传文件中",id="tipimg");
	
				model.uploadAttachments($scope.newItem, function(item) {
				changeTipmessage("开始创建","tipimg");
					delete item.videoAttachmentList;
					model.trace.create(item, function(d) {
						if (d) {
							changeTipmessage("创建成功”,”tipimg");
							model.removeFiles($scope.newItem.picAttachmentList);
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}else{
							changeTipmessage("创建失败”,”tipimg");
						}
						closetipmessage1("tipimg");
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
				}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
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
		var oldComp = {compId:"--"};
		
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
					    		  if(oldComp.compId == $scope.newItem.compId){
										//编辑模式，取出的compid没变,恢复原先的component
										$scope.newItem.component = oldComp;
										return;
									}
					    		  tipmessage("二维码提取成功");
					    		  model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
					    			  if(d && d[0]){
					    				  tipmessage("该构件签认已完成", "_FoundCompId");
					    				  //Jump to sign details
					    				  $scope.trace.current = d[0];
					    				  $scope.$location.path("/spotcheck-detail");
					    			  }else{
					    				  tipmessage("该构件允许签认", "_FoundCompId");
					    				  //Get component info
					    				  model.component.get($scope.newItem.compId, function(d){
					    					  if(d && d.name){
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
			onCompIdChange: function() {
				if(oldComp.compId == $scope.newItem.compId){
					//编辑模式，取出的compid没变,恢复原先的component
					$scope.newItem.component = oldComp;
					return;
				}
				model.trace.getByCompId($scope.newItem.compId ,1,traceType, function(d) {
	    			  if(d && d[0]){
	    				  tipmessage("该构件签认已完成", "_FoundCompId");
	    			  }else{
	    				  model.component.get($scope.newItem.compId, function(d) {
	    						if (d && d.name) $scope.newItem.component = d;
	    						else tipmessage("该构件编码不存在");
	    					});
	    			  }
				});
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
				}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
					tipmessage("请检查构件是否存在");
		        	return;
				}
				tipmessage1(message="上传文件中",id="tipimg");
	
				model.uploadAttachments($scope.newItem, function(item) {
				changeTipmessage("开始编辑”,”tipimg");
					model.trace.update(item, function(d) {
						if (d) {
						changeTipmessage("编辑成功","tipimg");
							model.removeFiles($scope.newItem.picAttachmentList);
							$timeout(function() {
								$scope.$location.back();
							}, 1000);
						}else{
							changeTipmessage("编辑失败","tipimg");
						}
						closetipmessage1("tipimg");
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
				}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
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
			if(d && d.component) {
				$scope.newItem = d;
				oldComp = d.component;
			}
		});
		
		break;
	case "/spotcheck-detail":
		angular.extend($scope, {
			del : function(){
				model.trace.remove($scope.trace.current.id, function(d){
					if(d){
						tipmessage("删除成功");
						$timeout(function(){
							$scope.$location.path("/spotcheck-list");
						} ,1000);
					}else{
						tipmessage("删除失败");
					}
				});
			},
			fileClicked: function(name, path) {
				$scope.files.filename = name;
				$scope.files.filepath = path;
				$scope.$location.path("/onefile");
			}
		});
		model.trace.get($scope.trace.current.id, function(d) {
			if(d && d[0]) {
				$scope.trace.current = d[0];
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
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			model.uploadAttachments($scope.newItem, function(item) {
				delete item._index;
				delete item._type;
				delete item._status;
				delete item._statusText;
				delete item._user;
				delete item._time;
				delete item._update;
				delete item._option;
				(($scope.newItem._status || false) ? ($scope.newItem._update ? model.trace.update : model.trace.create) : (($scope.trace.henjishangchuan.current || false) ? model.trace.update : model.trace.create))(item, function(d) {
					if (d) {
						model.removeFiles($scope.newItem.picAttachmentList);
						if ($scope.newItem._status || false) transferCache.remove($scope.newItem);
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
	        }
			if ($scope.trace.henjishangchuan.current || false) {
				var opt = angular.extend({}, $scope.trace.henjishangchuan);
				delete opt.current;
				$scope.newItem._option = opt;
				if ($scope.trace.shangchuan.current._status || false) {
					if ($scope.trace.shangchuan.current._update) transferCache.push($scope.newItem, "henji-shangchuan", "update");
					else transferCache.push($scope.newItem, "henji-shangchuan");
				} else transferCache.push($scope.newItem, "henji-shangchuan", "update");
			} else {
				$scope.newItem._option = $scope.trace.henjishangchuan;
				transferCache.push($scope.newItem, "henji-shangchuan");
			}
			tipmessage("保存成功");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cHenjiShangchuanXiangqing", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
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
		more: ($scope.user.id == $scope.trace.henjishangchuan.current.publisherId) || $scope.trace.henjishangchuan.current._status,
		edit: function() {
			$scope.$location.path("/henji-shangchuan-edit");
		},
		remove: function() {
			if ($scope.trace.henjishangchuan.current._status || false) {
				transferCache.remove($scope.trace.henjishangchuan.current);
				tipmessage("删除成功");
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			} else {
				model.trace.remove($scope.trace.henjishangchuan.current.id, function(d) {
					if (d) tipmessage("删除成功");
					else tipmessage("删除失败");
					$timeout(function() {
						$scope.$location.back();
					}, 1000);
				});
			}
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
}])
.controller("cHenjiGongchengjindu", ["$scope", "model", function($scope, model) {
	model.sect.all(function(d) {
		if (d) {
			var v, i;
			for (i = 0; i < d.length; i++) {
				v = parseFloat(d[i].percentTime.substring(0, d[i].percentTime.length - 1));
				d[i].percentTime = v > 100 ? 100 : v;
				v = parseFloat(d[i].percentProject.substring(0, d[i].percentProject.length - 1));
				d[i].percentProject = v > 100 ? 100 : v;
			}
			$scope.sections = d;
		}
	});
	$scope.list = function(s) {
		$scope.trace.gongchengjindu = {
				sectionId: s.id,
				sectionName: s.sectionName,
				startDate: s.startDate,
				endDate: s.endDate,
				contractAmount: s.contractAmount,
				paymentTotal: s.paymentTotal,
				percentTime: s.percentTime,
				percentProject: s.percentProject
		};
		$scope.$location.path("/henji-gongchengjindu-list");
	};
}])
.controller("cHenjiGongchengjinduList", ["$scope", "$base64", "model", function($scope, $base64, model) {
	function _fn(d) {
		if (d && d.length > 0) {
			for (var i = 0; i < d.length; i++) {
				if (d[i].sectionId == $scope.trace.gongchengjindu.sectionId)
					$scope.list.push(d[i]);
			}
			$scope.page++;
			if ($scope.list.length < 10) $scope.load();
		}
	}
	
	angular.extend($scope, {
		_page: 0,
		page: 1,
		list: [],
		isSearching: false,
		searching: {
			query: "",
			change: function() {
				$scope._page = 0;
				$scope.page = 1;
				$scope.list = [];
				$scope.isSearching = true;
				$scope.load();
			},
			cancel: function() {
				$scope.searching.query = "";
				$scope._page = 0;
				$scope.page = 1;
				$scope.list = [];
				$scope.isSearching = false;
				$scope.load();
			}
		},
		load: function() {
			if ($scope._page != $scope.page) {
				$scope._page = $scope.page;
				if ($scope.isSearching) model.trace.search($scope.searching.query, $scope.page, 4, _fn);
				else model.trace.reportList($scope.trace.gongchengjindu.sectionId, $scope.page, _fn);
			}
		},
		itemClicked: function(t) {
			model.trace.get(t.id, function(d) {
				if (d) {
					if (d.picAttachmentList) {
						for (var i = 0; i < d.picAttachmentList.length; i++) {
							if (d.picAttachmentList[i].content || false)
								d.picAttachmentList[i].content = $base64.decode(d.picAttachmentList[i].content);
						}
					}
					$scope.trace.gongchengjindu.current = d;
					$scope.$location.path("/henji-gongchengjindu-xiangqing");
				}
			});
		},
		add: function() {
			$scope.trace.gongchengjindu.current = null;
			$scope.$location.path("/henji-gongchengjindu-edit");
		}
	});
}])
.controller("cHenjiGongchengjinduXiangqing", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	angular.extend($scope, {
		more: ($scope.user.id == $scope.trace.gongchengjindu.current.publisherId) || ($scope.trace.gongchengjindu.current._status || false),
		edit: function() {
			$scope.$location.path("/henji-gongchengjindu-edit");
		},
		remove: function() {
			if ($scope.trace.gongchengjindu.current._status || false) {
				transferCache.remove($scope.trace.gongchengjindu.current);
				tipmessage("删除成功");
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			} else {
				model.trace.remove($scope.trace.gongchengjindu.current.id, function(d) {
					if (d) tipmessage("删除成功");
					else tipmessage("删除失败");
					$timeout(function() {
						$scope.$location.back();
					}, 1000);
				});
			}
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
}])
.controller("cHenjiGongchengjinduEdit", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	var _last_payment = 0;
	angular.extend($scope, {
		newItem: (function() {
			var r = $scope.trace.gongchengjindu.current || {
				topicType: 8,
				traceType: 4,
				sectionId: $scope.trace.gongchengjindu.sectionId
			};
			r.picAttachmentList = r.picAttachmentList || [];
			r.videoAttachmentList = r.videoAttachmentList || [];
			$scope.payment = r.payment ? parseFloat(r.payment) : 0;
			return r;
		})(),
		change: function() {
			var s = $scope.payment + '';
			if (s.match(/^\d+(\.\d{0,2})?$/g)) _last_payment = $scope.payment;
			else 	$scope.payment = _last_payment;
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
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			$scope.newItem.payment = $scope.payment + '';
			model.uploadAttachments($scope.newItem, function(item) {
				delete item._index;
				delete item._type;
				delete item._status;
				delete item._statusText;
				delete item._user;
				delete item._time;
				delete item._update;
				delete item._option;
				(($scope.newItem._status || false) ? ($scope.newItem._update ? model.trace.update : model.trace.create) : (($scope.trace.gongchengjindu.current || false) ? model.trace.update : model.trace.create))(item, function(d) {
					if (d) {
						model.removeFiles($scope.newItem.picAttachmentList);
						if ($scope.newItem._status || false) transferCache.remove($scope.newItem);
						tipmessage("提交成功");
						$timeout(function() {
							$scope.$location.back();
						}, 1000);
					} else tipmessage("提交失败");
				});
			});
		},
		save: function() {
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }
			$scope.newItem.payment = $scope.payment + '';
			if ($scope.trace.gongchengjindu.current || false) {
				var opt = angular.extend({}, $scope.trace.gongchengjindu);
				delete opt.current;
				$scope.newItem._option = opt;
				if ($scope.trace.gongchengjindu.current._status || false) {
					if ($scope.trace.gongchengjindu.current._update) transferCache.push($scope.newItem, "henji-gongchengjindu", "update");
					else transferCache.push($scope.newItem, "henji-gongchengjindu");
				} else transferCache.push($scope.newItem, "henji-gongchengjindu", "update");
			} else {
				$scope.newItem._option = angular.extend({}, $scope.trace.gongchengjindu);
				transferCache.push($scope.newItem, "henji-gongchengjindu");
			}
			tipmessage("保存成功");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cHenjiZhiliang", ["$scope", "model", function($scope, model) {
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
				model.trace.search($scope.searching.query, $scope.page, 3, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.list.push(d[i]);
						$scope.page++;
					}
				});
			}
		},
		itemClicked: function(t) {
			model.trace.get(t.id, function(d) {
				if (d) {
					$scope.trace.zhiliang = {
							current: d
					};
					$scope.$location.path("/henji-zhiliang-xiangqing");
				}
			});
		},
		add: function() {
			$scope.trace.zhiliang = {};
			$scope.$location.path("/henji-zhiliang-edit");
		}
	});
}])
.controller("cHenjiZhiliangXiangqing", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	var _doc_types = ["出厂证书", "试验记录表", "现场记录表", "质量检验报告单", "质量评定表"];
	angular.extend($scope, {
		more: ($scope.user.id == $scope.trace.zhiliang.current.publisherId) || ($scope.trace.zhiliang.current._status || false),
		image: $scope.trace.zhiliang.current.picAttachmentList && $scope.trace.zhiliang.current.picAttachmentList.length > 0,
		docType: function(type) {
			var i = type - 1;
			if (i >= 0 && i < _doc_types.length)
				return _doc_types[i];
			return type;
		},
		edit: function() {
			$scope.$location.path("/henji-zhiliang-edit");
		},
		remove: function() {
			if ($scope.trace.zhiliang.current._status || false) {
				transferCache.remove($scope.trace.zhiliang.current);
				tipmessage("删除成功");
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			} else {
				model.trace.remove($scope.trace.zhiliang.current.id, function(d) {
					if (d) tipmessage("删除成功");
					else tipmessage("删除失败");
					$timeout(function() {
						$scope.$location.back();
					}, 1000);
				});
			}
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
}])
.controller("cHenjiZhiliangEdit", ["$window", "$scope", "$timeout", "model", "transferCache", function($window, $scope, $timeout, model, transferCache) {
	var oldComp = {compId:"--"};
	if($scope.trace.zhiliang.current){
		oldComp = $scope.trace.zhiliang.current.component;
	}
	angular.extend($scope, {
		docTypes:  [
    	    {id: 1, v: "出厂证书"},
    	    {id: 2, v: "试验记录表"},
    	    {id: 3, v: "现场记录表"},
    	    {id: 4, v: "质量检验报告单"},
    	    {id: 5, v: "质量评定表"}
    	],
		newItem: $scope.trace.zhiliang.current || {
			topicType: 8,
			traceType: 3,
			picAttachmentList: [],
			videoAttachmentList: []
		},
		canScan: $window.cordova && $window.cordova.plugins && cordova.plugins.barcodeScanner,
		scan: function() {
			cordova.plugins.barcodeScanner.scan(function(r) {
				 if(r.cancelled != 0) return;
				$scope.newItem.compId = r.text;
				if(oldComp.compId == $scope.newItem.compId){
					//编辑模式，取出的compid没变,恢复原先的component
					$scope.newItem.component = oldComp;
					return;
				}
				model.trace.getByCompId($scope.newItem.compId ,1,$scope.newItem.traceType, function(d) {
		  			  if(d && d[0]){
		  				  tipmessage("该构件签认已完成", "_FoundCompId");
		  			  }else{
				model.component.get(r.text, function(d) {
					if (d) $scope.newItem.component = d;
					else tipmessage("该构件编码不存在");
				});
		  			  }
				});
			}, function(e) {
				tipmessage("扫描二维码失败");
			});
		},
		onCompIdChange: function() {
			if(oldComp.compId == $scope.newItem.compId){
				//编辑模式，取出的compid没变,恢复原先的component
				$scope.newItem.component = oldComp;
				return;
			}
			model.trace.getByCompId($scope.newItem.compId ,1,$scope.newItem.traceType, function(d) {
  			  if(d && d[0]){
  				  tipmessage("该构件签认已完成", "_FoundCompId");
  			  }else{
  				  model.component.get($scope.newItem.compId, function(d) {
  						if (d && d.name) $scope.newItem.component = d;
  						else tipmessage("该构件编码不存在");
  					});
  			  }
			});
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
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }else if(isBlankString($scope.newItem.compId)){
				tipmessage("请检查构件是否存在");
	        	return;
			}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
				tipmessage("请检查构件是否存在");
	        	return;
			}
			model.uploadAttachments($scope.newItem, function(item) {
				delete item._index;
				delete item._type;
				delete item._status;
				delete item._statusText;
				delete item._user;
				delete item._time;
				delete item._update;
				delete item._option;
				(($scope.newItem._status || false) ? ($scope.newItem._update ? model.trace.update : model.trace.create) : (($scope.trace.zhiliang.current || false) ? model.trace.update : model.trace.create))(item, function(d) {
					if (d) {
						model.removeFiles($scope.newItem.picAttachmentList);
						if ($scope.newItem._status || false) transferCache.remove($scope.newItem);
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
			}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
				tipmessage("请检查构件是否存在");
	        	return;
			}
			if ($scope.trace.zhiliang.current || false) {
				var opt = angular.extend({}, $scope.trace.zhiliang);
				delete opt.current;
				$scope.newItem._option = opt;
				if ($scope.trace.zhiliang.current._status || false) {
					if ($scope.trace.zhiliang.current._update) transferCache.push($scope.newItem, "henji-zhiliang", "update");
					else transferCache.push($scope.newItem, "henji-zhiliang");
				} else transferCache.push($scope.newItem, "henji-zhiliang", "update");
			} else {
				$scope.newItem._option = $scope.trace.zhiliang;
				transferCache.push($scope.newItem, "henji-zhiliang");
			}
			tipmessage("保存成功");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
		}
	});
}])
.controller("cHenjiChengzhangguocheng", ["$scope", "model", function($scope, model) {
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
				model.trace.search($scope.searching.query, $scope.page, 2, function(d) {
					if (d && d.length > 0) {
						for (var i = 0; i < d.length; i++)
							$scope.list.push(d[i]);
						$scope.page++;
					}
				});
			}
		},
		itemClicked: function(t) {
			model.trace.get(t.id, function(d) {
				if (d) {
					$scope.trace.chengzhangguocheng = {
							current: d
					};
					$scope.$location.path("/henji-chengzhangguocheng-xiangqing");
				}
			});
		},
		add: function() {
			$scope.trace.chengzhangguocheng = {};
			$scope.$location.path("/henji-chengzhangguocheng-edit");
		}
	});
}])
.controller("cHenjiChengzhangguochengXiangqing", ["$scope", "$timeout", "model", "transferCache", function($scope, $timeout, model, transferCache) {
	angular.extend($scope, {
		more: ($scope.user.id == $scope.trace.chengzhangguocheng.current.publisherId) || ($scope.trace.chengzhangguocheng.current._status || false),
		image: $scope.trace.chengzhangguocheng.current.picAttachmentList && $scope.trace.chengzhangguocheng.current.picAttachmentList.length > 0,
		edit: function() {
			$scope.$location.path("/henji-chengzhangguocheng-edit");
		},
		remove: function() {
			if ($scope.trace.chengzhangguocheng.current._status || false) {
				transferCache.remove($scope.trace.chengzhangguocheng.current);
				tipmessage("删除成功");
				$timeout(function() {
					$scope.$location.back();
				}, 1000);
			} else {
				model.trace.remove($scope.trace.chengzhangguocheng.current.id, function(d) {
					if (d) tipmessage("删除成功");
					else tipmessage("删除失败");
					$timeout(function() {
						$scope.$location.back();
					}, 1000);
				});
			}
		},
		fileClicked: function(name, path) {
			$scope.files.filename = name;
			$scope.files.filepath = path;
			$scope.$location.path("/onefile");
		}
	});
}])
.controller("cHenjiScan", ["$scope", "$timeout", "model", function($scope, $timeout, model){
	angular.extend($scope, {
		newItem:{
			compId:$scope.component.current.compId,
			component:$scope.component.current
		}
	});
//	alert("henji page");
//	alert("s: "+JSON.stringify($scope.component.current));
//	alert("henji page end");
	//成长过程
	model.trace.getByCompId($scope.newItem.compId, 0, 3, function(d){
		if(d && d[0]){
			$scope.newItem.process = d;
		}
	});
	//质量记录
	model.trace.getByCompId($scope.newItem.compId, 0, 2, function(d){
		if(d && d[0]){
			$scope.newItem.qualityRecord = d;
		}
	});
	//现场签认
	model.trace.getByCompId($scope.newItem.compId, 0, 1, function(d){
		if(d && d[0]){
			$scope.newItem.spotcheck = d;
		}
	});
}])
.controller("cHenjiChengzhangguochengEdit", ["$window", "$scope", "$timeout", "model", "transferCache", function($window, $scope, $timeout, model, transferCache) {
	var oldComp = {compId:"--"};
	if($scope.trace.chengzhangguocheng.current){
		oldComp = $scope.trace.chengzhangguocheng.current.component;
	}
	angular.extend($scope, {
		newItem: $scope.trace.chengzhangguocheng.current || {
			topicType: 8,
			traceType: 2,
			picAttachmentList: [],
			videoAttachmentList: []
		},
		canScan: $window.cordova && $window.cordova.plugins && cordova.plugins.barcodeScanner,
		scan: function() {
			cordova.plugins.barcodeScanner.scan(function(r) {
				 if(r.cancelled != 0) return;
				$scope.newItem.compId = r.text;
				if(oldComp.compId == $scope.newItem.compId){
					//编辑模式，取出的compid没变,恢复原先的component
					$scope.newItem.component = oldComp;
					return;
				}
				
				model.trace.getByCompId($scope.newItem.compId ,1,$scope.newItem.traceType, function(d) {
		  			  if(d && d[0]){
		  				  tipmessage("该构件签认已完成", "_FoundCompId");
		  			  }else{
				model.component.get(r.text, function(d) {
					if (d) $scope.newItem.component = d;
					else tipmessage("该构件编码不存在");
				});
		  			  }
				});
			}, function(e) {
				tipmessage("扫描二维码失败");
			});
		},
		onCompIdChange: function() {
			if(oldComp.compId == $scope.newItem.compId){
				//编辑模式，取出的compid没变,恢复原先的component
				$scope.newItem.component = oldComp;
				return;
			}
			model.trace.getByCompId($scope.newItem.compId ,1,$scope.newItem.traceType, function(d) {
  			  if(d && d[0]){
  				  tipmessage("该构件签认已完成", "_FoundCompId");
  			  }else{
  				  model.component.get($scope.newItem.compId, function(d) {
  						if (d && d.name) $scope.newItem.component = d;
  						else tipmessage("该构件编码不存在");
  					});
  			  }
			});
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
			if(!$scope.form.$valid){
	        	tipmessage("请检查输入内容是否正确");
	        	return;
	        }else if(isBlankString($scope.newItem.compId)){
				tipmessage("请检查构件是否存在");
	        	return;
			}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
				tipmessage("请检查构件是否存在");
	        	return;
			}
			model.uploadAttachments($scope.newItem, function(item) {
				delete item._index;
				delete item._type;
				delete item._status;
				delete item._statusText;
				delete item._user;
				delete item._time;
				delete item._update;
				delete item._option;
				(($scope.newItem._status || false) ? ($scope.newItem._update ? model.trace.update : model.trace.create) : (($scope.trace.chengzhangguocheng.current || false) ? model.trace.update : model.trace.create))(item, function(d) {
					if (d) {
						model.removeFiles($scope.newItem.picAttachmentList);
						if ($scope.newItem._status || false) transferCache.remove($scope.newItem);
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
			}else if(!$scope.newItem.component || !$scope.newItem.component.name || $scope.newItem.component.name.length <= 0){
				tipmessage("请检查构件是否存在");
	        	return;
			}
			if ($scope.trace.chengzhangguocheng.current || false) {
				var opt = angular.extend({}, $scope.trace.chengzhangguocheng);
				delete opt.current;
				$scope.newItem._option = opt;
				if ($scope.trace.chengzhangguocheng.current._status || false) {
					if ($scope.trace.chengzhangguocheng.current._update) transferCache.push($scope.newItem, "henji-chengzhangguocheng", "update");
					else transferCache.push($scope.newItem, "henji-chengzhangguocheng");
				} else transferCache.push($scope.newItem, "henji-chengzhangguocheng", "update");
			} else {
				$scope.newItem._option = $scope.trace.chengzhangguocheng;
				transferCache.push($scope.newItem, "henji-chengzhangguocheng");
			}
			tipmessage("保存成功");
			$timeout(function() {
				$scope.$location.back();
			}, 1000);
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
	.when("/issues-feedback-material", {
		templateUrl: "partials/wentifankui.html",
		controller: "cIssusSect3"
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
	.when("/issue-review",{
		templateUrl: "partials/wenti-review.html",
		controller: "cIssueReview"
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
	.when("/henji-gongchengjindu", {
		templateUrl: "partials/henji-gongchengjindu.html",
		controller: "cHenjiGongchengjindu"
	})
	.when("/henji-gongchengjindu-list", {
		templateUrl: "partials/henji-gongchengjindu-list.html",
		controller: "cHenjiGongchengjinduList"
	})
	.when("/henji-gongchengjindu-xiangqing", {
		templateUrl: "partials/henji-gongchengjindu-xiangqing.html",
		controller: "cHenjiGongchengjinduXiangqing"
	})
	.when("/henji-gongchengjindu-edit", {
		templateUrl: "partials/henji-gongchengjindu-edit.html",
		controller: "cHenjiGongchengjinduEdit"
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
	.when("/henji-zhiliang", {
		templateUrl: "partials/henji-zhiliang.html",
		controller: "cHenjiZhiliang"
	})
	.when("/henji-zhiliang-xiangqing",{
		templateUrl: "partials/henji-zhiliang-xiangqing.html",
		controller: "cHenjiZhiliangXiangqing"
	})
	.when("/henji-zhiliang-edit", {
		templateUrl: "partials/henji-zhiliang-edit.html",
		controller: "cHenjiZhiliangEdit"
	})
	.when("/henji-chengzhangguocheng", {
		templateUrl: "partials/henji-chengzhangguocheng.html",
		controller: "cHenjiChengzhangguocheng"
	})
	.when("/henji-chengzhangguocheng-xiangqing", {
		templateUrl: "partials/henji-chengzhangguocheng-xiangqing.html",
		controller: "cHenjiChengzhangguochengXiangqing"
	})
	.when("/henji-chengzhangguocheng-edit", {
		templateUrl: "partials/henji-chengzhangguocheng-edit.html",
		controller: "cHenjiChengzhangguochengEdit"
	})
	.when("/henji-scan", {
		templateUrl: "partials/henji-scan.html",
		controller: "cHenjiScan"
	})
	.when("/message-list", {
		templateUrl: "partials/message-list.html",
		controller: "cMessage"
	})
	.otherwise({
        redirectTo: "/"
    });
}])
.run(["myRoute", function(myRoute) {
	myRoute.path("/login");
}]);