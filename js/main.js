$(function() {
    $.ovoplayer({
        type: 'youtube',
        code: 'xWzlwGVQ6_Q'
        /*
        type: 'vimeo',
        code: '68116854'

        type: 'dailymotion',
        code: 'xrs3bh'
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
