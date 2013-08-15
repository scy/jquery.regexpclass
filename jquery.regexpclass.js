// jQuery RegExpClass plugin v0.1
// Allows .hasClass and .removeClass to receive a RegExp parameter.
// by Tim Weber <scy@scy.name>
// Code taken from https://github.com/NV/jquery-regexp-classes, cleaned and commented.
(function ($) {
	'use strict';
	var space = /\s+/;
	(function (origHasClass) {
		// Replace hasClass with our own.
		$.fn.hasClass = function (val) {
			// Only do something if the parameter is a RegExp.
			if (val instanceof RegExp) {
				// Iterate over each matching element.
				for (var i = 0, l = this.length; i < l; i++) {
					var el = this[i];   // The current element.
					// Only do something when it's an Element with a className attribute.
					if (el.nodeType == 1 && el.className) {
						// Split the names and iterate over them in reverse order. This allows us to
						// leave the last "for" part empty.
						var names = el.className.split(space);
						for (var j = names.length; j--;) {
							// If the RegExp matches for at least one element, return true.
							if (val.test(names[j])) {
								return true;
							}
						}
					}
					// The RegExp didn't match for the current element, try the next one.
				}
				// The RegExp didn't match for any of the elements, return false.
				return false;
			}
			// If the parameter was no RegExp, simply call the original function.
			return origHasClass.apply(this, arguments);
		};
	})($.fn.hasClass);
	(function (origRemoveClass) {
		// Replace removeClass with our own.
		$.fn.removeClass = function (val) {
			// Only do something if the parameter is a RegExp.
			if (val instanceof RegExp) {
				// Iterate over each matching element.
				for (var i = 0, l = this.length; i < l; i++) {
					var el = this[i];   // The current element.
					// Only do something when it's an Element with a className attribute.
					if (el.nodeType == 1 && el.className) {
						// Split the names and iterate over them in reverse order. This allows us to
						// leave the last "for" part empty and remove items from the array without
						// headaches from changing indices.
						var names = el.className.split(space);
						for (var j = names.length; j--;) {
							// If the RegExp matches, remove that class from the array.
							if (val.test(names[j])) {
								names.splice(j, 1);
							}
						}
						// Set className to the remaining classes.
						el.className = $.trim(names.join(' '));
					}
				}
				return this;
			}
			// If the parameter was no RegExp, simply call the original function.
			return origRemoveClass.apply(this, arguments);
		};
	})($.fn.removeClass);
})(jQuery);
