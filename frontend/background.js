
$('#feedback-form-submit').click(function(e){
    e.preventDefault();

    const name = $('#id_name').val();
    const email = $('#id_email').val();
    const subject = $('#id_subject').val();
    const comment = $('#id_comment').val();

	$.ajax({
            url: "http://127.0.0.1:8000/feedback/",
            type: "POST",
            data: { 'name' : name, 'email' : email, 'subject' : subject, 'comment': comment},
            success: function(response){
					alert("Thank you for your response!")
                    $('#feedback').modal('hide');
            }

        });

});

$('#bug-form-submit').click(function(e){
    e.preventDefault();

    const image_data = $('#bug_ss').attr('src');
    const email = $('#id_email').val();
    const comment = $('#id_bug_comment').val();

	$.ajax({
            url: "http://127.0.0.1:8000/bug/",
            type: "POST",
            data: { 'image' : image_data, 'comment': comment, 'email' : email},
            success: function(response){
					alert("Thank you for reporting the bug!")
                    $('#bug').modal('hide');
            }

        });

});


$('#notifications-check').click(function(e){
    e.preventDefault();
	$.ajax({
            url: "http://127.0.0.1:8000/notifications/",
            type: "GET",
            data: { 'status' : true },
            success: function(response){
                    $('#notifications-body').html(response);
            }

        });

});

$("#search-btn").click(function(e){
    const search = $('#search_input').val();

    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: `$('*:contains(${search})').each(function(){
            if($(this).children().length < 1) 
                 $(this).css("border","solid 2px red") });`}
        );
      });
})

$('#search').on('hide.bs.modal', function (e) {
    const search = $('#search_input').val();
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: `$('*:contains(${search})').each(function(){
            if($(this).children().length < 1) 
                 $(this).css("border","") });`}
        );
      });

      $('#search_input').val('');

  })


$("#bug-card").click(function(e){

    chrome.tabs.captureVisibleTab(null,{},function(dataUri){
        console.log(dataUri);
        $("#bug_ss").attr("src", dataUri);
    })

});


var arrLang = {
    'en': {
      'title': 'Konnex - AI Assitant',
      'search': 'Search',
      'support': 'Support',
      'bugs': 'Bugs',
      'notifications' : 'Notification',
      'usage' : 'Usage',
      'feedback' : 'Feedback'
    },
    'hin': {
      'title': 'कोनेक्स - ऐ आई सहायक',
      'search': 'खोज कर',
      'support': 'सहयोग',
      'bugs': 'कीड़े',
      'notifications': 'सूचनाएं',
      'usage': 'प्रयोग',
      'feedback': 'प्रतिपुष्टि'
    },
    'ben': {
      'title': 'Konnex - AI Assitant',
      'search': 'অনুসন্ধান',
      'support': 'সহায়তা',
      'bugs': 'সমস্যা',
      'notifications': 'খবর',
      'usage': 'পরিমাপ',
      'feedback': 'প্রতিক্রিয়া'
    }
  };

  // Process translation
  $(function() {
    $('.translate').click(function() {
      var lang = $(this).attr('id');

      $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
    });
  });
