$(document).ready(function() {

    function addTabSupport(selector) {
        $(selector).summernote({
            lang: 'ru-RU',
            placeholder: '',
            height: 280,
            dialogsInBody: true,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']]
            ],
            callbacks: {
                onImageUpload: function(files) {
                    var editor = $(this);
                    var formData = new FormData();
                    formData.append('image', files[0]);

                    $.ajax({
                        url: '/engine/mods/summernote_image.php&folder=' + $('#folder').val() + '&p_id=' + $('#p_id').val(),
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(imageUrl) {
                            editor.summernote('insertImage', imageUrl);
                        },
                        error: function(xhr, status, error) {
                            console.error(xhr.responseText);
                        }
                    });
                },
                onKeydown: function(e) {
                    if (e.key === "Tab") {
                        e.preventDefault();
                        var editor = $(this);
                        if (!e.shiftKey) {
                            document.execCommand('indent');
                        } else {
                            document.execCommand('outdent');
                        }
                    }
                }
            }
        });
    }

    addTabSupport('#short_desc');
    addTabSupport('#full_desc');

    $(document).on('drop dragover', function(e) {
        e.preventDefault();
    });
});
