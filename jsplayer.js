(function ($, window, document) {
    "use strict";
    // Defaults
    $.fn.ovoplayer.defaults = {

    };
    $.fn.ovoplayer = function (settings) {
        var options = $.extend({}, defaults, settings);
        $.fn.ovoplayer.init(settings);
    };

    $.fn.ovoplayer.init = function(options) {
        // Apply any options to the settings, override the defaults
        var o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, options);
    };

}(jQuery, window, document));
