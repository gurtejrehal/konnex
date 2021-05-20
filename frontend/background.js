
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


$('#usage-check').click(function(e){
  e.preventDefault();
$.ajax({
          url: "http://127.0.0.1:8000/usage/",
          type: "GET",
          data: { 'status' : true },
          success: function(response){
            console.log(response);
            var ctx = $('#usage-chart');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
                datasets: [{ 
                    data: response.search_count,
                    label: "Search",
                    borderColor: "#3e95cd",
                    fill: false
                  }, { 
                    data: [1,4,2,3,1,0,1],
                    label: "Support",
                    borderColor: "#8e5ea2",
                    fill: false
                  }, { 
                    data: response.bug_count,
                    label: "Bugs Report",
                    borderColor: "#3cba9f",
                    fill: false
                  }, { 
                    data: response.noti_count,
                    label: "Notifications",
                    borderColor: "#e8c3b9",
                    fill: false
                  }, { 
                    data: response.feed_count,
                    label: "Feedback",
                    borderColor: "#c45850",
                    fill: false
                  }
                ]
              },
              options: {
                title: {
                  display: true,
                  text: 'Usage of Plugins'
                }
              }
            });


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

      $.ajax({
        url: "http://127.0.0.1:8000/search/",
        type: "POST",
        data: { 'keyword' : search},
        success: function(response){
            console.log(response);
        }

    });

});

$('#get-description').click(function(e){
  
  $('#description-body').text("Loading...")

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;    
    $.ajax({
      url: "http://127.0.0.1:8000/get-description/",
      type: "POST",
      data: { 'url' : url},
      success: function(response){
          console.log(response);
          $('#description-body').text(response)
      }
    

  });

});

});


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

$('#rewards-btn').click(function(e){
  e.preventDefault();
$.ajax({
          url: "http://127.0.0.1:8000/rewards/",
          type: "GET",
          data: { 'status' : true },
          success: function(response){
                  $('#rewards-modal-body').html(response);
          }

      });

});

$('.clicker').click(function () {
  $('#plugins').toggleClass('overlay');
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
      'title': 'কোনেক্স - এ আই সহায়ক',
      'search': 'অনুসন্ধান',
      'support': 'সহায়তা',
      'bugs': 'সমস্যা',
      'notifications': 'খবর',
      'usage': 'পরিমাপ',
      'feedback': 'প্রতিক্রিয়া'
    },
    'kan': {
      'title': 'ಕೊನೆಕ್ಸ್ - ಎ ನಾನು ಸಹಾಯಕ',
      'search': 'ಹುಡುಕಿ',
      'support': 'ಬೆಂಬಲ',
      'bugs': 'ದೋಷಗಳು',
      'notifications': 'ಅಧಿಸೂಚನೆಗಳು',
      'usage': 'ಬಳಕೆ',
      'feedback': 'ಪ್ರತಿಕ್ರಿಯೆ'
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

// support 
// const talk = document.querySelector('.talk');
// const voice2text = document.querySelector(".voice2text");

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recorder = new SpeechRecognition();


// recorder.onstart = () => {
//   console.log("working");
// };

// recorder.onresult = (e) => {
//   console.log(e);
// };

// talk.addEventListener('click', function(){
//   recorder.start();
// });
