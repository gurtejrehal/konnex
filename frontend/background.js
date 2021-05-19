
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
    const comment = $('#id_bug_comment').val();

	$.ajax({
            url: "http://127.0.0.1:8000/bug/",
            type: "POST",
            data: { 'image' : image_data, 'comment': comment},
            success: function(response){
					alert("Thank you for reporting the bug!")
                    $('#bug').modal('hide');
            }

        });

});

$("#bug-card").click(function(e){

    chrome.tabs.captureVisibleTab(null,{},function(dataUri){
        console.log(dataUri);
        $("#bug_ss").attr("src", dataUri);
    })

});
