var firstnamevalidationMessage = document.getElementById('firstnamevalidationMessage')
var emailvalidationMessage = document.getElementById('emailvalidationMessage')
var checkboxvalidationMessage = document.getElementById('checkboxvalidationMessage')
var messagevalidationMessage = document.getElementById('messagevalidationMessage')
var plan2023readreviews = document.querySelector('.plan2023readreviews');
var plan2023Reviews = document.getElementById('plan2023Reviews');
var journallingpromptsreadreviews = document.querySelector('.journallingpromptsreadreviews');
var journallingReviews = document.getElementById('journallingReviews');
var captchaMessage = document.getElementById('g-recaptcha-error');
var recaptcha_response = '';


function validateNewsletterForm(event) {

    var firstname = document.getElementById('firstname').value
    var email = document.getElementById('email').value
    

    if (firstname === "" && email === "" ) {
        firstnamevalidationMessage.textContent = 'This field is required';
        firstnamevalidationMessage.style.display = "block";
        emailvalidationMessage.textContent = 'This field is required';
        emailvalidationMessage.style.display = 'block';
        event.preventDefault()
        return false;
    } else if (firstname === "") {
        firstnamevalidationMessage.textContent = 'This field is required';
        firstnamevalidationMessage.style.display = "block";
        event.preventDefault()
        return false
    } else if (email === "") {
        emailvalidationMessage.textContent = 'This field is required';
        emailvalidationMessage.style.display = 'block';
        event.preventDefault()
        return false
    } else if(recaptcha_response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        event.preventDefault()
        return false;
    }

    firstnamevalidationMessage.style.display = 'none';
    emailvalidationMessage.style.display = 'none';
    form.reset();
    return true



}


function validateContactForm(event) {

    var firstname = document.getElementById('firstname').value;
    var email = document.getElementById('email').value;
    var generalInquiry = document.getElementById('generalInquiry').checked;
    var sponsorships = document.getElementById('sponsorships').checked;
    var message = document.getElementById('message').value;


    if (firstname === "") {
        firstnamevalidationMessage.textContent = 'Please input your name';
        firstnamevalidationMessage.style.display = "block";
        event.preventDefault()
        return false;
    } else if (email === "") {
        emailvalidationMessage.textContent = 'This field is required';
        emailvalidationMessage.style.display = 'block';
        event.preventDefault()
        return false
    } else if (!generalInquiry  && !sponsorships) {
        checkboxvalidationMessage.textContent = 'Please select appropriate option(s)';
        checkboxvalidationMessage.style.display = 'block';
        event.preventDefault()
        return false
    } else if (message === "") {
        messagevalidationMessage.textContent = 'This field is required';
        messagevalidationMessage.style.display = 'block';
        event.preventDefault()
        return false
    } else if(recaptcha_response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        event.preventDefault()
        return false;
    }

    firstnamevalidationMessage.style.display = 'none';
    emailvalidationMessage.style.display = 'none';
    checkboxvalidationMessage.style.display = 'none';
    messagevalidationMessage.style.display = 'none';
    form.reset();
    return true

}

function verifyCaptcha(token) {
    recaptcha_response = token;
    document.getElementById('g-recaptcha-error').innerHTML = '';
}


plan2023readreviews.addEventListener('click', function(event) {
    event.preventDefault();

    if (plan2023Reviews.style.display === 'none') {
        plan2023Reviews.innerHTML = "This Ebook is a dream to someone like me who has a hard time answering questions that make me think deeply; especially on things relating to myself and my future, this book had an amazing way of easing me into the big questions, guiding me through my thoughts and motivations, and shining a path to a better 2023. <br><b>-Byeongify</b> <br><br>Hadiza has an incredible mind. I recommend this to anyone who needs to take planning seriously. Through series of engaging questions, this guide promises to be your True North for planning the next year. <br><b>-A.M. Misal</b> CEO, WEx Global <br><br>The ebook “Let’s plan 2023 together” gives you a hint/advice on what you should work on for the year 2023 and how to properly prioritize growth. This ebook is a wonderful way to learn from and let go of 2022 without forgetting to be grateful for the journey this far and helps you plan your way through 2023 effectively. It is your number-one guidebook for the year 2023! <br><b>-Nkiruka Obi</b>";

        plan2023Reviews.style.display = 'block';
    } else {
        plan2023Reviews.style.display = 'none';
    }
});


journallingpromptsreadreviews.addEventListener('click', function(event) {
    event.preventDefault();

    if (journallingReviews.style.display === 'none') {
        journallingReviews.innerHTML = "I've been using this journaling prompt compilation for a few weeks now, and it's been incredible. It's like having a personal coach guiding me towards self-reflection and growth. The prompts are engaging, insightful, and have helped me make positive changes in my daily life. I'm truly grateful for this resource. <br><b>-Samuel</b><br><br>I highly recommend it to anyone looking to dive deeper into self-reflection and make positive changes in their life. <br><b>-Paul</b> <br><br>Hadiza, I am truly amazed by the prompts you've created. I recently started using it, and it has been an eye-opening experience. Prior to this, I had never dedicated time for introspection, and I assumed that last year was merely a blur. However, upon engaging with your journaling prompts, I discovered that numerous positive moments had actually taken place. It has been a wonderful realization. <br><b>-Grace</b>";

        journallingReviews.style.display = 'block';
    } else {
        journallingReviews.style.display = 'none';
    }
});


signupbutton.addEventListener('click', function(event) {
    event.preventDefault();

    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse.length > 0) {
        throw new Error("Captcha not complete");
    }
});


// alert('test')