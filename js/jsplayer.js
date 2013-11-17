(function ($, window, document) {
    "use strict";
    var ovoplayer;

    /**
    @method load_script
    @param type {youtube|dailymotion|vimeo}
    */
    var load_script = function (type) {
        var e, s, url;
        type = type || 'youtube';
        switch (type) {
            case 'youtube':
                url = 'https://www.youtube.com/iframe_api';
                break;
            case 'dailymotion':
                url = document.location.protocol + '//api.dmcdn.net/all.js';
                break;
            case 'vimeo':
                url = 'http://a.vimeocdn.com/js/froogaloop2.min.js?938a9-1384184538';
                break;
        }
        e = document.createElement('script');
        e.src = url;
        e.async = true;
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(e, s);
    };

    $.fn.ovoplayer = function (settings) {
        var self = this;
        var options = $.extend({}, $.fn.ovoplayer.defaults, settings);
        $.fn.ovoplayer.init(settings);
    };

    $.fn.ovoplayer.init = function(options) {
        // Apply any options to the settings, override the defaults
        var params, iframe, o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, options);
        // load third party script.
        load_script(o.type);
        switch (o.type) {
            case 'youtube':
                window.onYouTubeIframeAPIReady = function () {
                    ovoplayer = new YT.Player(o.player, {
                        width: o.width,
                        height: o.height,
                        videoId: o.code,
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                };

                window.onPlayerReady = function(e) {
                    if (o.autoplay) {
                        e.target.playVideo();
                    }
                }
                break;
            case 'dailymotion':
                window.dmAsyncInit = function() {
                    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
                    params = (o.autoplay) ? {autoplay: 1} : {};
                    ovoplayer = DM.player(o.player, {video: o.code, width: o.width, height: o.height, params: params});

                    // 4. We can attach some events on the player (using standard DOM events)
                    ovoplayer.addEventListener("apiready", function(e) {
                        e.target.play();
                    });
                };
                break;
            case 'vimeo':
                iframe = '<iframe id="' + o.vimeoPlayer + '" src="//player.vimeo.com/video/' + o.code + '?api=1&amp;player_id=' + o.vimeoPlayer + '" autoplay="true" width="' + o.width + '" height="' + o.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                $('#' + o.player).html(iframe);
                window.addEvent = function(element, eventName, callback) {
                    if (element.addEventListener) {
                        element.addEventListener(eventName, callback, false);
                    }
                    else {
                        element.attachEvent('on' + eventName, callback);
                    }
                }
                window.ready = function(player_id) {
                    // Keep a reference to Froogaloop for this player
                    ovoplayer = $f(player_id);
                    ovoplayer.api('play');
                };

                window.addEventListener('load', function() {
                    // Attach the ready event to the iframe
                    $f(document.getElementById(o.vimeoPlayer)).addEvent('ready', ready);
                });
                break;
        }
    };

    // Defaults
    $.fn.ovoplayer.defaults = {
        player: 'player',
        vimeoPlayer: 'vimeo_player',
        width: 640,
        height: 480,
        autoplay: true
    };

    $.ovoplayer = $.fn.ovoplayer;
}(jQuery, window, document));
