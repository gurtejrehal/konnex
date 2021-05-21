
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
    $("button[data-bs-toggle='tooltip']").tooltip();
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

  $('#description-body').html(`<div class="spinner-border text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`)

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;    
    $.ajax({
      url: "http://127.0.0.1:8000/get-description/",
      type: "POST",
      data: { 'url' : url},
      success: function(response){
          console.log(response);
          $('#copy-btn').html(`<button id="copy-btn-main" class="btn btn-dark btn-sm"><i style="color:white" class="fas fa-copy"></i></button>`)
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


$('#support-send-btn').click(function(e){
  e.preventDefault();

  const msgerForm = $(".msger-inputarea");
  const msgerInput = $(".msger-input");
  const msgerChat = $(".msger-chat");  
    
  const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
  const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
  const BOT_NAME = "BOT";
  const PERSON_NAME = "You";
  
  function appendMessage(name, img, side, text) {
    
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
    msgerChat.append(msgHTML);
    msgerChat.scrollTop += 500;
  }

    // Utils
    function get(selector, root = document) {
      return root.querySelector(selector);
    }
    
    function formatDate(date) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();
    
      return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    
    function random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    
    

    const msgText = msgerInput.val();
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.val("");

$.ajax({
          url: "http://127.0.0.1:8000/support/",
          type: "POST",
          data: { 'text' : msgText },
          success: function(response){           

            const msgText = response;
            const delay = msgText.split(" ").length * 100;
          
            setTimeout(() => {
              appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
            }, delay);

          }

      });

});




