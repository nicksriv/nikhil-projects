<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Spring Boot Email using FreeMarker</title>
</head>
<body>
  <h1>Welcome to BrandPulse</h1>
  <div> This email includes your account details , Please keep it safe!</div>
   <div style="margin-top: 10px"> Appliaction URL : <a href="url">brandpulse.com</a></b></div>
  <div > User ID : <b>${credentials.userId}</b></div>
  <div>  Username : <b>${credentials.userId}</b></div>
  <div > Password : <b>${credentials.password}</b></div>
  <div >Account CreationDate : <b>${credentials.createdAt}</b></div>
<br>
 <div> Questions? Check out our <b>userGuide and Videos</b> or Drop us a line </div>
<div> we are here to help. </div>
</br>
<!--<a href="https://www.w3schools.com/">Visit W3Schools.com!</a> -->
<br/>
<div> All the best</div>
<div> Your brand pulse Team!</div>
</body>
</html>