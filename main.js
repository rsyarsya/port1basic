function toggleDetail(e){
    const target = $(e.target)

    if($(target).hasClass("active")){
        $(target).html("More info").removeClass("active")
    }else{
        $(target).html("Less info").addClass("active")
    }

    const item = $(target).parents(".about-exp-item")
    const detail = $(item).children(".about-exp-item-detail")

    $(detail).slideToggle()

    console.log($(item).children(".about-exp-detail"))
}

function onFormSubmit(e) {
    e.preventDefault();
    
    const email = $("#inp_email");
    const subject = $("#inp_subject");
    const message = $("#inp_message");

    if (!$(email).val()) {
        alert("Please enter your email");
        $(email).focus();
    } else if (!$(subject).val()) {
        alert("Please enter your subject");
        $(subject).focus();
    } else if (!$(message).val()) {
        alert("Please enter your message");
        $(message).focus();
    } else {
        function submitDetail(e) {
            if ($($(e.target)).hasClass("active2")) {
                $($(e.target)).html("Submit").removeClass("active2");
            } else {
                $($(e.target)).html("Thank You for Your Message!").addClass("active2");
            }
        }

        const form = $(e.target).parents("form");
        const formData = $(form).serializeArray();
        const formDataObj = {};

        formData.forEach(item => {
            formDataObj[item.name] = item.value;
        });

        console.log(formDataObj); // Debugging

        // AJAX request untuk mengirim data ke API
        $.ajax({
            url: "/api/sendEmail",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: $("#inp_email").val().trim(),  // Kirim email pengirim
                subject: $("#inp_subject").val().trim(),
                message: $("#inp_message").val().trim()
            }),
            success: function (response) {
                $("#responseMessage").text("Email sent successfully!").css("color", "green");
            },
            error: function (xhr) {
                $("#responseMessage").text("Failed to send email.").css("color", "red");
                console.error("Error:", xhr.responseText);
            }
        });

        $(form).trigger("reset");

        submitDetail(e);
    }
}
