(function ($, window, document) {
    "use strict";
    var ovoplayer = {}, player = {};

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
            this.player.seekTo(seconds);
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
        getPlaybackQuality: function() {
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
        this.player = undefined;
        this.options = $.fn.ovoplayer.settings;
        this.initialize.apply(this, arguments);
    };

    $.extend(ovoplayer.dailymotion.prototype, {
        initialize: function(){
            var self = this;
            window.dmAsyncInit = function() {
                // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
                var params = (self.options.autoplay) ? {autoplay: 1} : {};
                self.player = DM.player(self.options.frame_id.dailymotion, {video: self.options.code, width: self.options.width, height: self.options.height, params: params});

                // 4. We can attach some events on the player (using standard DOM events)
                self.player.addEventListener("apiready", function(e) {
                    if (self.options.autoplay) {
                        e.target.play();
                    }
                });
            };
        },
        updateVideo: function(setting) {
            if (setting.code) {
                this.player.load(setting.code);
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
            this.player.seekTo(seconds);
        },
        setPlaybackQuality: function(quality) {
            this.player.setPlaybackQuality(quality);
        },
        getPlaybackQuality: function() {
            return this.player.getPlaybackQuality();
        },
        mute: function() {
            if (!this.isMuted()) {
                this.player.mute();
            }
        },
        unMute: function() {
            if (this.isMuted()) {
                this.player.unMute();
            }
        },
        isMuted: function() {
            return this.player.isMuted();
        },
        setVolume: function(volume) {
            this.player.setVolume(volume);
        },
        getVolume: function() {
            return this.player.getVolume();
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
                player[o.type].updateVideo({
                    code: o.code
                });
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
