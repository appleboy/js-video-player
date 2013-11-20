$(function() {
    var playList = [];
    $(document).on('click', 'button', function(e) {
        var type = $(this).data('type');
        switch (type) {
            case 'play':
                $.ovoplayer.play();
                break;
            case 'pause':
                $.ovoplayer.pause();
                break;
            case 'seek':
                $.ovoplayer.seek(50);
                break;
            case 'next':
                $.ovoplayer.next();
                break;
            case 'previous':
                $.ovoplayer.previous();
                break;
            case 'repeat':
                var val = $(this).data('val');
                if (val == '1') {
                    $(this).data('val', '0');
                    $(this).text('no repeat');
                    $.ovoplayer.repeat(true);
                } else {
                    $(this).data('val', '1');
                    $(this).text('repeat');
                    $.ovoplayer.repeat(false);
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
        type: 'vimeo',
        code: '68116854',
        playListClass: 'play_list'
        /*
        playList: playList
        type: 'vimeo',
        code: '68116854'
        type: 'dailymotion',
        code: 'xrs3bh'
        type: 'youtube',
        code: 'xWzlwGVQ6_Q'
        */
    });
});
