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
        }
    });
    $(document).on('click', '.init', function(e) {
        var type = $(this).data('type'),
            code = $(this).data('code');
        e.preventDefault();
        $.ovoplayer.update({
            type: type,
            code: code
        });
    });

    // get play list
    $('a').each(function( index ) {
        var obj = {
            type: $(this).data('type'),
            code: $(this).data('code')
        };
        playList.push(obj);
    });

    $.ovoplayer({
        type: 'vimeo',
        code: '68116854',
        playList: playList
        /*
        type: 'vimeo',
        code: '68116854'
        type: 'dailymotion',
        code: 'xrs3bh'
        type: 'youtube',
        code: 'xWzlwGVQ6_Q'
        */
    });
});
