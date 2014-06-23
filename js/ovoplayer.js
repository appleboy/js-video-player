!function(e,t,n){"use strict";var i={},o={},a=/^(youtube|dailymotion|vimeo)$/,r=t.attachEvent||t.addEventListener,s=Array.isArray,l=s||function(e){return"[object Array]"===Object.prototype.toString.call(e)},p=function(n){e.fn.ovoplayer.settings.debug&&t.console&&console.log(n)};i.youtube=function(){this.isInit=!1,this.player=void 0,this.options=e.fn.ovoplayer.settings,this.initialize.apply(this,arguments)},e.extend(i.youtube.prototype,{initialize:function(){var e=this;t.onYouTubeIframeAPIReady=function(){e.player=new YT.Player(e.options.frameID.youtube,{width:e.options.width,height:e.options.height,videoId:e.options.code}),e.player.addEventListener("onReady",e.onPlayerReady),e.player.addEventListener("onStateChange",e.onPlayerStateChange),e.player.addEventListener("onError",e.onPlayerError)}},onPlayerError:function(){p("youtube error"),e.fn.ovoplayer.next()},onPlayerStateChange:function(t){t.data==YT.PlayerState.PLAYING?p("Video playing"):t.data==YT.PlayerState.ENDED?(p("Video has ended"),e.fn.ovoplayer.next()):t.data==YT.PlayerState.PAUSED?p("Video has paued"):t.data==YT.PlayerState.BUFFERING&&p("Video buffering")},onPlayerReady:function(t){p("Player Ready"),e.fn.ovoplayer.settings.autoplay&&t.target.playVideo()},destroy:function(){p("remove youtube player"),this.player.destroy(),this.player=void 0},stopVideo:function(){this.player.stopVideo()},playVideo:function(){this.player.playVideo()},pauseVideo:function(){this.player.pauseVideo()},seekTo:function(e){this.player.seekTo(e)},getPlayerState:function(){return this.player.getPlayerState()},getCurrentTime:function(){return this.player.getCurrentTime()},getDuration:function(){return this.player.getDuration()},getVideoUrl:function(){return this.player.getVideoUrl()},getVideoEmbedCode:function(){return this.player.getVideoEmbedCode()},getPlaybackQuality:function(){return this.player.getPlaybackQuality()},setPlaybackQuality:function(e){this.player.setPlaybackQuality(e)},initPlayer:function(){var t=this;this.player=new YT.Player(this.options.frameID.youtube,{width:this.options.width,height:this.options.height,videoId:this.options.code}),this.player.addEventListener("onReady",this.onPlayerReady),this.player.addEventListener("onStateChange",this.onPlayerStateChange),this.player.addEventListener("onError",this.onError),setTimeout(function(){var n=e("#"+t.options.frameID.youtube).prop("src");n.match("^http://")&&(p("detect youtube url protocol http://"),e("#"+t.options.frameID.youtube).prop("src",n.replace(/^http:\/\//i,"https://")))},500)},updateVideo:function(e){var t={videoId:e.code};e.start&&(t.startSeconds=e.start),e.end&&(t.endSeconds=e.end),e.quality&&(t.suggestedQuality=e.quality),this.player?(this.player.loadVideoById(t),this.playVideo()):(this.options=e,this.init())},init:function(){var e,t,i="https://www.youtube.com/iframe_api";this.isInit?this.initPlayer():(e=n.createElement("script"),e.src=i,e.async=!0,t=n.getElementsByTagName("script")[0],t.parentNode.insertBefore(e,t),this.isInit=!0)}}),i.dailymotion=function(){this.isInit=!1,this.player=void 0,this.options=e.fn.ovoplayer.settings,this.initialize.apply(this,arguments)},e.extend(i.dailymotion.prototype,{initialize:function(){var e=this;t.dmAsyncInit=function(){var t=e.options.autoplay?{autoplay:1}:{};e.player=DM.player(e.options.frameID.dailymotion,{video:e.options.code,width:e.options.width,height:e.options.height,params:t}),e.player.addEventListener("apiready",e.onApiReady),e.player.addEventListener("playing",e.onPlaying),e.player.addEventListener("playing",e.onPlay),e.player.addEventListener("pause",e.onPause),e.player.addEventListener("ended",e.onEnded),e.player.addEventListener("seeking",e.onSeeking),e.player.addEventListener("seeked",e.onSeeked),e.player.addEventListener("error",e.onPlayerError)}},onApiReady:function(e){this.options.autoplay&&e.target.play()},onPlayerError:function(){p("dailymotion player error"),e.fn.ovoplayer.next()},onPlaying:function(){p("Event is onPlaying")},onPlay:function(){p("Event is onPlay")},onPause:function(){p("Event is onPause")},onEnded:function(){p("Event is onEnded"),e.fn.ovoplayer.next()},onSeeking:function(){p("Event is onSeeking")},onSeeked:function(){p("Event is onSeeked")},destroy:function(){},playVideo:function(){this.player.play()},pauseVideo:function(){this.player.pause()},seekTo:function(e){this.player.seek(e)},togglePlay:function(){this.player.togglePlay()},setVolume:function(e){this.player.setVolume(e)},setMuted:function(e){this.player.setMuted(e)},toggleMuted:function(){this.player.toggleMuted()},updateVideo:function(e){e.code&&this.player?this.player.load(e.code):(this.options=e,this.init())},init:function(){var e,t,i=n.location.protocol+"//api.dmcdn.net/all.js";this.isInit||(e=n.createElement("script"),e.src=i,e.async=!0,t=n.getElementsByTagName("script")[0],t.parentNode.insertBefore(e,t),this.isInit=!0)}}),i.vimeo=function(){this.isInit=!1,this.player=void 0,this.options=e.fn.ovoplayer.settings,this.initialize.apply(this,arguments)},e.extend(i.vimeo.prototype,{initialize:function(){var e=this;e.onApiReady=function(t){e.player=$f(t),e.options.autoplay&&e.player.api("play"),e.player.addEvent("playProgress",e.onplayProgress),e.player.addEvent("play",e.onPlay),e.player.addEvent("pause",e.onPause),e.player.addEvent("finish",e.onFinish),e.player.addEvent("seek",e.onSeek)}},onplayProgress:function(){},onPlay:function(){p("on onPlay")},onPause:function(){p("on onPause")},onFinish:function(){p("on onFinish"),e.fn.ovoplayer.next()},onSeek:function(){p("on onSeek")},destroy:function(){e("#"+this.options.frameID.vimeo).html("")},playVideo:function(){this.player.api("play")},pauseVideo:function(){this.player.api("pause")},seekTo:function(e){this.player.api("seekTo",e)},unload:function(){this.player.api("unload")},getCurrentTime:function(){return this.player.api("getCurrentTime")},getDuration:function(){return this.player.api("getDuration")},getVideoEmbedCode:function(){return this.player.api("getVideoEmbedCode")},getVideoHeight:function(){return this.player.api("getVideoHeight")},getVideoWidth:function(){return this.player.api("getVideoWidth")},getVideoUrl:function(){return this.player.api("getVideoUrl")},getColor:function(){return this.player.api("getColor")},getVolume:function(){return this.player.api("getVolume")},setColor:function(e){this.player.api("setColor",e)},setLoop:function(e){this.player.api("setLoop",e)},setVolume:function(e){this.player.api("setVolume",e)},updateVideo:function(t){if(this.player){var n='<iframe id="'+this.options.vimeoPlayer+'" src="//player.vimeo.com/video/'+t.code+"?api=1&amp;player_id="+this.options.vimeoPlayer+'" width="'+this.options.width+'" height="'+this.options.height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';e("#"+this.options.frameID.vimeo).html(n)}else this.init()},loadJS:function(e,t){var i=n.createElement("script");i.src=e,i.async=!0,i.onreadystatechange=i.onload=function(){var e=i.readyState;t.done||e&&!/loaded|complete/.test(e)||(t.done=!0,t())},n.getElementsByTagName("head")[0].appendChild(i)},init:function(){var t,i,o="http://a.vimeocdn.com/js/froogaloop2.min.js?938a9-1384184538",a=this;if(!this.isInit){t=n.createElement("script"),t.src=o,t.async=!0,i=n.getElementsByTagName("script")[0],i.parentNode.insertBefore(t,i),this.options=e.fn.ovoplayer.settings,this.isInit=!0;var s='<iframe id="'+this.options.vimeoPlayer+'" src="//player.vimeo.com/video/'+this.options.code+"?api=1&amp;player_id="+this.options.vimeoPlayer+'" width="'+this.options.width+'" height="'+this.options.height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';e("#"+this.options.frameID.vimeo).html(s);var l=n.getElementById(this.options.vimeoPlayer);l.addEventListener?l.addEventListener("load",function(){$f(n.getElementById(a.options.vimeoPlayer)).addEvent("ready",a.onApiReady)},!1):l.attachEvent&&l.attachEvent("onload",function(){setTimeout(function(){$f(n.getElementById(a.options.vimeoPlayer)).addEvent("ready",a.onApiReady)},2e3)}),r("load",function(){$f(n.getElementById(a.options.vimeoPlayer)).addEvent("ready",a.onApiReady)})}}});var y=function(e){i.current=e},d=function(){var t,n;if(e.fn.ovoplayer.settings.playList.length>0)for(t=0,n=e.fn.ovoplayer.settings.playList.length;n>t;t++)e.fn.ovoplayer.settings.playList[t].code===i.current.code&&e.fn.ovoplayer.settings.playList[t].type===i.current.type&&(i.current.item=e.fn.ovoplayer.settings.playList[t].item,e.fn.ovoplayer.settings.playListIndex=t+1)};e.fn.ovoplayer=function(t){e.fn.ovoplayer.init(t)},e.fn.ovoplayer.pause=function(e){o[i.current.type].pauseVideo(),e&&e.call(this,i)},e.fn.ovoplayer.play=function(e){o[i.current.type].playVideo(),e&&e.call(this,i)},e.fn.ovoplayer.seek=function(e,t){o[i.current.type].seekTo(e),t&&t.call(this,i)},e.fn.ovoplayer.repeat=function(t,n){e.fn.ovoplayer.settings.repeat=t,n&&n.call(this,i)},e.fn.ovoplayer.repeatAll=function(t,n){e.fn.ovoplayer.settings.repeatAll=t,n&&n.call(this,i)},e.fn.ovoplayer.first=function(t){var n;if(l(e.fn.ovoplayer.settings.playList)&&0!==e.fn.ovoplayer.settings.playList.length){if(e.fn.ovoplayer.settings.repeat)return void e.fn.ovoplayer.update(i.current,t);e.fn.ovoplayer.settings.playListIndex=1,n=e.fn.ovoplayer.settings.playList[e.fn.ovoplayer.settings.playListIndex-1],e.fn.ovoplayer.update(n,t)}},e.fn.ovoplayer.last=function(t){var n;if(l(e.fn.ovoplayer.settings.playList)&&0!==e.fn.ovoplayer.settings.playList.length){if(e.fn.ovoplayer.settings.repeat)return void e.fn.ovoplayer.update(i.current,t);e.fn.ovoplayer.settings.playListIndex=e.fn.ovoplayer.settings.playList.length,n=e.fn.ovoplayer.settings.playList[e.fn.ovoplayer.settings.playListIndex-1],e.fn.ovoplayer.update(n,t)}},e.fn.ovoplayer.previous=function(t){var n;if(l(e.fn.ovoplayer.settings.playList)&&0!==e.fn.ovoplayer.settings.playList.length){if(e.fn.ovoplayer.settings.repeat)return void e.fn.ovoplayer.update(i.current,t);e.fn.ovoplayer.settings.playListIndex?e.fn.ovoplayer.settings.playListIndex-=1:e.fn.ovoplayer.settings.playListIndex=1,e.fn.ovoplayer.settings.playListIndex<=0&&(e.fn.ovoplayer.settings.playListIndex=1),n=e.fn.ovoplayer.settings.playList[e.fn.ovoplayer.settings.playListIndex-1],e.fn.ovoplayer.update(n,t)}},e.fn.ovoplayer.next=function(t){var n;if(l(e.fn.ovoplayer.settings.playList)&&0!==e.fn.ovoplayer.settings.playList.length){if(e.fn.ovoplayer.settings.repeat)return void e.fn.ovoplayer.update(i.current,t);if(e.fn.ovoplayer.settings.playListIndex?e.fn.ovoplayer.settings.playListIndex+=1:e.fn.ovoplayer.settings.playListIndex=1,e.fn.ovoplayer.settings.playListIndex>e.fn.ovoplayer.settings.playList.length){if(!e.fn.ovoplayer.settings.repeatAll)return void p("The latest video of Play List.");e.fn.ovoplayer.settings.playListIndex=1}n=e.fn.ovoplayer.settings.playList[e.fn.ovoplayer.settings.playListIndex-1],e.fn.ovoplayer.update(n,t)}},e.fn.ovoplayer.update=function(t,n){var a=e.fn.ovoplayer.settings=e.extend({},e.fn.ovoplayer.settings,t);o[i.current.type].pauseVideo(),a.type!==i.current.type&&(o[i.current.type].destroy(),e("."+a.iframeClass).hide(),e("#"+a.frameID[a.type]).show()),o[a.type].updateVideo(a),y(a),d(),a.callback&&(n=a.callback),n&&n.call(this,i)},e.fn.ovoplayer.setplayListID=function(t,n){var o,r,s={};t&&(e(t).each(function(){o=e(this).data("type"),r=e(this).data("code").toString(),o&&r&&o.match(a)&&r.length>0&&(s={type:o,code:r,item:this},e.fn.ovoplayer.settings.playList.push(s))}),d(),e.fn.ovoplayer.settings.callback&&(n=e.fn.ovoplayer.settings.callback),n&&n.call(this,i))},e.fn.ovoplayer.init=function(t){t.width=e(t.id).width(),t.height=e(t.id).height();var r,s,l,d=e.fn.ovoplayer.settings=e.extend({},e.fn.ovoplayer.defaults,t);e.each(d.frameID,function(t,n){e("<div/>",{id:n,"class":d.iframeClass}).appendTo(d.id),o[t]=new i[t]}),o[d.type].init(),d.playListID&&d.playListID.length>0&&e(d.playListID).each(function(){r=e(this).data("type"),s=e(this).data("code").toString(),r&&s&&r.match(a)&&s.length>0&&(l={type:r,code:s,item:this},d.playList.push(l))}),d.shortcutKey&&e(n).keyup(function(t){switch(t.keyCode){case 37:p("previous video"),e.fn.ovoplayer.previous();break;case 39:p("next video"),e.fn.ovoplayer.next()}}),y(d)},e.fn.ovoplayer.defaults={id:"#player_frame",frameID:{youtube:"youtube_frame",vimeo:"vimeo_frame",dailymotion:"dailymotion_frame"},iframeClass:"video_iframe",vimeoPlayer:"vimeo_player",playList:[],playListID:null,repeat:!1,repeatAll:!1,autoplay:!0,debug:!1,callback:null,shortcutKey:!1},e.ovoplayer=e.fn.ovoplayer}(jQuery,window,document);