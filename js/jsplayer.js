(function ($, window, document) {
    "use strict";
    var ovoplayer = {}, player = {},
    log = function(message) {
        if (!$.fn.ovoplayer.settings.debug) {
            return;
        }
        console.log(message);
    };

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
                });
                self.player.addEventListener('onReady', self.onPlayerReady);
                self.player.addEventListener('onStateChange', self.onPlayerStateChange);
                self.player.addEventListener('onError', self.onError);
            };
        },
        onError: function(e) {
            log('youtube error');
        },
        onPlayerStateChange: function(e) {
            /**
             * YT.PlayerState.ENDED
             * YT.PlayerState.PLAYING
             * YT.PlayerState.PAUSED
             * YT.PlayerState.BUFFERING
             * YT.PlayerState.CUED
              */
            if (e.data == YT.PlayerState.PLAYING) {
                log('Video playing');
            } else if (e.data == YT.PlayerState.ENDED) {
                log('Video has ended');
                $.fn.ovoplayer.next();
            } else if (e.data == YT.PlayerState.PAUSED) {
                log('Video has paued');
            } else if (e.data == YT.PlayerState.BUFFERING) {
                log('Video buffering');
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
        getPlayerState: function() {
            return this.player.getPlayerState();
        },
        getCurrentTime: function() {
            return this.player.getCurrentTime();
        },
        getDuration: function() {
            return this.player.getDuration();
        },
        getVideoUrl: function() {
            return this.player.getVideoUrl();
        },
        getVideoEmbedCode: function() {
            return this.player.getVideoEmbedCode();
        },
        getPlaybackQuality: function() {
            return this.player.getPlaybackQuality();
        },
        setPlaybackQuality: function(quality) {
            // small, medium, large, hd720, hd1080, highres or default
            this.player.setPlaybackQuality(quality);
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
            if (this.player) {
                this.player.loadVideoById(options);
            } else {
                this.options = setting;
                this.init();
            }
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
                self.player.addEventListener("apiready", self.onApiReady);
                self.player.addEventListener("playing", self.onPlaying);
                self.player.addEventListener("playing", self.onPlay);
                self.player.addEventListener("pause", self.onPause);
                self.player.addEventListener("ended", self.onEnded);
                self.player.addEventListener("seeking", self.onSeeking);
                self.player.addEventListener("seeked", self.onSeeked);
            };
        },
        onApiReady: function(e) {
            if (this.options.autoplay) {
                e.target.play();
            }
        },
        onPlaying: function(e) {
            log('Event is onPlaying');
        },
        onPlay: function(e) {
            log('Event is onPlay');
        },
        onPause: function(e) {
            log('Event is onPause');
        },
        onEnded: function(e) {
            log('Event is onEnded');
            $.fn.ovoplayer.next();
        },
        onSeeking: function(e) {
            log('Event is onSeeking');
        },
        onSeeked: function(e) {
            log('Event is onSeeked');
        },
        playVideo: function() {
            this.player.play();
        },
        pauseVideo: function() {
            this.player.pause();
        },
        seekTo: function(seconds) {
            this.player.seek(seconds);
        },
        togglePlay: function() {
            this.player.togglePlay();
        },
        setVolume: function(volume) {
            this.player.setVolume(volume);
        },
        setMuted: function(muted) {
            this.player.setMuted(muted);
        },
        toggleMuted: function() {
            this.player.toggleMuted();
        },
        updateVideo: function(setting) {
            if (setting.code && this.player) {
                this.player.load(setting.code);
            } else {
                this.options = setting;
                this.init();
            }
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
        this.player = undefined;
        this.options = $.fn.ovoplayer.settings;
        this.initialize.apply(this, arguments);
    };

    $.extend(ovoplayer.vimeo.prototype, {
        initialize: function(){
            var self = this;
            window.onApiReady = function(player_id) {
                self.player = $f(player_id);
                if (self.options.autoplay) {
                    self.player.api('play');
                }
                // add Events
                self.player.addEvent("playProgress", self.onplayProgress);
                self.player.addEvent("play", self.onPlay);
                self.player.addEvent("pause", self.onPause);
                self.player.addEvent("finish", self.onFinish);
                self.player.addEvent("seek", self.onSeek);
            };
        },
        onplayProgress: function(e) {
            //log('on playProgress');
        },
        onPlay: function(player_id) {
            log('on onPlay');
        },
        onPause: function(player_id) {
            log('on onPause');
        },
        onFinish: function(player_id) {
            log('on onFinish');
            $.fn.ovoplayer.next();
        },
        onSeek: function(e) {
            log('on onSeek');
        },
        playVideo: function() {
            this.player.api('play');
        },
        pauseVideo: function() {
            this.player.api('pause');
        },
        seekTo: function(seconds) {
            this.player.api('seekTo', seconds);
        },
        unload: function() {
            this.player.api('unload');
        },
        getCurrentTime: function() {
            return this.player.api('getCurrentTime');
        },
        getDuration: function() {
            return this.player.api('getDuration');
        },
        getVideoEmbedCode: function() {
            return this.player.api('getVideoEmbedCode');
        },
        getVideoHeight: function() {
            return this.player.api('getVideoHeight');
        },
        getVideoWidth: function() {
            return this.player.api('getVideoWidth');
        },
        getVideoUrl: function() {
            return this.player.api('getVideoUrl');
        },
        getColor: function() {
            return this.player.api('getColor');
        },
        getVolume: function() {
            return this.player.api('getVolume');
        },
        setColor: function(color) {
            this.player.api('setColor', color);
        },
        setLoop: function(loop) {
            this.player.api('setLoop', loop);
        },
        setVolume: function(volume) {
            this.player.api('setVolume', volume);
        },
        updateVideo: function(setting) {
            var iframe = '<iframe id="' + this.options.vimeoPlayer + '" src="//player.vimeo.com/video/' + setting.code + '?api=1&amp;player_id=' + this.options.vimeoPlayer + '" autoplay="true" width="' + this.options.width + '" height="' + this.options.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            $('#' + this.options.frame_id.vimeo).html(iframe);
        },
        init: function() {
            var e, s, url = 'http://a.vimeocdn.com/js/froogaloop2.min.js?938a9-1384184538';
            var self = this;
            if (this.is_init) return;
            e = document.createElement('script');
            e.src = url;
            e.async = true;
            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(e, s);
            this.is_init = true;

            var iframe = '<iframe id="' + this.options.vimeoPlayer + '" src="//player.vimeo.com/video/' + this.options.code + '?api=1&amp;player_id=' + this.options.vimeoPlayer + '" width="' + this.options.width + '" height="' + this.options.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            $('#' + this.options.frame_id.vimeo).html(iframe);

            window.addEventListener('load', function() {
                $f(document.getElementById(self.options.vimeoPlayer)).addEvent('ready', onApiReady);
            });
        }
    });

    var set_current_data = function () {
        ovoplayer.current = $.fn.ovoplayer.settings;
    }

    $.fn.ovoplayer = function (settings) {
        ovoplayer.settings = settings;
        $.fn.ovoplayer.init(settings);
    };

    $.fn.ovoplayer.pause = function() {
        player[ovoplayer.current.type].pauseVideo();
    };

    $.fn.ovoplayer.play = function() {
        player[ovoplayer.current.type].playVideo();
    };

    $.fn.ovoplayer.seek = function(seconds) {
        player[ovoplayer.current.type].seekTo(seconds);
    };

    $.fn.ovoplayer.next = function() {
        var next;
        if (!$.fn.ovoplayer.settings.playList || $.fn.ovoplayer.settings.playList.length == 0) {
            return;
        }

        next = $.fn.ovoplayer.settings.playList.shift();
        $.fn.ovoplayer.update(next);
    };

    $.fn.ovoplayer.update = function (settings) {
        var o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, ovoplayer.settings, settings);

        // pause current video
        player[ovoplayer.current.type].pauseVideo();
        if (o.type != ovoplayer.current.type) {
            // hide all video frame
            $('.' + o.iframeClass).hide();
            // show current video frame
            $('#' + o.frame_id[o.type]).show();
        }

        player[o.type].updateVideo(o);
        set_current_data();
    };

    $.fn.ovoplayer.init = function(options) {
        // Apply any options to the settings, override the defaults
        var ovo = [], params, iframe, o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, options);
        // insert video frame
        $.each(o.frame_id, function(key, value) {
            $('<div/>', {
                id: value,
                class: o.iframeClass,
            }).appendTo('#' + o.id);
            // new video player function
            player[key] = new ovoplayer[key]
        });
        // load third party script.
        player[o.type].init();
        set_current_data();
    };

    // Defaults
    $.fn.ovoplayer.defaults = {
        id: 'player_frame',
        frame_id: {
            youtube: 'youtube_frame',
            vimeo: 'vimeo_frame',
            dailymotion: 'dailymotion_frame'
        },
        iframeClass: 'video_iframe',
        vimeoPlayer: 'vimeo_player',
        width: 640,
        height: 480,
        autoplay: true,
        debug: false
    };

    $.ovoplayer = $.fn.ovoplayer;
}(jQuery, window, document));
