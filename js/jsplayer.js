(function ($, window, document) {
    "use strict";
    var ovoplayer = {}, player = {},
    // only support youtube, dailymotion, vimeo
    re = /^(youtube|dailymotion|vimeo)$/,
    addEvent =  window.attachEvent || window.addEventListener,
    nativeIsArray = Array.isArray,
    isArray = nativeIsArray || function(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    },
    log = function(message) {
        if (!$.fn.ovoplayer.settings.debug) {
            return;
        }
        window.console && console.log(message);
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
                    videoId: self.options.code
                    //playerVars: { 'autoplay': 1, 'controls': 0 }
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
            log('Player Ready');
            if ($.fn.ovoplayer.settings.autoplay) {
                e.target.playVideo();
            }
        },
        destroy: function() {
            log('remove youtube player');
            this.player.destroy();
            this.player = undefined;
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
        initPlayer: function() {
            var self = this;
            this.player = new YT.Player(this.options.frame_id.youtube, {
                width: this.options.width,
                height: this.options.height,
                videoId: this.options.code
                //playerVars: { 'autoplay': 1, 'controls': 0 }
            });

            this.player.addEventListener('onReady', this.onPlayerReady);
            this.player.addEventListener('onStateChange', this.onPlayerStateChange);
            this.player.addEventListener('onError', this.onError);

            // fixed Unable to post message to https://www.youtube.com.
            // ref: https://code.google.com/p/gdata-issues/issues/detail?id=4697
            setTimeout(function(){
                var url = $('#' + self.options.frame_id.youtube).prop('src');
                if (url.match('^http://')) {
                    log('detect youtube url protocol http://');
                    $('#' + self.options.frame_id.youtube).prop('src', url.replace(/^http:\/\//i, 'https://'));
                }
            }, 500);
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
                this.playVideo();
            } else {
                this.options = setting;
                this.init();
            }
        },
        init: function() {
            var e, s, url = 'https://www.youtube.com/iframe_api';
            if (this.is_init) {
                this.initPlayer();
            } else {
                e = document.createElement('script');
                e.src = url;
                e.async = true;
                s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(e, s);
                this.is_init = true;
            }
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
        destroy: function() {},
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
        destroy: function() {
            $('#' + this.options.frame_id.vimeo).html('');
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
            if (this.player) {
                var iframe = '<iframe id="' + this.options.vimeoPlayer + '" src="//player.vimeo.com/video/' + setting.code + '?api=1&amp;player_id=' + this.options.vimeoPlayer + '" width="' + this.options.width + '" height="' + this.options.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                $('#' + this.options.frame_id.vimeo).html(iframe);
            } else {
                this.init();
            }
        },
        loadJS: function (src, callback) {
            var e, s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onreadystatechange = s.onload = function() {
                var state = s.readyState;
                if (!callback.done && (!state || /loaded|complete/.test(state))) {
                    callback.done = true;
                    callback();
                }
            };
            document.getElementsByTagName('head')[0].appendChild(s);
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
            this.options = $.fn.ovoplayer.settings;
            this.is_init = true;

            var iframe_html = '<iframe id="' + this.options.vimeoPlayer + '" src="//player.vimeo.com/video/' + this.options.code + '?api=1&amp;player_id=' + this.options.vimeoPlayer + '" width="' + this.options.width + '" height="' + this.options.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            $('#' + this.options.frame_id.vimeo).html(iframe_html);

            // for IE solution.
            var iframe = document.getElementById(this.options.vimeoPlayer);
            if(iframe.addEventListener) {
                // for chrome, firefox
                iframe.addEventListener('load', function() {
                    $f(document.getElementById(self.options.vimeoPlayer)).addEvent('ready', onApiReady);
                }, false);
            } else if(iframe.attachEvent) {
                // for IE 8
                iframe.attachEvent('onload', function() {
                    setTimeout(function(){
                        $f(document.getElementById(self.options.vimeoPlayer)).addEvent('ready', onApiReady);
                    }, 2000);
                });
            }

            addEvent('load', function() {
                $f(document.getElementById(self.options.vimeoPlayer)).addEvent('ready', onApiReady);
            });
        }
    });

    var set_current_data = function (settings) {
        ovoplayer.current = settings;
    }

    $.fn.ovoplayer = function (settings) {
        $.fn.ovoplayer.init(settings);
    };

    $.fn.ovoplayer.pause = function(callback) {
        player[ovoplayer.current.type].pauseVideo();
        callback && callback.call(this, ovoplayer);
    };

    $.fn.ovoplayer.play = function(callback) {
        player[ovoplayer.current.type].playVideo();
        callback && callback.call(this, ovoplayer);
    };

    $.fn.ovoplayer.seek = function(seconds, callback) {
        player[ovoplayer.current.type].seekTo(seconds);
        callback && callback.call(this, ovoplayer);
    };

    $.fn.ovoplayer.repeat = function(repeat, callback) {
        $.fn.ovoplayer.settings.repeat = repeat;
        callback && callback.call(this, ovoplayer);
    };

    $.fn.ovoplayer.repeatAll = function(repeat, callback) {
        $.fn.ovoplayer.settings.repeatAll = repeat;
        callback && callback.call(this, ovoplayer);
    };

    $.fn.ovoplayer.first = function(callback) {
        var first;
        if (!isArray($.fn.ovoplayer.settings.playList) || $.fn.ovoplayer.settings.playList.length == 0) {
            return;
        }

        // repeat single video.
        if ($.fn.ovoplayer.settings.repeat) {
            $.fn.ovoplayer.update(ovoplayer.current, callback);
            return;
        }

        $.fn.ovoplayer.settings.playListIndex = 1;
        first = $.fn.ovoplayer.settings.playList[($.fn.ovoplayer.settings.playListIndex - 1)];
        $.fn.ovoplayer.update(first, callback);
    };

    $.fn.ovoplayer.last = function(callback) {
        var last;
        if (!isArray($.fn.ovoplayer.settings.playList) || $.fn.ovoplayer.settings.playList.length == 0) {
            return;
        }

        // repeat single video.
        if ($.fn.ovoplayer.settings.repeat) {
            $.fn.ovoplayer.update(ovoplayer.current, callback);
            return;
        }

        $.fn.ovoplayer.settings.playListIndex = $.fn.ovoplayer.settings.playList.length;
        last = $.fn.ovoplayer.settings.playList[($.fn.ovoplayer.settings.playListIndex - 1)];
        $.fn.ovoplayer.update(last, callback);
    };

    $.fn.ovoplayer.previous = function(callback) {
        var previous;
        if (!isArray($.fn.ovoplayer.settings.playList) || $.fn.ovoplayer.settings.playList.length == 0) {
            return;
        }

        // repeat single video.
        if ($.fn.ovoplayer.settings.repeat) {
            $.fn.ovoplayer.update(ovoplayer.current, callback);
            return;
        }

        if (!$.fn.ovoplayer.settings.playListIndex) {
            $.fn.ovoplayer.settings.playListIndex = 1;
        } else {
            $.fn.ovoplayer.settings.playListIndex -= 1;
        }

        if ($.fn.ovoplayer.settings.playListIndex <= 0) {
            $.fn.ovoplayer.settings.playListIndex = 1;
        }

        previous = $.fn.ovoplayer.settings.playList[($.fn.ovoplayer.settings.playListIndex - 1)];
        $.fn.ovoplayer.update(previous, callback);
    };

    $.fn.ovoplayer.next = function(callback) {
        var next;
        if (!isArray($.fn.ovoplayer.settings.playList) || $.fn.ovoplayer.settings.playList.length == 0) {
            return;
        }

        // repeat single video.
        if ($.fn.ovoplayer.settings.repeat) {
            $.fn.ovoplayer.update(ovoplayer.current, callback);
            return;
        }

        if (!$.fn.ovoplayer.settings.playListIndex) {
            $.fn.ovoplayer.settings.playListIndex = 1;
        } else {
            $.fn.ovoplayer.settings.playListIndex += 1;
        }

        if ($.fn.ovoplayer.settings.playListIndex > $.fn.ovoplayer.settings.playList.length) {
            if ($.fn.ovoplayer.settings.repeatAll) {
                $.fn.ovoplayer.settings.playListIndex = 1;
            } else {
                log('The latest video of Play List.');
                return;
            }
        }

        next = $.fn.ovoplayer.settings.playList[($.fn.ovoplayer.settings.playListIndex - 1)];
        $.fn.ovoplayer.update(next, callback);
    };

    $.fn.ovoplayer.update = function (settings, callback) {
        var i = 0, len, o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.settings, settings);

        // set current item object
        if ($.fn.ovoplayer.settings.playList.length > 0 && !settings.item) {
            for (i = 0, len = $.fn.ovoplayer.settings.playList.length; i < len; i++) {
                if ($.fn.ovoplayer.settings.playList[i].code == settings.code &&
                    $.fn.ovoplayer.settings.playList[i].type == settings.type) {
                    o.item = $.fn.ovoplayer.settings.playList[i].item;
                    $.fn.ovoplayer.settings.playListIndex = (i + 1);
                }
            }
        }

        // pause current video
        player[ovoplayer.current.type].pauseVideo();
        if (o.type != ovoplayer.current.type) {
            // remove iframe
            player[ovoplayer.current.type].destroy();
            // hide all video frame
            $('.' + o.iframeClass).hide();
            // show current video frame
            $('#' + o.frame_id[o.type]).show();
        }

        player[o.type].updateVideo(o);
        set_current_data(o);

        // overwrite callback.
        if (o.callback) {
            callback = o.callback;
        }
        callback && callback.call(this, ovoplayer);
    };

    $.fn.ovoplayer.init = function(options) {
        // Apply any options to the settings, override the defaults
        var type, code, obj, ovo = [], params, iframe, o = $.fn.ovoplayer.settings = $.extend({}, $.fn.ovoplayer.defaults, options);
        // insert video frame
        $.each(o.frame_id, function(key, value) {
            $('<div/>', {
                id: value,
                'class': o.iframeClass
            }).appendTo('#' + o.id);
            // new video player function
            player[key] = new ovoplayer[key]
        });
        // load third party script.
        player[o.type].init();
        // load play list.
        if (o.playListClass && o.playListClass.length > 0) {
            $('.' + o.playListClass).each(function(index) {
                type = $(this).data('type');
                code = $(this).data('code').toString();
                if (type && code && type.match(re) && code.length > 0) {
                    obj = {
                        type: type,
                        code: code,
                        item: this
                    }
                    o.playList.push(obj);
                }
            });
        }
        set_current_data(o);
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
        // user define play list.
        playList: [],
        // auto fetch play list.
        playListClass: null,
        repeat: false,
        repeatAll: false,
        width: 640,
        height: 480,
        autoplay: true,
        debug: false,
        callback: null
    };

    $.ovoplayer = $.fn.ovoplayer;
}(jQuery, window, document));
