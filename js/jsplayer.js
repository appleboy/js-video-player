(function ($, window, document) {
    "use strict";
    var ovoplayer = {}, player = {};
    ovoplayer.load_script = [];

    ovoplayer.youtube = function() {
        this.is_init = false;
        this.player = undefined;
        this.options = $.fn.ovoplayer.settings;
        this.initialize.apply(this, arguments);
    };

    $.extend(ovoplayer.youtube.prototype, {
        initialize: function(){
            var self = this;
            window.onYouTubeIframeAPIReady = function () {
                self.player = new YT.Player(self.options.frame_id.youtube, {
                    width: self.options.width,
                    height: self.options.height,
                    videoId: self.options.code,
                    events: {
                        'onReady': self.onPlayerReady,
                        'onStateChange': self.onPlayerStateChange
                    }
                });
            };
        },
        onPlayerStateChange: function(e) {
            if (e.data == YT.PlayerState.PLAYING) {
                console.log('Video playing');
            } else {
                console.log('Video has paused');
            }
        },
        onPlayerReady: function(e) {
            if ($.fn.ovoplayer.settings.autoplay) {
                e.target.playVideo();
            }
        },
        stopVideo: function() {
            this.player.stopVideo();
        },
        playVideo: function() {
            this.player.playVideo();
        },
        pauseVideo: function() {
            this.player.pauseVideo();
        },
        seekTo: function(seconds) {
            this.player.playVideo(seconds);
        },
        updateVideo: function(setting) {
            var options = {
                videoId: setting.code,
            };
            if (setting.start) {
                options.startSeconds = setting.start;
            }
            if (setting.end) {
                options.endSeconds = setting.end;
            }
            if (setting.quality) {
                options.suggestedQuality = setting.quality;
            }
            this.player.loadVideoById(options);
        },
        setPlaybackQuality: function(quality) {
            this.player.setPlaybackQuality(quality);
        },
        getPlaybackQuality: function(quality) {
            return this.player.getPlaybackQuality();
        },
        init: function() {
            var e, s, url = 'https://www.youtube.com/iframe_api';
            if (this.is_init) return;
            e = document.createElement('script');
            e.src = url;
            e.async = true;
            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(e, s);
            this.is_init = true;
        }
    });

    ovoplayer.dailymotion = function() {
        this.is_init = false;
        this.initialize.apply(this, arguments);
    };

    $.extend(ovoplayer.dailymotion.prototype, {
        initialize: function(){

        },
        init: function() {
            var e, s, url = document.location.protocol + '//api.dmcdn.net/all.js';
            if (this.is_init) return;
            e = document.createElement('script');
            e.src = url;
            e.async = true;
            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(e, s);
            this.is_init = true;
        }
    });

    ovoplayer.vimeo = function() {
        this.is_init = false;
    };

    $.extend(ovoplayer.vimeo.prototype, {
        init: function() {
            var e, s, url = 'http://a.vimeocdn.com/js/froogaloop2.min.js?938a9-1384184538';
            if (this.is_init) return;
            e = document.createElement('script');
            e.src = url;
            e.async = true;
            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(e, s);
            this.is_init = true;
        }
    });

    /**
    @method load_script
    @param type {youtube|dailymotion|vimeo}
    */
    var load_script = function (type) {
        var e, s, url;
        if (ovoplayer.load_script[type]) {
            return;
        } else {
            ovoplayer.load_script[type] = true;
        }
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

    var set_current_data = function () {
        ovoplayer.current = $.fn.ovoplayer.settings;
    }

    $.fn.ovoplayer = function (settings) {
        var self = this;
        ovoplayer.settings = settings;
        $.fn.ovoplayer.init(settings);
    };

    $.fn.ovoplayer.update = function (settings) {
        var params, iframe, o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, ovoplayer.settings, settings);
        player[o.type].init();
        switch (o.type) {
            case 'youtube':
                player[o.type].updateVideo({
                    code: o.code
                });
                break;
            case 'dailymotion':
                if (ovoplayer.current.type == o.type) {
                    ovoplayer.item.load(o.code);
                } else {
                    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
                    params = (o.autoplay) ? {autoplay: 1} : {};
                    ovoplayer.item = DM.player(o.vimeo.dailymotion, {video: o.code, width: o.width, height: o.height, params: params});

                    // 4. We can attach some events on the player (using standard DOM events)
                    ovoplayer.item.addEventListener("apiready", function(e) {
                        e.target.play();
                    });
                }
                break;
            case 'vimeo':
                iframe = '<iframe id="' + o.vimeoPlayer + '" src="//player.vimeo.com/video/' + o.code + '?api=1&amp;player_id=' + o.vimeoPlayer + '" autoplay="true" width="' + o.width + '" height="' + o.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                $('#' + o.frame_id.dailymotion).html(iframe);
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
                    ovoplayer.item = $f(player_id);
                    ovoplayer.item.api('play');
                };

                window.addEventListener('load', function() {
                    // Attach the ready event to the iframe
                    $f(document.getElementById(o.vimeoPlayer)).addEvent('ready', ready);
                });
                break;
        }
        set_current_data();
    };

    $.fn.ovoplayer.init = function(options) {
        // Apply any options to the settings, override the defaults
        var ovo = [], params, iframe, o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, options);
        // insert video frame
        $.each(o.frame_id, function(key, value) {
            $('<div/>', {
                id: value
            }).appendTo('#' + o.id);
            // new video player function
            player[key] = new ovoplayer[key]
        });
        // load third party script.
        player[o.type].init();
        switch (o.type) {
            case 'youtube':
                break;
            case 'dailymotion':
                window.dmAsyncInit = function() {
                    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
                    params = (o.autoplay) ? {autoplay: 1} : {};
                    ovoplayer.item = DM.player(o.frame_id.dailymotion, {video: o.code, width: o.width, height: o.height, params: params});

                    // 4. We can attach some events on the player (using standard DOM events)
                    ovoplayer.item.addEventListener("apiready", function(e) {
                        e.target.play();
                    });
                };
                break;
            case 'vimeo':
                iframe = '<iframe id="' + o.vimeoPlayer + '" src="//player.vimeo.com/video/' + o.code + '?api=1&amp;player_id=' + o.vimeoPlayer + '" autoplay="true" width="' + o.width + '" height="' + o.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                $('#' + o.frame_id.vimeo).html(iframe);
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
                    ovoplayer.item = $f(player_id);
                    ovoplayer.item.api('play');
                };

                window.addEventListener('load', function() {
                    // Attach the ready event to the iframe
                    $f(document.getElementById(o.vimeoPlayer)).addEvent('ready', ready);
                });
                break;
        }
        set_current_data();
    };

    // Defaults
    $.fn.ovoplayer.defaults = {
        id: 'player_frome',
        frame_id: {
            youtube: 'youtube_frame',
            vimeo: 'vimeo_frame',
            dailymotion: 'dailymotion_frame'
        },
        vimeoPlayer: 'vimeo_player',
        width: 640,
        height: 480,
        autoplay: true
    };

    $.ovoplayer = $.fn.ovoplayer;
}(jQuery, window, document));
