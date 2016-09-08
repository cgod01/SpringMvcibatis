/*
 * metismenu - v2.0.2
 * A jQuery menu plugin
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */! function(a) {"use strict";
	function b() {
		var a = document.createElement("mm"), b = {
			WebkitTransition : "webkitTransitionEnd",
			MozTransition : "transitionend",
			OTransition : "oTransitionEnd otransitionend",
			transition : "transitionend"
		};
		for (var c in b)
		if (
			void 0 !== a.style[c])
			return {
				end : b[c]
			};
		return !1
	}

	function c(b) {
		return this.each(function() {
			var c = a(this), d = c.data("mm"), f = a.extend({}, e.DEFAULTS, c.data(), "object" == typeof b && b);
			d || c.data("mm", d = new e(this, f)), "string" == typeof b && d[b]()
		})
	}
	a.fn.emulateTransitionEnd = function(b) {
		var c = !1, e = this;
		a(this).one("mmTransitionEnd", function() {
			c = !0
		});
		var f = function() {
			c || a(e).trigger(d.end)
		};
		return setTimeout(f, b), this
	};
	var d = b();
	d && (a.event.special.mmTransitionEnd = {
		bindType : d.end,
		delegateType : d.end,
		handle : function(b) {
			return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) :
			void 0
		}
	});
	var e = function(b, c) {
		this.$element = a(b), this.options = a.extend({}, e.DEFAULTS, c), this.transitioning = null, this.init()
	};
	e.TRANSITION_DURATION = 350, e.DEFAULTS = {
		toggle : !0,
		doubleTapToGo : !1,
		activeClass : "active"
	}, e.prototype.init = function() {
		var b = this, c = this.options.activeClass;
		this.$element.find("li." + c).has("ul").children("ul").addClass("in"), 
		//this.$element.find("li").not("." + c).has("ul").children("ul").addClass("collapse"), 
		this.options.doubleTapToGo && this.$element.find("li." + c).has("ul").children("a").addClass("doubleTapToGo"), 
		this.$element.find("li").has("ul.collapse").children("a").on("click.metisMenu", function(d) {
			var e = a(this), f = e.parent("li"), g = f.children("ul");
			return d.preventDefault(), f.hasClass(c) ? b.hide(g) : b.show(g), b.options.doubleTapToGo && b.doubleTapToGo(e) && "#" !== e.attr("href") && "" !== e.attr("href") ? (d.stopPropagation(),
			void (document.location = e.attr("href"))) :
			void 0
		})
	}, e.prototype.doubleTapToGo = function(a) {
		var b = this.$element;
		return a.hasClass("doubleTapToGo") ? (a.removeClass("doubleTapToGo"), !0) : a.parent().children("ul").length ? (b.find(".doubleTapToGo").removeClass("doubleTapToGo"), a.addClass("doubleTapToGo"), !1) :
		void 0
	}, e.prototype.show = function(b) {
		var c = this.options.activeClass, f = a(b), g = f.parent("li");
		if (!this.transitioning && !f.hasClass("in")) {
			g.addClass(c), this.options.toggle && this.hide(g.siblings().children("ul.in")), f.removeClass("collapse").addClass("collapsing").height(0), this.transitioning = 1;
			var h = function() {
				f.removeClass("collapsing").addClass("collapse in").height(""), this.transitioning = 0
			};
			return d ?
			void  f.one("mmTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(e.TRANSITION_DURATION).height(f[0].scrollHeight) : h.call(this)
		}
	}, e.prototype.hide = function(b) {
		var c = this.options.activeClass, f = a(b);
		if (!this.transitioning && f.hasClass("in")) {
			f.parent("li").removeClass(c), f.height(f.height())[0].offsetHeight, f.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
			var g = function() {
				this.transitioning = 0, f.removeClass("collapsing").addClass("collapse")
			};
			return d ?
			void  f.height(0).one("mmTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : g.call(this)
		}
	};
	var f = a.fn.metisMenu;
	a.fn.metisMenu = c, a.fn.metisMenu.Constructor = e, a.fn.metisMenu.noConflict = function() {
		return a.fn.metisMenu = f, this
	}
}(jQuery); 