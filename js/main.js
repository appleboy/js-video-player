$(function(){var a=[];$(document).on("click","button",function(){var a=$(this).data("type");switch(a){case"play":$.ovoplayer.play();break;case"pause":$.ovoplayer.pause();break;case"seek":$.ovoplayer.seek(50);break;case"first":$.ovoplayer.first();break;case"last":$.ovoplayer.last();break;case"next":$.ovoplayer.next();break;case"previous":$.ovoplayer.previous();break;case"repeat":var e=$(this).data("val");"1"==e?($(this).data("val","0").text("No Repeat"),$.ovoplayer.repeat(!0)):($(this).data("val","1").text("Repeat"),$.ovoplayer.repeat(!1));break;case"repeatAll":var e=$(this).data("val");"1"==e?($(this).data("val","0").text("No Repeat All"),$.ovoplayer.repeatAll(!0)):($(this).data("val","1").text("Repeat All"),$.ovoplayer.repeatAll(!1))}}),$(document).on("click",".play_list",function(a){var e=$(this).data("type"),t=$(this).data("code");a.preventDefault(),$.ovoplayer.update({type:e,code:t})}),$(".play_list").each(function(){var e={type:$(this).data("type"),code:$(this).data("code")};a.push(e)}),$.ovoplayer({id:"#player_frame",type:"youtube",code:"N6vRCQqOiUw",shortcutKey:!0,callback:function(a){$(".play_list").removeClass("active"),a.current.item&&$(a.current.item).addClass("active")}}),$.ovoplayer.setplayListID(".play_list")});