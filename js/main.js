$(function() {
    var playList = [];
    $(document).on('click', 'button', function(e) {
        var type = $(this).data('type');
        switch (type) {
            case 'play':
                $.ovoplayer.play(function(player){
                    $('.play_list').removeClass('active');
                    if (player.current.item) {
                        $(player.current.item).addClass('active');
                    }
                });
                break;
            case 'pause':
                $.ovoplayer.pause(function(player){
                    $('.play_list').removeClass('active');
                    if (player.current.item) {
                        $(player.current.item).addClass('active');
                    }
                });
                break;
            case 'seek':
                $.ovoplayer.seek(50);
                break;
            case 'first':
                $.ovoplayer.first(function(player){
                    $('.play_list').removeClass('active');
                    if (player.current.item) {
                        $(player.current.item).addClass('active');
                    }
                });
                break;
            case 'last':
                $.ovoplayer.last(function(player){
                    $('.play_list').removeClass('active');
                    if (player.current.item) {
                        $(player.current.item).addClass('active');
                    }
                });
                break;
            case 'next':
                $.ovoplayer.next(function(player){
                    $('.play_list').removeClass('active');
                    if (player.current.item) {
                        $(player.current.item).addClass('active');
                    }
                });
                break;
            case 'previous':
                $.ovoplayer.previous(function(player){
                    $('.play_list').removeClass('active');
                    if (player.current.item) {
                        $(player.current.item).addClass('active');
                    }
                });
                break;
            case 'repeat':
                var val = $(this).data('val');
                if (val == '1') {
                    $(this).data('val', '0');
                    $(this).text('No Repeat');
                    $.ovoplayer.repeat(true);
                } else {
                    $(this).data('val', '1');
                    $(this).text('Repeat');
                    $.ovoplayer.repeat(false);
                }
                break;
            case 'repeatAll':
                var val = $(this).data('val');
                if (val == '1') {
                    $(this).data('val', '0');
                    $(this).text('No Repeat All');
                    $.ovoplayer.repeatAll(true);
                } else {
                    $(this).data('val', '1');
                    $(this).text('Repeat All');
                    $.ovoplayer.repeatAll(false);
                }
                break;
        }
    });
    $(document).on('click', '.play_list', function(e) {
        var type = $(this).data('type'),
            code = $(this).data('code');
        e.preventDefault();
        $.ovoplayer.update({
            type: type,
            code: code
        });
    });

    // get play list
    $('.play_list').each(function( index ) {
        var obj = {
            type: $(this).data('type'),
            code: $(this).data('code')
        };
        playList.push(obj);
    });

    $.ovoplayer({
        type: 'youtube',
        code: 'xWzlwGVQ6_Q',
        playListClass: 'play_list'
        /*
        playList: playList
        type: 'vimeo',
        code: '68116854',
        type: 'dailymotion',
        code: 'xrs3bh',
        type: 'youtube',
        code: 'xWzlwGVQ6_Q',
        */
    });
});
