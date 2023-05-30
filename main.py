from flask import Flask, render_template, url_for, request, redirect, send_from_directory
import requests
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sheet_endpoint = os.environ.get('sheet_endpoint')
FROM_EMAIL =  os.environ.get('FROM_EMAIL')
PASSWORD = os.environ.get('PASSWORD')
TO_EMAIL = os.environ.get("TO_EMAIL")
EMAIL_DATABASE = os.environ.get('EMAIL_DATABASE')
PROMPTSDOWNLOADEMAILDATABASE = os.environ.get('PROMPTSDOWNLOADEMAILDATABASE')
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/success')
def success():
    return render_template('success.html')

@app.route('/signup', methods=["POST", ])
def form():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    email = request.form['email']
    
    print(firstname)
    print(email)
    sheety_parameter = {
    "email": {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
    }
}

    response = requests.post(EMAIL_DATABASE, json=sheety_parameter)
    print("response.status_code =", response.status_code)

    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Welcome Aboard!"
    msg['From'] = FROM_EMAIL
    msg['To'] = email


    text = "Hi!\nHow are you?"
    html = f"""\
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <body>
<hr>
    <h4>Hi {firstname}!</h4>
    <h3>Quick introduction</h3>
	My name is Hadiza, I am a fifth year pharmacy student and a personal development enthusiast. I am all about self improvement, intentional living, education, goal setting, planning, journaling and passionate about quality education and Gender equality.<br><br>

By signing up, expect my monthly Newsletter where I share: <br><br>

⚫️ Into my life tea of all that happened through the month + my regrets and greatest lessons <br>

⚫️ Recommendations of my favourite books, podcasts, channels, courses and products <br>

⚫️ My opinion on events/happenings and information <br><br>

Thank you for making me a part of your journey… <br><br>

until next time ✌️<br><br>

Love, <br>
JoyfullyHadiza
<hr>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
  </body>
</html>
    """

    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')

    msg.attach(part1)
    msg.attach(part2)

    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.ehlo()
        connection.starttls()
        connection.login(user=FROM_EMAIL, password=PASSWORD)
        connection.sendmail(from_addr=FROM_EMAIL, to_addrs=email, msg=msg.as_string())
    
    result = response.text
    print(result)

    return redirect(url_for('success'))

@app.route('/6643467cc69a54abf6180732617a232ca54b436d')
def download_journaling_prompts():
    return render_template("shop.html")

@app.route('/4c4554275320504c414e203230323320544f474554484552')
def download_plan_2023():
    return render_template("shop.html")

@app.route('/sendmessage', methods=["POST", ])
def contactform():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    email = request.form['email']
    generalInquiry = request.form.get('generalInquiry')
    sponsorships = request.form.get('sponsorships')
    message = request.form['message']

    print(firstname)
    print(lastname)
    print(email)
    print(generalInquiry)
    print(sponsorships)
    print(message)

    subject = None

    if generalInquiry == 'on' and sponsorships == 'on':
        subject = "General Inquiry/Sponsorship (Working with Hadiza)"
    elif generalInquiry == 'on' and sponsorships == None:
        subject = "General Inquiry"
    elif generalInquiry == None and sponsorships == 'on':
        subject = "Sponsorship/Working with Hadiza"
    else:
        subject = "No subject"
    
    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.ehlo()
        connection.starttls()
        connection.login(user=FROM_EMAIL, password=PASSWORD)
        connection.sendmail(from_addr=FROM_EMAIL, to_addrs=email, msg=f"Subject: {subject}\n\nFirst Name: {firstname}\Last Name: {lastname}\nEmail: {email}\nMessage: {message}")

    return redirect(url_for('success'))


@app.route('/newsletter')
def newsletter():
    
    return render_template('newsletter.html')

@app.route('/plan_2023')
def plan_2023():
    
    return render_template("shop.html")

@app.route('/journaling_prompts')
def journaling_prompts():
    
    return render_template('shop.html')

@app.route('/prompts_download', methods=["POST", ])
def download_prompts_form():
    
    
    return render_template('shop.html')


if __name__ == "__main__":
    app.run(debug=True)
