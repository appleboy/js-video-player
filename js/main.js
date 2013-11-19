$(function() {
    $.ovoplayer({
        type: 'vimeo',
        code: '68116854'
        /*
        type: 'vimeo',
        code: '68116854'
        type: 'dailymotion',
        code: 'xrs3bh'
        type: 'youtube',
        code: 'xWzlwGVQ6_Q'
        */
    });
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
});
