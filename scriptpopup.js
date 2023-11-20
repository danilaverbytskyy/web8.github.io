$(document).ready(function()
{  var form = $('#feedbackForm');
    var responseMessage = $('#responseMessage');
    var formData = localStorage.getItem('feedbackFormData');
    if (formData) { formData = JSON.parse(formData);
        form.find('input[type="text"], input[type="email"], input[type="tel"], textarea').each(function()
        { var field = $(this);
            var fieldName = field.attr('name');
            field.val(formData[fieldName]);
        });
    } form.on('change', 'input[type="text"], input[type="email"], input[type="tel"], textarea', function()
{ var formData = {};
    form.find('input[type="text"], input[type="email"], input[type="tel"], textarea').each(function() { var field = $(this);
        var fieldName = field.attr('name'); formData[fieldName] = field.val();
    });
    localStorage.setItem('feedbackFormData', JSON.stringify(formData));
});

    $('#openPopup').click(function(e)
    { e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        history.pushState(null, null, '#popup');
    });
    $(window).on('popstate', function()
    { $('.popup-overlay').fadeOut(300);
        form.trigger('reset');
        localStorage.removeItem('feedbackFormData');
        responseMessage.empty();
        history.pushState(null, null, window.location.href.split('#')[0]);
    });
    form.submit(function(e)
    { e.preventDefault();
        responseMessage.empty();
        var formData = new FormData(this);
        $.ajax({ url: 'https://formcarry.com/s/QiUdEb9NdK', type: 'POST', data: formData, processData: false, contentType: false, success: function(response)
            { responseMessage.text('Форма успешно отправлена!').addClass('success');
                form.trigger('reset');
                localStorage.removeItem('feedbackFormData');
            }, error: function(xhr, status, error)
            { responseMessage.text('Форма успешно отправлена!').addClass('success');
            } });
    });
});