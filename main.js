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

function onFormSubmit(e){
    e.preventDefault()
    const email = $("#inp_email")
    const subject = $("#inp_subject")
    const message = $("#inp_message")

    if(!$(email).val()){
        alert("Please enter your email")
        $(email).focus()
    }else if(!$(subject).val()){
        alert("Please enter your subject")
        $(subject).focus()
    }else if(!$(message).val()){
        alert("Please enter your message")  
        $(message).focus()
    } else{
    function submitDetail(e){
        
        if($($(e.target)).hasClass("active2")){
                $($(e.target)).html("Submit").removeClass("active2")
        }else{
                $($(e.target)).html("Thank You for Your Message!").addClass("active2")
        }    
    }

    const form = $(e.target).parents("form")
    const formData = $(form).serializeArray()
    const formDataObj = {}

    formData.forEach(item => {
        formDataObj[item.name] = item.value
    })

    console.log(formDataObj)

    $(form).trigger("reset")

    submitDetail(e)
    }

    
}

document.getElementById('contact-js').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('inp_email').value;
    const subject = document.getElementById('inp_subject').value;
    const message = document.getElementById('inp_message').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, subject, message }),
        });

        const data = await response.json();
        responseMessage.textContent = data.message;

        if (response.ok) {
            responseMessage.style.color = 'green';
        } else {
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        responseMessage.textContent = 'Error sending message.';
        responseMessage.style.color = 'red';
    }
});
