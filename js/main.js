$(function() {
    $.ovoplayer({
        type: 'dailymotion',
        code: 'xrs3bh'
        /*
        type: 'vimeo',
        code: '68116854'
        type: 'youtube',
        code: 'xWzlwGVQ6_Q'
        */
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
